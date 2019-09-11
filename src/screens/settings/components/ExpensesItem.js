//imports libraries/API's
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

export default class ExpensesItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.data.name}</Text>
                <TouchableHighlight underlayColor='transparent'
                    onPress={() => this.props.deleteItem(this.props.data.key)}>
                    <Text style={styles.txt}>x</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10
    },
    title: {
        fontSize: 18
    },
    txt: {
        fontSize: 22,
        textAlign: 'center'
    }
})
