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

// imports files
import {
    SendProductsFinal,
    GetListReleaseProductsFinal,
    DeleteItemReleaseProductsFinal,
} from '../../actions/ReleasesAction';

// imports components
import ProductsFinalReleasesItem from './components/ProductsFinalReleasesItem';

export class ProductsFinal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            qtd: '',
            isModalVisible: false,
            list: [],
        };
    }

    render() {
        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.header}>
                    <Text style={styles.txtTitle}>
                        Evento {this.props.eventName}
                    </Text>
                </View>
                <View style={styles.control}>
                    <TextInput
                        placeholderTextColor="#9b9b9b"
                        placeholder="Nome: "
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={txt => this.setState({ name: txt })}
                    />
                    <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#9b9b9b"
                        placeholder="Quantidade: "
                        value={this.state.qtd}
                        style={styles.input}
                        onChangeText={txt => this.setState({ qtd: txt })}
                    />
                    <TouchableHighlight
                        onPress={() =>
                            this.props.SendProductsFinal(
                                this.state.name,
                                this.state.qtd,
                                () => this.setState({ name: '', qtd: '' })
                            )
                        }
                        underlayColor="#5FC7EA"
                        style={styles.btn}
                    >
                        <Text style={styles.txtBtn}>Registrar produtos</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() =>
                            this.props.GetListReleaseProductsFinal(list =>
                                this.setState({
                                    list,
                                    isModalVisible: true,
                                })
                            )
                        }
                        underlayColor="#5FC7EA"
                        style={styles.btn}
                    >
                        <Text style={styles.txtBtn}>Listar produtos</Text>
                    </TouchableHighlight>
                </View>
                {/* --------- Modal Listar produtos registrados no evento atual --------- */}
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
                            Produtos Registrados
                        </Text>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) => (
                                <ProductsFinalReleasesItem
                                    data={item}
                                    deleteItem={
                                        this.props
                                            .DeleteItemReleaseProductsFinal
                                    }
                                />
                            )}
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
        width: '70%',
        height: 45,
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
        fontSize: 20,
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

const ProductsFinalConnect = connect(
    mapStateToProps,
    {
        SendProductsFinal,
        GetListReleaseProductsFinal,
        DeleteItemReleaseProductsFinal,
    }
)(ProductsFinal);
export default ProductsFinalConnect;
