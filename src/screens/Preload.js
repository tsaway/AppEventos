// imports libraries/API's
import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

// imports files
import {
    ListinerEventActive,
    ListCity,
    ListPromoter,
} from '../actions/PreloadAction';

export class Preload extends Component {
    componentDidMount() {
        this.props.ListinerEventActive(() =>
            this.props.ListCity(() =>
                this.props.ListPromoter(() => {
                    this.props.navigation.dispatch(
                        StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Menu',
                                }),
                            ],
                        })
                    );
                })
            )
        );
    }

    render() {
        return (
            <ImageBackground
                source={require('./../assets/images/bg.png')}
                style={styles.bg}
            >
                <Image
                    resizeMode="contain"
                    source={require('./../assets/images/logo.png')}
                    style={styles.img}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '70%',
    },
});

const mapStateToProps = state => {
    return {
        bgBtnMasterMenu: state.app.bgBtnMasterMenu,
        eventActive: state.app.eventActive,
    };
};

const PreloadConnect = connect(
    mapStateToProps,
    { ListinerEventActive, ListCity, ListPromoter }
)(Preload);
export default PreloadConnect;
