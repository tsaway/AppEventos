// imports libraries/API's
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

//imports files
import { QueryPeriod } from './../../actions/QueryAction';

//imports components
import QueryItem from './components/QueryItem';

export class Period extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInitial: '',
            dateFinal: '',
            isDateInitialVisible: false,
            isDateFinalVisible: false,
            isLoadQueryPeriod: false,
            isModalVisible: false,
            selectedDateInitial: 'Selecione a data inicial',
            selectedDateFinal: 'Selecione a data final',
            query: [],
        };
    }

    render() {
        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Consultar os eventos por período
                    </Text>
                </View>
                <View style={styles.control}>
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
                        style={styles.btnMaster}
                        onPress={() => {
                            this.setState({ isLoadQueryPeriod: true });
                            this.props.QueryPeriod(
                                this.state.dateInitial,
                                this.state.dateFinal,
                                query => {
                                    this.setState({
                                        isLoadQueryPeriod: false,
                                        isModalVisible: true,
                                        query,
                                    });
                                },
                                () =>
                                    this.setState({
                                        isLoadQueryPeriod: false,
                                    })
                            );
                        }}
                    >
                        <Text style={styles.btnTxt}>Consultar</Text>
                    </TouchableHighlight>
                </View>
                <Spinner
                    visible={this.state.isLoadQueryPeriod}
                    textContent={'Consultando eventos...'}
                    textStyle={{ color: '#FFF' }}
                />
                {/* --------------- Modal Consultar evento --------------- */}
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
                        <Text style={[styles.title, { marginBottom: 15 }]}>
                            Eventos Consultados
                        </Text>
                        <FlatList
                            data={this.state.query}
                            renderItem={({ item }) => <QueryItem data={item} />}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollMain: {
        flex: 1,
    },
    header: {
        width: '100%',
        marginTop: 20,
    },
    control: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    btnDate: {
        backgroundColor: 'rgba(92, 134, 225, 0.3)',
        borderRadius: 10,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnMaster: {
        backgroundColor: '#4E5EDE',
        width: '70%',
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnTxt: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    modal: {
        flex: 1,
        padding: 20,
    },
    exit: {
        padding: 10,
        alignItems: 'flex-end',
    },
});

const mapStateToProps = state => {
    return {};
};

const PeriodConnect = connect(
    mapStateToProps,
    { QueryPeriod }
)(Period);
export default PeriodConnect;
