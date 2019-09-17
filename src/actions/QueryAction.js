// imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

export const QueryPeriod = (dateInit, dateFin, callback) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('pastEvents');
        let query = [];

        //Date Initial
        const arrayDateInitial = dateInit.split('/', 3);
        const dayInitial = arrayDateInitial[0];
        const monthInitial = arrayDateInitial[1];
        const yearInitial = arrayDateInitial[2];

        //Date Final
        const arrayDateFinal = dateFin.split('/', 3);
        const dayFinal = arrayDateFinal[0];
        const monthFinal = arrayDateFinal[1];
        const yearFinal = arrayDateFinal[2];

        if (
            dayFinal >= dayInitial &&
            monthFinal >= monthInitial &&
            yearFinal >= yearInitial
        ) {
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
                        } = childItem.val();
                        //Data inicial de cada item do banco
                        const arrayDateInitialBank = dateInitial.split('/', 3);
                        const dayI = arrayDateInitialBank[0];
                        const monthI = arrayDateInitialBank[1];
                        const yearI = arrayDateInitialBank[2];
                        if (
                            dayI >= dayInitial &&
                            dayI <= dayFinal &&
                            monthI >= monthInitial &&
                            monthI <= monthFinal &&
                            yearI >= yearInitial &&
                            yearI <= yearFinal
                        ) {
                            query.push({
                                key,
                                name,
                                city,
                                estado,
                                promoter,
                                dateInitial,
                                dateFinal,
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
        } else Alert.alert('Aviso', 'Verifique se as datas estão corretas!');
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
