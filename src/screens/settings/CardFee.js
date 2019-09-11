//imports libraries/API's
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import { connect } from 'react-redux'

//imports files
import { SendCardFee, GetCardFee } from './../../actions/SettingsAction'

export class CardFee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cred: '',
            deb: '',
            changeCred: '...',
            changeDeb: '...'
        }
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
                <Text style={styles.txtTitle}>Adicione abaixo as novas taxas de crédito e débito</Text>
                <View style={styles.control}>
                    <TextInput placeholderTextColor='#9b9b9b' value={this.state.cred}
                        style={styles.input} placeholder='Crédito:'
                        onChangeText={(txt) => this.setState({ cred: txt })} />
                    <Text>Valor do último reajuste: {this.state.changeCred}</Text>
                    <TextInput placeholderTextColor='#9b9b9b' placeholder='Débito:'
                        style={styles.input} value={this.state.deb}
                        onChangeText={(txt) => this.setState({ deb: txt })} />
                    <Text>Valor do último reajuste: {this.state.changeDeb}</Text>
                    <TouchableHighlight underlayColor='#5FC7EA' style={styles.btn}
                        onPress={() => this.props.SendCardFee(
                            this.state.cred,
                            this.state.deb,
                            () => this.setState({ cred: '', deb: '' }))} >
                        <Text style={styles.txtBtn}>Reajustar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    control: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        color: '#000',
        width: '80%',
        height: 50,
        padding: 10,
        fontSize: 16,
        marginTop: 20,
        borderRadius: 10
    },
    btn: {
        backgroundColor: '#4E5EDE',
        width: '90%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    txtBtn: {
        color: '#FFFFFF',
        fontSize: 20
    },
    txtTitle: {
        fontSize: 24,
        textAlign: 'center'
    }
})

const mapStateToProps = state => {
    return {

    }
}

const CardFeeConnect = connect(mapStateToProps, { SendCardFee, GetCardFee })(CardFee)
export default CardFeeConnect