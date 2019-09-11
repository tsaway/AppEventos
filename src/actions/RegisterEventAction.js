//imports libraries/API's
import { Alert, Keyboard } from 'react-native'
import firebase from './../../dep/firebase/FirebaseConnection'

export const RegisterEvent = (name, city, estado, promoter, dateInitial, dateFinal, callback, validation, callbackSpinner) => {
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
        let arrayDateInitial = dateInitial.split('/', 3)
        let dayInitial = arrayDateInitial[0]
        let monthInitial = arrayDateInitial[1]
        let yearInitial = arrayDateInitial[2]

        // //Date Final
        let arrayDateFinal = dateFinal.split('/', 3)
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
                    if (control != 1 && validationName != 1) await dir.child('dataDefault')
                        .child('name').child(rash).set({ name: nameInput }).catch(e => {
                            callbackSpinner()
                            Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                        })
                }).catch(e => {
                    callbackSpinner()
                    Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                })
                await dir.child('dataDefault').child('city').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (cityInput == childItem.val().city) {
                            if (validationCity === undefined || validationCity === 0) control = 1
                        }
                    })
                    if (control != 1 && validationCity != 1) await dir.child('dataDefault')
                        .child('city').child(rash).set({ city: cityInput }).catch(e => {
                            callbackSpinner()
                            Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                        })
                }).catch(e => {
                    callbackSpinner()
                    Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                })

                await dir.child('dataDefault').child('estado').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (estadoInput == childItem.val().estado) {
                            if (validationEstado === undefined || validationEstado === 0) control = 1
                        }
                    })
                    if (control != 1 && validationEstado != 1) await dir.child('dataDefault')
                        .child('estado').child(rash).set({ estado: estadoInput }).catch(e => {
                            callbackSpinner()
                            Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                        })
                }).catch(e => {
                    callbackSpinner();
                    Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                })

                await dir.child('dataDefault').child('promoter').once('value').then(async snapshot => {
                    snapshot.forEach(childItem => {
                        if (promoterInput == childItem.val().promoter) {
                            if (validationPromoter === undefined || validationPromoter === 0) control = 1
                        }
                    })
                    if (control != 1 && validationPromoter != 1) await dir.child('dataDefault')
                        .child('promoter').child(rash).set({ promoter: promoterInput }).catch(e => {
                            callbackSpinner()
                            Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                        })
                }).catch(e => {
                    callbackSpinner()
                    Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                })

                if (control === 1) {
                    callbackSpinner()
                    Alert.alert('Aviso', 'Algum campo já foi cadastrado')
                }

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
                            callbackSpinner()
                            callback()
                        })
                        .catch(e => {
                            callbackSpinner();
                            Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                        })

                    await dir.child('eventActive').set({ eventActive: 1 }).catch(e => {
                        callbackSpinner()
                        Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
                    })
                }

            } else {
                callbackSpinner()
                Alert.alert('Aviso', 'Preencha todos os campos')
            }
        } else {
            callbackSpinner()
            Alert.alert('Aviso', 'Verifique se as datas estão corretas!')
        }

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