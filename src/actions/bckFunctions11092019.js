//imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

//---------------------------------------- Menu ----------------------------------------//

//ouvinte do eventActive
export const ListinerEventActive = callback => {
    return dispatch => {
        let dir = firebase.database().ref('app')
        dir.child('eventActive').on('value', snapshot => {
            let eventActive = snapshot.val().eventActive
            dispatch({
                type: 'changeEventActive',
                payload: {
                    eventActive: eventActive
                }
            })
            if (eventActive == 1) {
                dispatch({
                    type: 'changeBgBtnMasterMenu',
                    payload: {
                        bgBtnMasterMenu: 'transparent'
                    }
                })
            } else if (eventActive == 0) {
                dispatch({
                    type: 'changeBgBtnMasterMenu',
                    payload: {
                        bgBtnMasterMenu: '#acacac'
                    }
                })
            }
            callback()
        })
    }
}

//finalizar o evento
export const EndEvent = callback => {
    return () => {
        let dir = firebase.database().ref('app')
        dir.child('eventActive').once('value').then(snapshot => {
            let eventActive = snapshot.val().eventActive
            if (eventActive === 1) {
                Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                    { text: 'Não' },
                    {
                        text: 'Sim, quero finalizar', onPress: () => {
                            dir.child('eventActive').set({
                                eventActive: 0
                            })
                                .then(() => {
                                    Alert.alert('Ação realizada', 'Evento finalizado com sucesso!')
                                    dir.child('eventCurrent').once('value').then(snapshot => {
                                        let name = snapshot.val().name
                                        let city = snapshot.val().city
                                        let estado = snapshot.val().estado
                                        let promoter = snapshot.val().promoter
                                        let dateInitial = snapshot.val().dateInitial
                                        let dateFinal = snapshot.val().dateFinal
                                        callback(name, city, estado, promoter, dateInitial, dateFinal)
                                    })
                                })
                                .catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
                        }
                    },
                ])

            } else {
                Alert.alert('Aviso', 'Não é temporada de evento')
            }
        })


    }
}

//salvar os dados do ultimo evento no firebase
export const SaveEvent = (name, city, estado, promoter, dateInitial, dateFinal) => {
    return () => {
        //salvar o eventCurrent 
        let dir = firebase.database().ref('app')
        let key = firebase.database().ref('app').child('evnetActive').push().key
        dir.child('pastEvents').child(key).set({
            name,
            city,
            estado,
            promoter,
            dateInitial,
            dateFinal
        })
            .then(() => dir.child('eventCurrent').remove())
            .catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
    }
}

//---------------------------------------- registerEvent ----------------------------------------//

export const RegisterEvent = (name, city, estado, promoter, dateInitial, dateFinal, callback, validation) => {
    return async () => {
        let dir = firebase.database().ref('app')
        let rash = firebase.database().ref('app').child('dataDefault').push().key
        var control = 0

        // //Dados upperCase
        let nameInput = name.toUpperCase()
        let cityInput = city.toUpperCase()
        let estadoInput = estado.toUpperCase()
        let promoterInput = promoter.toUpperCase()

        // //Date Initial
        let arrayDateInitial = dateInitial.split('/', 3);
        let dayInitial = arrayDateInitial[0]
        let monthInitial = arrayDateInitial[1]
        let yearInitial = arrayDateInitial[2]

        // //Date Final
        let arrayDateFinal = dateFinal.split('/', 3);
        let dayFinal = arrayDateFinal[0]
        let monthFinal = arrayDateFinal[1]
        let yearFinal = arrayDateFinal[2]

        //pegar os valores das validações
        let validationName = validation[0].name
        let validationCity = validation[1].city
        let validationEstado = validation[2].estado
        let validationPromoter = validation[3].promoter

        if (dayFinal >= dayInitial && monthFinal >= monthInitial && yearFinal >= yearInitial) {
            if (name != '' && city != '' && estado != '' &&
                promoter != '' && dateInitial != '' && dateFinal != '') {

                await dir.child('dataDefault').child('name').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (nameInput == childItem.val().name) {
                            if (validationName === undefined || validationName === 0) control = 1
                        }
                    })
                    if (control != 1 && validationName != 1) await dir.child('dataDefault').child('name').child(rash).set({ name: nameInput })

                })
                await dir.child('dataDefault').child('city').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (cityInput == childItem.val().city) {
                            if (validationCity === undefined || validationCity === 0) control = 1
                        }
                    })
                    if (control != 1 && validationCity != 1) await dir.child('dataDefault').child('city').child(rash).set({ city: cityInput })
                })

                await dir.child('dataDefault').child('estado').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (estadoInput == childItem.val().estado) {
                            if (validationEstado === undefined || validationEstado === 0) control = 1
                        }
                    })
                    if (control != 1 && validationEstado != 1) await dir.child('dataDefault').child('estado').child(rash).set({ estado: estadoInput })
                })

                await dir.child('dataDefault').child('promoter').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (promoterInput == childItem.val().promoter) {
                            if (validationPromoter === undefined || validationPromoter === 0) control = 1
                        }
                    })
                    if (control != 1 && validationPromoter != 1) await dir.child('dataDefault').child('promoter').child(rash).set({ promoter: promoterInput })
                })

                if (control === 1) Alert.alert('Aviso', 'Algum campo já foi cadastrado')

                if (control != 1) {
                    await dir.child('eventCurrent').set({
                        name: nameInput,
                        city: cityInput,
                        estado: estadoInput,
                        promoter: promoterInput,
                        dateInitial,
                        dateFinal,
                    })
                        .then(() => {
                            Keyboard.dismiss()
                            Alert.alert('Ação realizada', 'Cadastro bem sucedido!')
                            callback()
                        })
                        .catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))

                    await dir.child('eventActive').set({ eventActive: 1 });
                }

            } else Alert.alert('Aviso', 'Preencha todos os campos')
        } else Alert.alert('Aviso', 'Verifique se as datas estão corretas!')

    }

}

export const GetDataDefault = callback => {
    return async () => {
        let dir = firebase.database().ref('app').child('dataDefault')
        var listName = []
        var listCity = []
        var listEstado = []
        var listPromoter = []
        await dir.child('name').once('value').then(snapshot => {
            snapshot.forEach(childItem => {
                listName.push({
                    name: childItem.val().name
                })
            })
        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))

        await dir.child('city').once('value').then(snapshot => {
            snapshot.forEach(childItem => {
                listCity.push({
                    city: childItem.val().city
                })
            })
        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))

        await dir.child('estado').once('value').then(snapshot => {
            snapshot.forEach(childItem => {
                listEstado.push({
                    estado: childItem.val().estado
                })
            })
        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))

        await dir.child('promoter').once('value').then(snapshot => {
            snapshot.forEach(childItem => {
                listPromoter.push({
                    promoter: childItem.val().promoter
                })
            })
        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))

        callback(listName, listCity, listEstado, listPromoter)
    }
}

export const SendDataDefault = callback => {
    return () => {
        Alert.alert('Aviso', 'Deseja adicionar esses dados?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente', onPress: () => callback()
            },
        ])
    }
}

//---------------------------------------- settings ----------------------------------------//

//enviar as taxas de cartão para o firebase
export const SendCardFee = (cred, deb, callback) => {
    return () => {
        let dir = firebase.database().ref('app').child('dataDefault').child('cardFee');

        let credit = cred.replace(',', '.')
        credit = parseFloat(credit)
        let debit = deb.replace(',', '.')
        debit = parseFloat(debit)

        if (cred != '' && deb != '') {
            Keyboard.dismiss()
            Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                { text: 'Não', onPress: () => callback() },
                {
                    text: 'Sim, estou ciente', onPress: () => {
                        dir.set({
                            credit: credit,
                            debit: debit
                        }).then(() => {
                            Alert.alert('Ação realizada', 'Dados alterados com sucesso!')
                            callback()
                        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
                    }
                },
            ])
        } else {
            Alert.alert('Aviso', 'Preencha todos os campos')
        }
    }
}

//pegar os dados dos ultimos reajustes das taxas de crédito e débito do firebase
export const GetCardFee = callback => {
    return () => {
        let dir = firebase.database().ref('app').child('dataDefault').child('cardFee');

        dir.on('value', snapshot => {
            let cred = snapshot.val().credit
            let deb = snapshot.val().debit

            var credit = cred.toString()
            credit = credit.replace('.', ',') + '%'
            var debit = deb.toString()
            debit = debit.replace('.', ',') + '%'
            callback(credit, debit)
        })
    }
}

//enviar a nova despesa para o firebase
export const NewExpenses = (name, callback) => {
    return () => {
        let key = firebase.database().ref('app').push().key
        let dir = firebase.database().ref('app').child('dataDefault').child('expensesRegisted')

        if (name != '') {
            Keyboard.dismiss()
            Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                { text: 'Não', onPress: () => callback() },
                {
                    text: 'Sim, estou ciente', onPress: () => {
                        dir.child(key).set({
                            name: name
                        }).then(() => {
                            Alert.alert('Ação realizada', `A despesa "${name}" foi adicionada!`)
                            callback()
                        }).catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
                    }
                },
            ])
        } else {
            Alert.alert('Aviso', 'Preencha todos os campos')
        }

    }
}

//pegar a lista de despesas registradas do firebase
export const GetListExpenses = callback => {
    return () => {
        let dir = firebase.database().ref('app').child('dataDefault').child('expensesRegisted')

        dir.on('value', snapshot => {
            let list = []
            snapshot.forEach(childItem => {
                list.push({
                    key: childItem.key,
                    name: childItem.val().name
                })
            })
            callback(list)
        })

    }
}

//Deletar um item da lista de despesas registradas do firebase
export const DeleteItemExpenses = key => {
    return () => {
        Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente', onPress: () => firebase.database().ref('app')
                    .child('dataDefault').child('expensesRegisted').child(key).remove()
                    .catch(e => Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
            },
        ])
    }
}