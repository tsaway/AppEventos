// imports libraries/API's
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PromoterItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.promoter}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
