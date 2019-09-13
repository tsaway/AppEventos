import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView,
    Modal,
    Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    RegisterEvent,
    GetDataDefault,
    SendDataDefault,
} from '../../actions/RegisterEventAction';

export class EventRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            estado: '',
            promoter: '',
            dateInitial: '',
            dateFinal: '',
            isDateInitialVisible: false,
            isDateFinalVisible: false,
            selectedDateInitial: 'Selecione a data inicial',
            selectedDateFinal: 'Selecione a data final',
            isDataDefaultVisible: false,
            validation: [
                { name: 0 },
                { city: 0 },
                { estado: 0 },
                { promoter: 0 },
            ],
            listName: [],
            listCity: [],
            listEstado: [],
            listPromoter: [],
            pickerValueName: 0,
            pickerValueCity: 0,
            pickerValueEstado: 0,
            pickerValuePromoter: 0,
            isLoadRegisterEvent: false,
        };

        this.props.GetDataDefault(
            (listName, listCity, listEstado, listPromoter) =>
                this.setState({
                    listName,
                    listCity,
                    listEstado,
                    listPromoter,
                })
        );
    }

    render() {
        const nameItems = this.state.listName.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.name} />;
        });

        const cityItems = this.state.listCity.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.city} />;
        });

        const estadoItems = this.state.listEstado.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.estado} />;
        });

        const promoterItems = this.state.listPromoter.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.promoter} />;
        });

        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.container}>
                    <TouchableHighlight
                        underlayColor="transparent"
                        style={styles.btnDataDefault}
                        onPress={() =>
                            this.setState({ isDataDefaultVisible: true })
                        }
                    >
                        <Image
                            source={require('./../../assets/images/icons/arrow/navigation.png')}
                            style={styles.imgDataDefault}
                        />
                    </TouchableHighlight>
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        value={this.state.name}
                        style={styles.input}
                        placeholder="Nome:"
                        onChangeText={txt => this.setState({ name: txt })}
                    />
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        value={this.state.city}
                        style={styles.input}
                        placeholder="Cidade:"
                        onChangeText={txt => this.setState({ city: txt })}
                    />
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        value={this.state.estado}
                        style={styles.input}
                        placeholder="Estado:"
                        onChangeText={txt => this.setState({ estado: txt })}
                    />
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        value={this.state.promoter}
                        style={styles.input}
                        placeholder="Promotora:"
                        onChangeText={txt => this.setState({ promoter: txt })}
                    />
                    <TouchableHighlight
                        underlayColor="#9b9b9b"
                        style={styles.btnDate}
                        onPress={() =>
                            this.setState({ isDateInitialVisible: true })
                        }
                    >
                        <Text style={{ fontSize: 16 }}>
                            {this.state.selectedDateInitial}
                        </Text>
                    </TouchableHighlight>
                    <DateTimePicker
                        isVisible={this.state.isDateInitialVisible}
                        onConfirm={date => {
                            const dateFormat = moment(date).format(
                                'DD/MM/YYYY'
                            );
                            this.setState({
                                isDateInitialVisible: false,
                                selectedDateInitial: `Data inicial: ${dateFormat}`,
                                dateInitial: dateFormat,
                            });
                        }}
                        onCancel={() =>
                            this.setState({ isDateInitialVisible: false })
                        }
                    />
                    <TouchableHighlight
                        underlayColor="#9b9b9b"
                        style={styles.btnDate}
                        onPress={() =>
                            this.setState({ isDateFinalVisible: true })
                        }
                    >
                        <Text style={{ fontSize: 16 }}>
                            {this.state.selectedDateFinal}
                        </Text>
                    </TouchableHighlight>
                    <DateTimePicker
                        isVisible={this.state.isDateFinalVisible}
                        onConfirm={date => {
                            const dateFormat = moment(date).format(
                                'DD/MM/YYYY'
                            );
                            this.setState({
                                isDateFinalVisible: false,
                                selectedDateFinal: `Data final: ${dateFormat}`,
                                dateFinal: dateFormat,
                            });
                        }}
                        onCancel={() =>
                            this.setState({ isDateFinalVisible: false })
                        }
                    />
                    <TouchableHighlight
                        underlayColor="#5FC7EA"
                        style={styles.btn}
                        onPress={() => {
                            this.setState({ isLoadRegisterEvent: true });
                            this.props.RegisterEvent(
                                this.state.name,
                                this.state.city,
                                this.state.estado,
                                this.state.promoter,
                                this.state.dateInitial,
                                this.state.dateFinal,
                                () => {
                                    this.setState({
                                        name: '',
                                        city: '',
                                        estado: '',
                                        promoter: '',
                                        selectedDateInitial:
                                            'Selecione a data inicial',
                                        selectedDateFinal:
                                            'Selecione a data final',
                                    });
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'Preload',
                                                }),
                                            ],
                                        })
                                    );
                                },
                                this.state.validation,
                                () => {
                                    this.setState({
                                        isLoadRegisterEvent: false,
                                    });
                                }
                            );
                        }}
                    >
                        <Text style={styles.txtBtn}>Cadastrar evento</Text>
                    </TouchableHighlight>
                    {/* --------------- Modal Lista dataDefault --------------- */}
                    <Modal
                        animationType="slide"
                        visible={this.state.isDataDefaultVisible}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styles.exit}>
                                <TouchableHighlight
                                    onPress={() =>
                                        this.setState({
                                            isDataDefaultVisible: false,
                                        })
                                    }
                                    underlayColor="transparent"
                                >
                                    <Text style={{ fontSize: 18 }}>X</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.modal}>
                                <View>
                                    <Text style={styles.modalTitle}>Nome</Text>
                                    <Picker
                                        selectedValue={
                                            this.state.pickerValueName
                                        }
                                        style={{ height: 50, width: 250 }}
                                        onValueChange={itemValue =>
                                            this.setState({
                                                pickerValueName: itemValue,
                                            })
                                        }
                                    >
                                        {nameItems}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={styles.modalTitle}>City</Text>
                                    <Picker
                                        selectedValue={
                                            this.state.pickerValueCity
                                        }
                                        style={{ height: 50, width: 250 }}
                                        onValueChange={itemValue =>
                                            this.setState({
                                                pickerValueCity: itemValue,
                                            })
                                        }
                                    >
                                        {cityItems}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={styles.modalTitle}>
                                        Estado
                                    </Text>
                                    <Picker
                                        selectedValue={
                                            this.state.pickerValueEstado
                                        }
                                        style={{ height: 50, width: 250 }}
                                        onValueChange={itemValue =>
                                            this.setState({
                                                pickerValueEstado: itemValue,
                                            })
                                        }
                                    >
                                        {estadoItems}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={styles.modalTitle}>
                                        Promotora
                                    </Text>
                                    <Picker
                                        selectedValue={
                                            this.state.pickerValuePromoter
                                        }
                                        style={{ height: 50, width: 250 }}
                                        onValueChange={itemValue =>
                                            this.setState({
                                                pickerValuePromoter: itemValue,
                                            })
                                        }
                                    >
                                        {promoterItems}
                                    </Picker>
                                </View>
                                <TouchableHighlight
                                    onPress={() => {
                                        if (this.state.pickerValueName === 0) {
                                            this.state.validation[0].name = 0;
                                            this.setState(this.state);
                                        } else {
                                            this.state.validation[0].name = 1;
                                            const newName = this.state.listName[
                                                this.state.pickerValueName
                                            ].name;
                                            this.state.name = newName;
                                            this.setState(this.state);
                                        }

                                        if (this.state.pickerValueCity === 0) {
                                            this.state.validation[1].city = 0;
                                            this.setState(this.state);
                                        } else {
                                            this.state.validation[1].city = 1;
                                            const newCity = this.state.listCity[
                                                this.state.pickerValueCity
                                            ].city;
                                            this.state.city = newCity;
                                            this.setState(this.state);
                                        }

                                        if (
                                            this.state.pickerValueEstado === 0
                                        ) {
                                            this.state.validation[2].estado = 0;
                                            this.setState(this.state);
                                        } else {
                                            this.state.validation[2].estado = 1;
                                            const newEstado = this.state
                                                .listEstado[
                                                this.state.pickerValueEstado
                                            ].estado;
                                            this.state.estado = newEstado;
                                            this.setState(this.state);
                                        }

                                        if (
                                            this.state.pickerValuePromoter === 0
                                        ) {
                                            this.state.validation[3].promoter = 0;
                                            this.setState(this.state);
                                        } else {
                                            this.state.validation[3].promoter = 1;
                                            const newPromoter = this.state
                                                .listPromoter[
                                                this.state.pickerValuePromoter
                                            ].promoter;
                                            this.state.promoter = newPromoter;
                                            this.setState(this.state);
                                        }
                                        this.props.SendDataDefault(() =>
                                            this.setState({
                                                isDataDefaultVisible: false,
                                            })
                                        );
                                    }}
                                    underlayColor="#5FC7EA"
                                    style={styles.btnModal}
                                >
                                    <Text style={styles.txtBtn}>Finalizar</Text>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </Modal>
                    <Spinner
                        visible={this.state.isLoadRegisterEvent}
                        textContent={'Registrando evento...'}
                        textStyle={{ color: '#FFF' }}
                    />
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
    btnDataDefault: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imgDataDefault: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        color: '#000',
        width: '80%',
        height: 50,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        marginTop: 20,
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
    btnModal: {
        backgroundColor: '#363636',
        width: '50%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalTitle: {
        fontSize: 22,
    },
    txtBtn: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    btnDate: {
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exit: {
        padding: 10,
        alignItems: 'flex-end',
    },
});

const mapStateToProps = state => {
    return {};
};

const EventRegistrationConnect = connect(
    mapStateToProps,
    {
        RegisterEvent,
        GetDataDefault,
        SendDataDefault,
    }
)(EventRegistration);
export default EventRegistrationConnect;
