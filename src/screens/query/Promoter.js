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
import { QueryPromoter } from './../../actions/QueryAction';

//imports components
import PromoterItem from './components/PromoterItem';

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
            <View style={styles.container}>
                <Text style={styles.title}>
                    Consultar os eventos por promotora
                </Text>
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
                            renderItem={({ item }) => (
                                <PromoterItem data={item} />
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
        listPromoter: state.app.listPromoter,
    };
};

const PromoterConnect = connect(
    mapStateToProps,
    { QueryPromoter }
)(Promoter);
export default PromoterConnect;
