// imports libraries/API's
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Picker,
    Keyboard,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
    SendExpenses,
    GetEventExpenses,
    DeleteItemReleaseExpenses,
    GetListReleaseExpenses,
} from '../../actions/ReleasesAction';

// imports components
import ExpensesReleasesItem from './components/ExpensesReleasesItem';

export class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            pickerValueName: 0,
            isModalVisible: false,
            list: [],
        };
    }

    render() {
        const nameItems = this.props.expensesRegisted.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.name} />;
        });

        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.container}>
                    <Text style={styles.txtTitle}>{this.props.eventName}</Text>
                    <View style={styles.control}>
                        <Picker
                            selectedValue={this.state.pickerValueName}
                            style={{ height: 50, width: 250 }}
                            onValueChange={itemValue =>
                                this.setState({ pickerValueName: itemValue })
                            }
                        >
                            {nameItems}
                        </Picker>
                        <TextInput
                            keyboardType="numeric"
                            placeholderTextColor="#9b9b9b"
                            placeholder="Valor: "
                            value={this.state.value}
                            style={styles.input}
                            onChangeText={txt => this.setState({ value: txt })}
                        />
                        <TouchableHighlight
                            onPress={() =>
                                this.props.SendExpenses(
                                    this.props.expensesRegisted[
                                        this.state.pickerValueName
                                    ].name,
                                    this.state.value,
                                    () => {
                                        Keyboard.dismiss();
                                        this.setState({
                                            value: '',
                                            pickerValueName: 0,
                                        });
                                    }
                                )
                            }
                            underlayColor="#5FC7EA"
                            style={styles.btn}
                        >
                            <Text style={styles.txtBtn}>
                                Registrar despesas
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.GetListReleaseExpenses(list =>
                                    this.setState({
                                        list,
                                        isModalVisible: true,
                                    })
                                );
                            }}
                            underlayColor="#5FC7EA"
                            style={styles.btn}
                        >
                            <Text style={styles.txtBtn}>
                                Verificar lista de despesas
                            </Text>
                        </TouchableHighlight>
                    </View>
                    {/* ------------ Modal Listar despesas registradas no evento atual ------------ */}
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
                            <Text
                                style={[styles.txtTitle, { marginBottom: 15 }]}
                            >
                                Despesas Registradas
                            </Text>
                            <FlatList
                                data={this.state.list}
                                renderItem={({ item }) => (
                                    <ExpensesReleasesItem
                                        data={item}
                                        deleteItem={
                                            this.props.DeleteItemReleaseExpenses
                                        }
                                    />
                                )}
                            />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollMain: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    control: {
        width: '100%',
        alignItems: 'center',
        marginTop: 120,
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
    modal: {
        flex: 1,
        padding: 20,
    },
});

const mapStateToProps = state => {
    return {
        eventName: state.app.eventName,
        expensesRegisted: state.app.expensesRegisted,
    };
};

const ExpensesConnect = connect(
    mapStateToProps,
    {
        SendExpenses,
        GetEventExpenses,
        DeleteItemReleaseExpenses,
        GetListReleaseExpenses,
    }
)(Expenses);
export default ExpensesConnect;
