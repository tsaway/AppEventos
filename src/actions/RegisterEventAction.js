// imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

export const RegisterEvent = (
    name,
    city,
    estado,
    promoter,
    dateInitial,
    dateFinal,
    callback,
    validation,
    callbackSpinner
) => {
    return async () => {
        const dir = firebase.database().ref('app');
        const rash = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .push().key;
        let control = 0;

        // Dados upperCase
        const nameInput = name.toUpperCase();
        const cityInput = city.toUpperCase();
        const estadoInput = estado.toUpperCase();
        const promoterInput = promoter.toUpperCase();

        // Date Initial
        const arrayDateInitial = dateInitial.split('/', 3);
        const dateInicialConverted = new Date(
            arrayDateInitial[2],
            arrayDateInitial[1] - 1,
            arrayDateInitial[0]
        );

        // Date Final
        const arrayDateFinal = dateFinal.split('/', 3);
        const dataFinalConverted = new Date(
            arrayDateFinal[2],
            arrayDateFinal[1] - 1,
            arrayDateFinal[0]
        );

        // pegar os valores das validações
        const validationName = validation[0].name;
        const validationCity = validation[1].city;
        const validationEstado = validation[2].estado;
        const validationPromoter = validation[3].promoter;

        if (dataFinalConverted >= dateInicialConverted) {
            if (
                name != '' &&
                city != '' &&
                estado != '' &&
                promoter != '' &&
                dateInitial != '' &&
                dateFinal != ''
            ) {
                await dir
                    .child('dataDefault')
                    .child('name')
                    .once('value')
                    .then(async snapshot => {
                        snapshot.forEach(childItem => {
                            if (nameInput == childItem.val().name) {
                                if (
                                    validationName === undefined ||
                                    validationName === 0
                                )
                                    control = 1;
                            }
                        });
                        if (control != 1 && validationName != 1)
                            await dir
                                .child('dataDefault')
                                .child('name')
                                .child(rash)
                                .set({ name: nameInput })
                                .catch(e => {
                                    callbackSpinner();
                                    Alert.alert(
                                        'Error - Relate ao desenvolvedor',
                                        `Error: ${e}`
                                    );
                                });
                    })
                    .catch(e => {
                        callbackSpinner();
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        );
                    });
                await dir
                    .child('dataDefault')
                    .child('city')
                    .once('value')
                    .then(async snapshot => {
                        snapshot.forEach(childItem => {
                            if (cityInput == childItem.val().city) {
                                if (
                                    validationCity === undefined ||
                                    validationCity === 0
                                )
                                    control = 1;
                            }
                        });
                        if (control != 1 && validationCity != 1)
                            await dir
                                .child('dataDefault')
                                .child('city')
                                .child(rash)
                                .set({ city: cityInput })
                                .catch(e => {
                                    callbackSpinner();
                                    Alert.alert(
                                        'Error - Relate ao desenvolvedor',
                                        `Error: ${e}`
                                    );
                                });
                    })
                    .catch(e => {
                        callbackSpinner();
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        );
                    });

                await dir
                    .child('dataDefault')
                    .child('estado')
                    .once('value')
                    .then(async snapshot => {
                        snapshot.forEach(childItem => {
                            if (estadoInput == childItem.val().estado) {
                                if (
                                    validationEstado === undefined ||
                                    validationEstado === 0
                                )
                                    control = 1;
                            }
                        });
                        if (control != 1 && validationEstado != 1)
                            await dir
                                .child('dataDefault')
                                .child('estado')
                                .child(rash)
                                .set({ estado: estadoInput })
                                .catch(e => {
                                    callbackSpinner();
                                    Alert.alert(
                                        'Error - Relate ao desenvolvedor',
                                        `Error: ${e}`
                                    );
                                });
                    })
                    .catch(e => {
                        callbackSpinner();
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        );
                    });

                await dir
                    .child('dataDefault')
                    .child('promoter')
                    .once('value')
                    .then(async snapshot => {
                        snapshot.forEach(childItem => {
                            if (promoterInput == childItem.val().promoter) {
                                if (
                                    validationPromoter === undefined ||
                                    validationPromoter === 0
                                )
                                    control = 1;
                            }
                        });
                        if (control != 1 && validationPromoter != 1)
                            await dir
                                .child('dataDefault')
                                .child('promoter')
                                .child(rash)
                                .set({ promoter: promoterInput })
                                .catch(e => {
                                    callbackSpinner();
                                    Alert.alert(
                                        'Error - Relate ao desenvolvedor',
                                        `Error: ${e}`
                                    );
                                });
                    })
                    .catch(e => {
                        callbackSpinner();
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        );
                    });

                if (control === 1) {
                    callbackSpinner();
                    Alert.alert('Aviso', 'Algum campo já foi cadastrado');
                }

                if (control != 1) {
                    await dir
                        .child('eventCurrent')
                        .set({
                            name: nameInput,
                            city: cityInput,
                            estado: estadoInput,
                            promoter: promoterInput,
                            dateInitial,
                            dateFinal,
                            releases: 'expenses, sales, productsFinal',
                        })
                        .then(() => {
                            dir.child('eventCurrent')
                                .child('releases')
                                .child('profit')
                                .set({ profit: 0 })
                                .then(() => {
                                    Keyboard.dismiss();
                                    Alert.alert(
                                        'Ação realizada',
                                        'Cadastro bem sucedido!'
                                    );
                                    callbackSpinner();
                                    callback();
                                })
                                .catch(e => {
                                    callbackSpinner();
                                    Alert.alert(
                                        'Error - Relate ao desenvolvedor',
                                        `Error: ${e}`
                                    );
                                });
                        })
                        .catch(e => {
                            callbackSpinner();
                            Alert.alert(
                                'Error - Relate ao desenvolvedor',
                                `Error: ${e}`
                            );
                        });

                    await dir
                        .child('eventActive')
                        .set({ eventActive: 1 })
                        .catch(e => {
                            callbackSpinner();
                            Alert.alert(
                                'Error - Relate ao desenvolvedor',
                                `Error: ${e}`
                            );
                        });
                }
            } else {
                callbackSpinner();
                Alert.alert('Aviso', 'Preencha todos os campos');
            }
        } else {
            callbackSpinner();
            Alert.alert('Aviso', 'Verifique se as datas estão corretas!');
        }
    };
};

export const GetDataDefault = callback => {
    return async () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault');
        const listName = [];
        const listCity = [];
        const listEstado = [];
        const listPromoter = [];
        await dir
            .child('name')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    listName.push({
                        name: childItem.val().name,
                    });
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        await dir
            .child('city')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    listCity.push({
                        city: childItem.val().city,
                    });
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        await dir
            .child('estado')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    listEstado.push({
                        estado: childItem.val().estado,
                    });
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        await dir
            .child('promoter')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    listPromoter.push({
                        promoter: childItem.val().promoter,
                    });
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        callback(listName, listCity, listEstado, listPromoter);
    };
};

// aviso para enviar os dados
export const SendDataDefault = callback => {
    return () => {
        Alert.alert('Aviso', 'Deseja adicionar esses dados?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente',
                onPress: () => callback(),
            },
        ]);
    };
};
