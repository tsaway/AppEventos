// imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

export const QueryPeriod = (dateInit, dateFin, callback, pauseLoad) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('pastEvents');
        let query = [];

        //Date Initial
        const arrayDateInitial = dateInit.split('/', 3);
        const dateInitialConverted = new Date(
            arrayDateInitial[2],
            arrayDateInitial[1] - 1,
            arrayDateInitial[0]
        );

        //Date Final
        const arrayDateFinal = dateFin.split('/', 3);
        const dateFinalConverted = new Date(
            arrayDateFinal[2],
            arrayDateFinal[1] - 1,
            arrayDateFinal[0]
        );

        if (dateFinalConverted >= dateInitialConverted) {
            dir.once('value')
                .then(snapshot => {
                    snapshot.forEach(childItem => {
                        const key = childItem.key;
                        const {
                            name,
                            city,
                            estado,
                            promoter,
                            dateInitial,
                            dateFinal,
                            releases,
                        } = childItem.val();
                        //Data inicial de cada item do banco
                        const arrayDateInitialBank = dateInitial.split('/', 3);
                        const dateInitialBank = new Date(
                            arrayDateInitialBank[2],
                            arrayDateInitialBank[1] - 1,
                            arrayDateInitialBank[0]
                        );
                        if (
                            dateInitialBank >= dateInitialConverted &&
                            dateInitialBank <= dateFinalConverted
                        ) {
                            query.push({
                                key,
                                name,
                                city,
                                estado,
                                promoter,
                                dateInitial,
                                dateFinal,
                                releases,
                            });
                        }
                    });
                })
                .then(() => callback(query))
                .catch(e =>
                    Alert.alert(
                        'Error - Relate ao desenvolvedor',
                        `Error: ${e}`
                    )
                );
        } else {
            pauseLoad();
            Alert.alert('Aviso', 'Verifique se as datas estão corretas!');
        }
    };
};

export const QueryCity = (cityInput, callback) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('pastEvents');
        let query = [];

        dir.once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    const key = childItem.key;
                    const {
                        name,
                        city,
                        estado,
                        promoter,
                        dateInitial,
                        dateFinal,
                        releases,
                    } = childItem.val();

                    if (cityInput === city) {
                        query.push({
                            key,
                            name,
                            city,
                            estado,
                            promoter,
                            dateInitial,
                            dateFinal,
                            releases,
                        });
                    }
                });
            })
            .then(() => callback(query))
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};

export const QueryPromoter = (promoterInput, callback) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('pastEvents');
        let query = [];

        dir.once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    const key = childItem.key;
                    const {
                        name,
                        city,
                        estado,
                        promoter,
                        dateInitial,
                        dateFinal,
                        releases,
                    } = childItem.val();

                    if (promoterInput === promoter) {
                        query.push({
                            key,
                            name,
                            city,
                            estado,
                            promoter,
                            dateInitial,
                            dateFinal,
                            releases,
                        });
                    }
                });
            })
            .then(() => callback(query))
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};
