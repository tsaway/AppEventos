import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Keyboard, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { } from './../../actions/AppAction';

export class ProductsFinal extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>ProductsFinal</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txtTitle: {
        color: '#000000',
        fontSize: 24

    }
});

const mapStateToProps = state => {
    return {

    };
};

const ProductsFinalConnect = connect(mapStateToProps, {})(ProductsFinal);
export default ProductsFinalConnect;