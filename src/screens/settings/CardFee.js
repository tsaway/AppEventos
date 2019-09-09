//imports libraries/API's
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { SendCardFee, GetCardFee } from './../../actions/AppAction';

export class CardFee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cred: '',
            deb: '',
            changeCred: '...',
            changeDeb: '...'
        };


    }

    componentDidMount() {
        this.props.GetCardFee((credit, debit) => {
            this.setState({
                changeCred: credit,
                changeDeb: debit
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Adicione abaixo as novas taxas de crédito e débito</Text>
                <TextInput keyboardType='numeric' placeholder='Crédito: ' value={this.state.cred}
                    onChangeText={(txt) => this.setState({ cred: txt })} />
                <Text>Valor do último reajuste: {this.state.changeCred}</Text>
                <TextInput keyboardType='numeric' placeholder='Débito:' value={this.state.deb}
                    onChangeText={(txt) => this.setState({ deb: txt })} />
                <Text>Valor do último reajuste: {this.state.changeDeb}</Text>
                <TouchableHighlight
                    onPress={() => this.props.SendCardFee(
                        this.state.cred,
                        this.state.deb,
                        () => this.setState({ cred: '', deb: '' }))}
                    underlayColor='transparent'>
                    <Text>Reajustar</Text>
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

    };
};

const CardFeeConnect = connect(mapStateToProps, { SendCardFee, GetCardFee })(CardFee);
export default CardFeeConnect;