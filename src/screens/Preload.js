import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class Preload extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txtTitle}>PRELOAD</Text>
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

const PreloadConnect = connect(mapStateToProps, {})(Preload);
export default PreloadConnect;