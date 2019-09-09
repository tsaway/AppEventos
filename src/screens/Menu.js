//imports libraries/API's
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

export class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('EventRegistration')}>
                    <Text>Cadastro do Evento</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('ReleasesTab')}>
                    <Text>Lançamentos</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('ConsultationsTab')}>
                    <Text>Consultas</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('SettingsTab')}>
                    <Text>Configurações</Text>
                </TouchableHighlight>
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
        teste: state.app.teste
    };
};

const MenuConnect = connect(mapStateToProps, {})(Menu);
export default MenuConnect;