//imports libraries/API's
import React, { Component } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

//imports files
import { ListinerEventActive, GetExpensesRegisted } from './../actions/PreloadAction'

export class Preload extends Component {
    componentDidMount() {
        this.props.ListinerEventActive(() => {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Menu' })
                ]
            }))
        })
    }

    render() {
        return <ImageBackground source={require('./../assets/images/bg.png')} style={styles.bg} />
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'transparent'
    }
})

const mapStateToProps = state => {
    return {
        bgBtnMasterMenu: state.app.bgBtnMasterMenu,
        eventActive: state.app.eventActive
    }
}

const PreloadConnect = connect(mapStateToProps, { ListinerEventActive, GetExpensesRegisted })(Preload)
export default PreloadConnect