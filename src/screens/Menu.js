import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txtTitle}>MENU</Text>
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

const MenuConnect = connect(mapStateToProps, {})(Menu);
export default MenuConnect;