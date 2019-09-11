//imports libraries/API's
import { Alert, Keyboard } from 'react-native'
import firebase from './../../dep/firebase/FirebaseConnection'

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
                            dir.child('eventActive').set({ eventActive: 0 }).then(() => {
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
                            }).catch(e =>
                                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`))
                        }
                    },
                ])
            } else Alert.alert('Aviso', 'Não é temporada de evento')
        })
    }
}

//salvar os dados do ultimo evento no firebase
export const SaveEvent = (name, city, estado, promoter, dateInitial, dateFinal) => {
    return () => {
        //salvar o eventCurrent 
        let dir = firebase.database().ref('app')
        let key = firebase.database().ref('app').child('eventActive').push().key
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