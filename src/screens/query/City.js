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
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//imports files
import { QueryCity } from './../../actions/QueryAction';

//imports components
import CityItem from './components/CityItem';

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
            <View style={styles.container}>
                <Text style={styles.title}>
                    Consultar os eventos por cidade
                </Text>
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
                            renderItem={({ item }) => <CityItem data={item} />}
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
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    control: {
        width: '100%',
        alignItems: 'center',
    },
    btnMaster: {
        backgroundColor: '#4E5EDE',
        width: '90%',
        height: 50,
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
