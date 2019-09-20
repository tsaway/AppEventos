// imports libraries/API's
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Modal,
} from 'react-native';

export default class QueryItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.areaTitle}>
                    <Text style={styles.txtTitle}>{this.props.data.name}</Text>
                </View>
                <Text style={styles.txt}>Cidade: {this.props.data.city}</Text>
                <Text style={styles.txt}>Estado: {this.props.data.estado}</Text>
                <Text style={styles.txt}>
                    Data inicial: {this.props.data.dateInitial}
                </Text>
                <Text style={styles.txt}>
                    Data final: {this.props.data.dateFinal}
                </Text>
                <Text style={styles.txt}>
                    Lucro: R${this.props.data.releases.profit.profit}
                </Text>
                <View style={styles.btnRow}>
                    <TouchableHighlight
                        style={styles.btnArea}
                        onPress={() => {}}
                    >
                        <Text style={styles.btnTxt}>Despesas</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {}}>
                        <Text>Vendas</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {}}>
                        <Text>Produtos finais</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.btnEmail} onPress={() => {}}>
                    <Text style={styles.txtEmail}>Enviar para email</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    areaTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    txtTitle: {
        fontSize: 20,
    },
    txt: {
        fontSize: 16,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnArea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: 18,
    },
    btnEmail: {
        alignItems: 'center',
    },
    txtEmail: {
        fontSize: 18,
    },
});
