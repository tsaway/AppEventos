//imports libraries/API's
import { Alert, Keyboard } from 'react-native'
import firebase from './../../dep/firebase/FirebaseConnection'

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