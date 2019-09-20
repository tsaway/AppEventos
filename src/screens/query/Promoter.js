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
import { QueryPromoter } from './../../actions/QueryAction';

//imports components
import QueryItem from './components/QueryItem';

export class Promoter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadQueryPromoter: false,
            isModalVisible: false,
            pickerValuePromoter: 0,
            query: [],
        };
    }

    render() {
        const promoterItems = this.props.listPromoter.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v.promoter} />;
        });

        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Consultar os eventos por promotora
                    </Text>
                </View>
                <View style={styles.control}>
                    <Picker
                        selectedValue={this.state.pickerValuePromoter}
                        style={{ height: 50, width: 250 }}
                        onValueChange={itemValue =>
                            this.setState({
                                pickerValuePromoter: itemValue,
                            })
                        }
                    >
                        {promoterItems}
                    </Picker>
                    <TouchableHighlight
                        style={styles.btnMaster}
                        onPress={() => {
                            this.setState({ isLoadQueryPromoter: true });
                            this.props.QueryPromoter(
                                this.props.listPromoter[
                                    this.state.pickerValuePromoter
                                ].promoter,
                                query => {
                                    this.setState({
                                        isLoadQueryPromoter: false,
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
                    visible={this.state.isLoadQueryPromoter}
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
        listPromoter: state.app.listPromoter,
    };
};

const PromoterConnect = connect(
    mapStateToProps,
    { QueryPromoter }
)(Promoter);
export default PromoterConnect;
