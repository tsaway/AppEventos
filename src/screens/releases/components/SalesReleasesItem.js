// imports libraries/API's
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class SalesReleasesItem extends Component {
    render() {
        return (
            <View style={styles.main}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingRight: 10,
                    }}
                >
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() =>
                            this.props.deleteItem(this.props.data.key)
                        }
                    >
                        <Text style={styles.txt}>x</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleMain}>{this.props.data.date}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Dinheiro: R${this.props.data.money}
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Crédito: R${this.props.data.cardCredit}
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Débito: R${this.props.data.cardDebit}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleMain: {
        fontSize: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
    },
    txt: {
        fontSize: 22,
        textAlign: 'center',
    },
});
