import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

export default class ExpensesItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.name}</Text>
                <TouchableHighlight onPress={() => this.props.deleteItem(this.props.data.key)}>
                    <Text>x</Text>
                </TouchableHighlight>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
