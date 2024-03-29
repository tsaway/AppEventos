// imports libraries/API's
import { Alert, Keyboard } from 'react-native';
import firebase from '../../dep/firebase/FirebaseConnection';

// ---------------------------------------- EXPENSES ----------------------------------------//

// envia uma nova despesa para a lista de despesas do evento atual
export const SendExpenses = (name, value, callback) => {
    return async () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('expenses');
        const { key } = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .push();

        // valores registrados no banco
        let keyRegisted = '';
        let nameRegisted = '';
        let valueRegisted = 0;

        let valueConverted = value.replace('.', '').replace(',', '.');
        valueConverted = parseFloat(valueConverted);

        // varrer todas as despesas registradas do evento atual
        // se tiver alguma igual, incrementar com a que ja estar la
        // se tiver diferente, adicionar normalmente

        await dir
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    if (name == childItem.val().name) {
                        keyRegisted = childItem.key;
                        nameRegisted = childItem.val().name;
                        valueRegisted = childItem.val().value;
                    }
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        if (value != '' && name != 'Selecione uma despesa') {
            // não precisa do name != 'selecione uma despesa'
            if (nameRegisted != '') {
                let valueTotal = valueConverted + valueRegisted;
                dir.child(keyRegisted)
                    .set({ name, value: valueTotal })
                    .then(async () => {
                        let profitCurrent = 0;
                        let dirProfit = firebase
                            .database()
                            .ref('app')
                            .child('eventCurrent')
                            .child('releases')
                            .child('profit');
                        await dirProfit
                            .once('value')
                            .then(
                                snapshot =>
                                    (profitCurrent = snapshot.val().profit)
                            );
                        let expenses = valueConverted;
                        let profit = profitCurrent - expenses;
                        dirProfit
                            .set({ profit })
                            .then(() => {
                                valueTotal = valueTotal.toString();
                                const valueTotalConverted = valueTotal.replace(
                                    '.',
                                    ','
                                );
                                Alert.alert(
                                    'Ação realizada',
                                    `R$${value} adicionado!\nDespesa atual de ${name}: R$${valueTotalConverted}`
                                );
                                callback();
                            })
                            .catch(e =>
                                Alert.alert(
                                    'Error - Relate ao desenvolvedor',
                                    `Error: ${e}`
                                )
                            );
                    })
                    .catch(e =>
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        )
                    );
            } else {
                dir.child(key)
                    .set({ name, value: valueConverted })
                    .then(async () => {
                        let profitCurrent = 0;
                        let dirProfit = firebase
                            .database()
                            .ref('app')
                            .child('eventCurrent')
                            .child('releases')
                            .child('profit');
                        await dirProfit
                            .once('value')
                            .then(
                                snapshot =>
                                    (profitCurrent = snapshot.val().profit)
                            );
                        let expenses = valueConverted;
                        let profit = profitCurrent - expenses;
                        dirProfit
                            .set({ profit })
                            .then(() => {
                                Alert.alert(
                                    'Ação realizada',
                                    `O lançamento da despesa "${name}" foi transmitida com sucesso!`
                                );
                                callback();
                            })
                            .catch(e =>
                                Alert.alert(
                                    'Error - Relate ao desenvolvedor',
                                    `Error: ${e}`
                                )
                            );
                    })
                    .catch(e =>
                        Alert.alert(
                            'Error - Relate ao desenvolvedor',
                            `Error: ${e}`
                        )
                    );
            }
        } else Alert.alert('Aviso', 'Preencha todos os campos');
    };
};

// pegar a lista de despesas cadastradas no evento atual
export const GetListReleaseExpenses = callback => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('expenses');

        dir.on('value', snapshot => {
            const list = [];

            snapshot.forEach(childItem => {
                let valueConverted = childItem.val().value;
                valueConverted = valueConverted.toString().replace('.', ',');
                list.push({
                    key: childItem.key,
                    name: childItem.val().name,
                    value: valueConverted,
                });
            });
            callback(list);
        });
    };
};

// Deletar um item da lista de despesas cadastradas no evento atual
export const DeleteItemReleaseExpenses = key => {
    return () => {
        Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente',
                onPress: () =>
                    firebase
                        .database()
                        .ref('app')
                        .child('eventCurrent')
                        .child('releases')
                        .child('expenses')
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

// ---------------------------------------- SALES ----------------------------------------//

// enviar o  registro de vendas daquela data
export const SendSales = (money, cardDebit, cardCredit, date, callback) => {
    return async () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('sales');
        const { key } = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .push();

        // valores registrados no banco
        let keyRegisted = '';

        let moneyConverted = money.replace('.', '').replace(',', '.');
        let cardDebitConverted = cardDebit.replace('.', '').replace(',', '.');
        let cardCreditConverted = cardCredit.replace('.', '').replace(',', '.');
        moneyConverted = parseFloat(moneyConverted);
        cardDebitConverted = parseFloat(cardDebitConverted);
        cardCreditConverted = parseFloat(cardCreditConverted);

        // varrer todas as vendas registradas do evento atual
        // se tiver alguma com a data igual, substituir com a que ja estar la
        // se tiver diferente, adicionar normalmente

        await dir
            .once('value')
            .then(snapshot => {
                snapshot.forEach(childItem => {
                    if (date == childItem.val().date) {
                        keyRegisted = childItem.key;
                    }
                });
            })
            .catch(e =>
                Alert.alert('Error - Relate ao desenvolvedor', `Error: ${e}`)
            );

        if (date != '') {
            if (money != '' && cardDebit != '' && cardCredit != '') {
                if (keyRegisted != '') {
                    Alert.alert(
                        'Aviso',
                        `O lançamento das vendas para a data ${date} já foi realizado!\nDeseja substituir os valores?`,
                        [
                            { text: 'Não' },
                            {
                                text: 'Sim, substituir',
                                onPress: () =>
                                    dir
                                        .child(keyRegisted)
                                        .set({
                                            money: moneyConverted,
                                            cardCredit: cardCreditConverted,
                                            cardDebit: cardDebitConverted,
                                            date,
                                        })
                                        .then(async () => {
                                            let profitCurrent = 0;
                                            let arraySale = [];
                                            let dirProfit = firebase
                                                .database()
                                                .ref('app')
                                                .child('eventCurrent')
                                                .child('releases')
                                                .child('profit');
                                            let dirSale = firebase
                                                .database()
                                                .ref('app')
                                                .child('eventCurrent')
                                                .child('releases')
                                                .child('sales')
                                                .child(keyRegisted);
                                            await dirSale
                                                .once('value')
                                                .then(snapshot => {
                                                    snapshot.forEach(
                                                        childItem => {
                                                            arraySale.push({
                                                                cardCredit: childItem.val()
                                                                    .cardCredit,
                                                                cardDebit: childItem.val()
                                                                    .cardDebit,
                                                                money: childItem.val()
                                                                    .money,
                                                            });
                                                        }
                                                    );
                                                });
                                            await dirProfit
                                                .once('value')
                                                .then(snapshot => {
                                                    profitCurrent = snapshot.val()
                                                        .profit;
                                                });
                                            let gain =
                                                moneyConverted +
                                                cardCreditConverted +
                                                cardDebitConverted -
                                                (arraySale.cardCredit +
                                                    arraySale.cardDebit +
                                                    arraySale.money);
                                            let profit = gain + profitCurrent;
                                            dirProfit
                                                .set({ profit })
                                                .then(() => {
                                                    Alert.alert(
                                                        'Ação realizada',
                                                        'Lançamento bem sucedido!'
                                                    );
                                                    callback();
                                                });
                                        })
                                        .catch(e =>
                                            Alert.alert(
                                                'Error - Relate ao desenvolvedor',
                                                `Error: ${e}`
                                            )
                                        ),
                            },
                        ]
                    );
                } else
                    dir.child(key)
                        .set({
                            money: moneyConverted,
                            cardCredit: cardCreditConverted,
                            cardDebit: cardDebitConverted,
                            date,
                        })
                        .then(async () => {
                            let profitCurrent = 0;
                            let dirProfit = firebase
                                .database()
                                .ref('app')
                                .child('eventCurrent')
                                .child('releases')
                                .child('profit');
                            await dirProfit
                                .once('value')
                                .then(
                                    snapshot =>
                                        (profitCurrent = snapshot.val().profit)
                                );
                            let gain =
                                moneyConverted +
                                cardCreditConverted +
                                cardDebitConverted;
                            let profit = gain + profitCurrent;
                            dirProfit.set({ profit }).then(() => {
                                Alert.alert(
                                    'Ação realizada',
                                    'Lançamento bem sucedido!'
                                );
                                callback();
                            });
                        })
                        .catch(e =>
                            Alert.alert(
                                'Error - Relate ao desenvolvedor',
                                `Error: ${e}`
                            )
                        );
            } else Alert.alert('Aviso', 'Preencha todos os campos');
        } else Alert.alert('Aviso', 'Verifique se as datas estão corretas!');
    };
};

// pegar a lista de vendas cadastradas no evento atual
export const GetListReleaseSales = callback => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('sales');

        dir.on('value', snapshot => {
            const list = [];

            snapshot.forEach(childItem => {
                let moneyConverted = childItem.val().money;
                let cardCreditConverted = childItem.val().cardCredit;
                let cardDebitConverted = childItem.val().cardDebit;

                moneyConverted = moneyConverted.toString().replace('.', ',');
                cardCreditConverted = cardCreditConverted
                    .toString()
                    .replace('.', ',');
                cardDebitConverted = cardDebitConverted
                    .toString()
                    .replace('.', ',');

                list.push({
                    key: childItem.key,
                    date: childItem.val().date,
                    money: moneyConverted,
                    cardCredit: cardCreditConverted,
                    cardDebit: cardDebitConverted,
                });
            });
            callback(list);
        });
    };
};

export const DeleteItemReleaseSales = key => {
    return () => {
        Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente',
                onPress: () =>
                    firebase
                        .database()
                        .ref('app')
                        .child('eventCurrent')
                        .child('releases')
                        .child('sales')
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

// ---------------------------------------- PRODUCTSFINAL ----------------------------------------//

// enviar um produto do evento atual para o firebase
export const SendProductsFinal = (name, qtd, callback) => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('productsFinal');
        const { key } = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .push();

        if (name != '' && qtd != '') {
            dir.child(key)
                .set({ name, qtd })
                .then(() => {
                    Alert.alert(
                        'Ação realizada',
                        `O lançamento do produto "${name}" foi transmitido com sucesso!`
                    );
                    callback();
                })
                .catch(e =>
                    Alert.alert(
                        'Error - Relate ao desenvolvedor',
                        `Error: ${e}`
                    )
                );
        } else Alert.alert('Aviso', 'Preencha todos os campos');
    };
};

export const GetListReleaseProductsFinal = callback => {
    return () => {
        const dir = firebase
            .database()
            .ref('app')
            .child('eventCurrent')
            .child('releases')
            .child('productsFinal');

        dir.on('value', snapshot => {
            const list = [];

            snapshot.forEach(childItem =>
                list.push({
                    key: childItem.key,
                    name: childItem.val().name,
                    qtd: childItem.val().qtd,
                })
            );
            callback(list);
        });
    };
};

export const DeleteItemReleaseProductsFinal = key => {
    return () => {
        Alert.alert('Aviso', 'Tem certeza que quer fazer isto?', [
            { text: 'Não' },
            {
                text: 'Sim, estou ciente',
                onPress: () =>
                    firebase
                        .database()
                        .ref('app')
                        .child('eventCurrent')
                        .child('releases')
                        .child('productsFinal')
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
