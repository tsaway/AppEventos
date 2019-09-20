// imports libraries/API's
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Picker,
    TouchableHighlight,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//imports files
import { QueryCity } from './../../actions/QueryAction';

//imports components
import QueryItem from './components/QueryItem';

export class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadQueryCity: false,
            isModalVisible: false,
            pickerValueCity: 0,
            query: [],
        };
    }

    render() {
        const cityItems = this.props.listCity.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.city} />;
        });

        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Consultar os eventos por cidade
                    </Text>
                </View>
                <View style={styles.control}>
                    <Picker
                        selectedValue={this.state.pickerValueCity}
                        style={{ height: 50, width: 250 }}
                        onValueChange={itemValue =>
                            this.setState({
                                pickerValueCity: itemValue,
                            })
                        }
                    >
                        {cityItems}
                    </Picker>
                    <TouchableHighlight
                        style={styles.btnMaster}
                        onPress={() => {
                            this.setState({ isLoadQueryCity: true });
                            this.props.QueryCity(
                                this.props.listCity[this.state.pickerValueCity]
                                    .city,
                                query => {
                                    this.setState({
                                        isLoadQueryCity: false,
                                        isModalVisible: true,
                                        query,
                                    });
                                }
                            );
                        }}
                    >
                        <Text style={styles.btnTxt}>Consultar</Text>
                    </TouchableHighlight>
                </View>
                <Spinner
                    visible={this.state.isLoadQueryCity}
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
    return {
        listCity: state.app.listCity,
    };
};

const CityConnect = connect(
    mapStateToProps,
    { QueryCity }
)(City);
export default CityConnect;
