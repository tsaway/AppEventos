// imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

// enviar as taxas de cartão para o firebase
export const SendCardFee = (cred, deb, callback) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('cardFee');
        let credit = cred.replace(',', '.');
        let debit = deb.replace(',', '.');
        credit = parseFloat(credit);
        debit = parseFloat(debit);

        if (cred != '' && deb != '') {
            Keyboard.dismiss();
            Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                { text: 'Não', onPress: () => callback() },
                {
                    text: 'Sim, estou ciente',
                    onPress: () => {
                        dir.set({
                            credit,
                            debit,
                        })
                            .then(() => {
                                Alert.alert(
                                    'Ação realizada',
                                    'Dados alterados com sucesso!'
                                );
                                callback();
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
        } else Alert.alert('Aviso', 'Preencha todos os campos');
    };
};

// pegar os dados dos ultimos reajustes das taxas de crédito e débito do firebase
export const GetCardFee = callback => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('cardFee');

        dir.on('value', snapshot => {
            const cred = snapshot.val().credit;
            const deb = snapshot.val().debit;
            let credit = cred.toString();
            let debit = deb.toString();

            credit = `${credit.replace('.', ',')}%`;
            debit = `${debit.replace('.', ',')}%`;
            callback(credit, debit);
        });
    };
};

// enviar a nova despesa para o firebase
export const NewExpenses = (name, callback) => {
    return () => {
        const { key } = firebase
            .database()
            .ref('app')
            .push();
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('expensesRegisted');

        if (name != '') {
            Keyboard.dismiss();
            Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
                { text: 'Não', onPress: () => callback() },
                {
                    text: 'Sim, estou ciente',
                    onPress: () => {
                        dir.child(key)
                            .set({
                                name,
                            })
                            .then(() => {
                                Alert.alert(
                                    'Ação realizada',
                                    `A despesa "${name}" foi adicionada!`
                                );
                                callback();
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
        } else Alert.alert('Aviso', 'Preencha todos os campos');
    };
};

// pegar a lista de despesas registradas do firebase
export const GetListExpenses = callback => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('dataDefault')
            .child('expensesRegisted');

        dir.on('value', snapshot => {
            const list = [];
            snapshot.forEach(childItem => {
                list.push({
                    key: childItem.key,
                    name: childItem.val().name,
                });
            });
            callback(list);
        });
    };
};

// Deletar um item da lista de despesas registradas do firebase
export const DeleteItemExpenses = key => {
    return () => {
        Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente',
                onPress: () =>
                    firebase
                        .database()
                        .ref('app')
                        .child('dataDefault')
                        .child('expensesRegisted')
                        .child(key)
                        .remove()
                        .catch(e =>
                            Alert.alert(
                                'Error - Relate ao desenvolvedor',
                                `Error: ${e}`
                            )
                        ),
            },
        ]);
    };
};
