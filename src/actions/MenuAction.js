// imports libraries/API's
import { Alert } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

// finalizar o evento
export const EndEvent = callback => {
    return () => {
        const dir = firebase.database().ref('app');
        dir.child('eventActive')
            .once('value')
            .then(snapshot => {
                const { eventActive } = snapshot.val();
                if (eventActive === 1) {
                    Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                        { text: 'Não' },
                        {
                            text: 'Sim, quero finalizar',
                            onPress: () => {
                                dir.child('eventActive')
                                    .set({ eventActive: 0 })
                                    .then(() => {
                                        Alert.alert(
                                            'Ação realizada',
                                            'Evento finalizado com sucesso!'
                                        );
                                        dir.child('eventCurrent')
                                            .once('value')
                                            .then(snapshot => {
                                                const {
                                                    name,
                                                    city,
                                                    estado,
                                                    promoter,
                                                    dateInitial,
                                                    dateFinal,
                                                    releases,
                                                } = snapshot.val();
                                                callback(
                                                    name,
                                                    city,
                                                    estado,
                                                    promoter,
                                                    dateInitial,
                                                    dateFinal,
                                                    releases
                                                );
                                            });
                                    })
                                    .catch(e =>
                                        Alert.alert(
                                            'Error - Relate ao desenvolvedor',
                                            `Error: ${e}`
                                        )
                                    );
                            },
                        },
                    ]);
                } else Alert.alert('Aviso', 'Não é temporada de evento');
            });
    };
};

// salvar os dados do ultimo evento no firebase
export const SaveEvent = (
    name,
    city,
    estado,
    promoter,
    dateInitial,
    dateFinal,
    releases
) => {
    return () => {
        // salvar o eventCurrent
        const dir = firebase.database().ref('app');
        const { key } = firebase
            .database()
            .ref('app')
            .child('eventActive')
            .push();

        dir.child('pastEvents')
            .child(key)
            .set({
                name,
                city,
                estado,
                promoter,
                dateInitial,
                dateFinal,
                releases,
            })
            .then(() => dir.child('eventCurrent').remove())
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};

// pegar a lista de despesas registradas
export const GetExpensesRegisted = callback => {
    return dispatch => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault');
        const listExpensesRegisted = [];

        dir.child('expensesRegisted')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    listExpensesRegisted.push({
                        name: childItem.val().name,
                    });
                });
            })
            .then(() => {
                dispatch({
                    type: 'changeExpensesRegisted',
                    payload: {
                        expensesRegisted: listExpensesRegisted,
                    },
                });
                callback();
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};
