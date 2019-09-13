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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

// imports files
import {
    SendSales,
    GetListReleaseSales,
    DeleteItemReleaseSales,
} from '../../actions/ReleasesAction';

// imports components
import SalesReleasesItem from './components/SalesReleasesItem';

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneyValue: '',
            cardDebitValue: '',
            cardCreditValue: '',
            date: '',
            selectedDate: 'Selecione uma data',
            pickerValueName: 0,
            isModalVisible: false,
            isDateVisible: false,
            list: [],
        };
    }

    render() {
        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.container}>
                    <Text style={styles.txtTitle}>{this.props.eventName}</Text>
                    <View style={styles.control}>
                        <TextInput
                            keyboardType="numeric"
                            placeholderTextColor="#9b9b9b"
                            placeholder="Dinheiro: "
                            value={this.state.moneyValue}
                            style={styles.input}
                            onChangeText={txt =>
                                this.setState({ moneyValue: txt })
                            }
                        />
                        <TextInput
                            keyboardType="numeric"
                            placeholderTextColor="#9b9b9b"
                            placeholder="Cartão débito: "
                            value={this.state.cardDebitValue}
                            style={styles.input}
                            onChangeText={txt =>
                                this.setState({ cardDebitValue: txt })
                            }
                        />
                        <TextInput
                            keyboardType="numeric"
                            placeholderTextColor="#9b9b9b"
                            placeholder="Cartão crédito: "
                            value={this.state.cardCreditValue}
                            style={styles.input}
                            onChangeText={txt =>
                                this.setState({ cardCreditValue: txt })
                            }
                        />
                        <TouchableHighlight
                            underlayColor="#9b9b9b"
                            style={styles.btnDate}
                            onPress={() =>
                                this.setState({ isDateVisible: true })
                            }
                        >
                            <Text style={{ fontSize: 16 }}>
                                {this.state.selectedDate}
                            </Text>
                        </TouchableHighlight>
                        <DateTimePicker
                            isVisible={this.state.isDateVisible}
                            onConfirm={date => {
                                const dateFormat = moment(date).format(
                                    'DD/MM/YYYY'
                                );
                                this.setState({
                                    isDateVisible: false,
                                    selectedDate: `Data selecionada: ${dateFormat}`,
                                    date: dateFormat,
                                });
                            }}
                            onCancel={() =>
                                this.setState({ isDateFinalVisible: false })
                            }
                        />
                        <TouchableHighlight
                            onPress={() =>
                                this.props.SendSales(
                                    this.state.moneyValue,
                                    this.state.cardDebitValue,
                                    this.state.cardCreditValue,
                                    this.state.date,
                                    () =>
                                        this.setState({
                                            moneyValue: '',
                                            cardCreditValue: '',
                                            cardDebitValue: '',
                                            selectedDate: 'Selecione uma data',
                                        })
                                )
                            }
                            underlayColor="#5FC7EA"
                            style={styles.btn}
                        >
                            <Text style={styles.txtBtn}>Registrar vendas</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() =>
                                this.props.GetListReleaseSales(list =>
                                    this.setState({
                                        list,
                                        isModalVisible: true,
                                    })
                                )
                            }
                            underlayColor="#5FC7EA"
                            style={styles.btn}
                        >
                            <Text style={styles.txtBtn}>
                                Verificar lista de vendas
                            </Text>
                        </TouchableHighlight>
                    </View>
                    {/* ------------ Modal Listar vendas registradas no evento atual ------------ */}
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
                                Vendas Registradas
                            </Text>
                            <FlatList
                                data={this.state.list}
                                renderItem={({ item }) => (
                                    <SalesReleasesItem
                                        data={item}
                                        deleteItem={
                                            this.props.DeleteItemReleaseSales
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
        marginTop: 50,
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
    btnDate: {
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

const mapStateToProps = state => {
    return {
        eventName: state.app.eventName,
    };
};

const SalesConnect = connect(
    mapStateToProps,
    {
        SendSales,
        GetListReleaseSales,
        DeleteItemReleaseSales,
    }
)(Sales);
export default SalesConnect;
