// imports libraries/API's
import firebase from '../../dep/firebase/FirebaseConnection';

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
