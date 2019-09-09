//imports libraries/API's
import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableHighlight, TextInput, Modal, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { NewExpenses, GetListExpenses, DeleteItemExpenses } from './../../actions/AppAction';
import ExpensesItem from './components/ExpensesItem';
export class ExpensesRegisted extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            modalVisible: false,
            list: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Adicione abaixo uma nova despesa</Text>
                <TextInput placeholder='Nome: ' value={this.state.name}
                    onChangeText={(txt) => this.setState({ name: txt })} />
                <TouchableHighlight onPress={() => this.props.NewExpenses(
                    this.state.name,
                    () => this.setState({ name: '' }))} underlayColor='transparent'>
                    <Text>Adicionar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.GetListExpenses(list => this.setState({
                        list: list,
                        modalVisible: true
                    }))} underlayColor='transparent'>
                    <Text>Listar despesas</Text>
                </TouchableHighlight>
                {/* --------------- Modal Listar despesas --------------- */}
                <Modal animationType='slide' visible={this.state.modalVisible}>
                    <View style={{ padding: 10, alignItems: 'flex-end' }}>
                        <TouchableHighlight
                            onPress={() => this.setState({ modalVisible: false })}
                            underlayColor='transparent'>
                            <Text>X</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modal}>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) =>
                                <ExpensesItem
                                    data={item}
                                    deleteItem={this.props.DeleteItemExpenses}
                                />}
                        />
                    </View>
                </Modal>
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

    },
    modal: {
        flex: 1,
        padding: 20
    }
});

const mapStateToProps = state => {
    return {

    };
};

const ExpensesRegistedConnect = connect(mapStateToProps, {
    NewExpenses, GetListExpenses, DeleteItemExpenses
})(ExpensesRegisted);
export default ExpensesRegistedConnect;