//imports libraries/API's
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sales</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txtTitle: {
        color: '#000000',
        fontSize: 24

    }
});

const mapStateToProps = state => {
    return {

    };
};

const SalesConnect = connect(mapStateToProps, {})(Sales);
export default SalesConnect;