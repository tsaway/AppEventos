//imports libraries/API's
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

export class Period extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Period</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

const mapStateToProps = state => {
    return {

    }
}

const PeriodConnect = connect(mapStateToProps, {})(Period)
export default PeriodConnect