// imports libraries/API's
import firebase from '../../dep/firebase/FirebaseConnection';
import { Alert } from 'react-native';

// ouvinte do eventActive
export const ListinerEventActive = callback => {
    return dispatch => {
        const dir = firebase.database().ref('app');

        dir.child('eventCurrent')
            .once('value')
            .then(snapshot => {
                const eventName = snapshot.val().name;
                dispatch({
                    type: 'changeEventName',
                    payload: {
                        eventName,
                    },
                });
            });

        dir.child('eventActive').on('value', snapshot => {
            const { eventActive } = snapshot.val();
            dispatch({
                type: 'changeEventActive',
                payload: {
                    eventActive,
                },
            });
            if (eventActive == 1) {
                dispatch({
                    type: 'changeBgBtnMasterMenu',
                    payload: {
                        bgBtnMasterMenu: 'transparent',
                    },
                });
            } else if (eventActive == 0) {
                dispatch({
                    type: 'changeBgBtnMasterMenu',
                    payload: {
                        bgBtnMasterMenu: '#acacac',
                    },
                });
            }
            callback();
        });
    };
};

export const ListCity = callback => {
    return dispatch => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('city');
        let listCity = [];

        dir.once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    const key = childItem.key;
                    const { city } = childItem.val();
                    listCity.push({
                        key,
                        city,
                    });
                });
            })
            .then(() => {
                dispatch({
                    type: 'changeListCity',
                    payload: {
                        listCity,
                    },
                });
                callback();
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};

export const ListPromoter = callback => {
    return dispatch => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('promoter');
        let listPromoter = [];

        dir.once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    const key = childItem.key;
                    const { promoter } = childItem.val();
                    listPromoter.push({
                        key,
                        promoter,
                    });
                });
            })
            .then(() => {
                dispatch({
                    type: 'changeListPromoter',
                    payload: {
                        listPromoter,
                    },
                });
                callback();
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );
    };
};
