// imports libraries/API's
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Modal,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';

// imports files
import {
    NewExpenses,
    GetListExpenses,
    DeleteItemExpenses,
} from '../../actions/SettingsAction';

// imports components
import ExpensesRegistedItem from './components/ExpensesRegistedItem';

export class ExpensesRegisted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isModalVisible: false,
            list: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txtTitle}>
                    Adicione abaixo uma nova despesa
                </Text>
                <View style={styles.control}>
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        placeholder="Nome: "
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={txt => this.setState({ name: txt })}
                    />
                    <TouchableHighlight
                        onPress={() =>
                            this.props.NewExpenses(this.state.name, () =>
                                this.setState({ name: '' })
                            )
                        }
                        underlayColor="#5FC7EA"
                        style={styles.btn}
                    >
                        <Text style={styles.txtBtn}>Adicionar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() =>
                            this.props.GetListExpenses(list =>
                                this.setState({
                                    list,
                                    isModalVisible: true,
                                })
                            )
                        }
                        underlayColor="#5FC7EA"
                        style={styles.btn}
                    >
                        <Text style={styles.txtBtn}>Listar despesas</Text>
                    </TouchableHighlight>
                </View>
                {/* --------------- Modal Listar despesas --------------- */}
                <Modal
                    animationType="slide"
                    visible={this.state.isModalVisible}
                >
                    <View style={styles.exit}>
                        <TouchableHighlight
                            onPress={() =>
                                this.setState({ isModalVisible: false })
                            }
                            underlayColor="transparent"
                        >
                            <Text style={{ fontSize: 18 }}>X</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modal}>
                        <Text style={[styles.txtTitle, { marginBottom: 15 }]}>
                            Lista de Despesas
                        </Text>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) => (
                                <ExpensesRegistedItem
                                    data={item}
                                    deleteItem={this.props.DeleteItemExpenses}
                                />
                            )}
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    control: {
        width: '100%',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        padding: 20,
    },
    input: {
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        color: '#000',
        width: '80%',
        height: 50,
        padding: 10,
        fontSize: 16,
        marginTop: 20,
        borderRadius: 10,
    },
    btn: {
        backgroundColor: '#4E5EDE',
        width: '90%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    txtBtn: {
        color: '#FFF',
        fontSize: 20,
    },
    txtTitle: {
        fontSize: 24,
        textAlign: 'center',
    },
    exit: {
        padding: 10,
        alignItems: 'flex-end',
    },
});

const mapStateToProps = state => {
    return {};
};

const ExpensesRegistedConnect = connect(
    mapStateToProps,
    {
        NewExpenses,
        GetListExpenses,
        DeleteItemExpenses,
    }
)(ExpensesRegisted);
export default ExpensesRegistedConnect;
