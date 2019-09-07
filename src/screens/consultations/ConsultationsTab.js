import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Keyboard, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { } from './../../actions/AppAction';

import Period from './Period';
import City from './City';
import Promoter from './Promoter';

const TabNavigator = createBottomTabNavigator({
    Period: {
        screen: Period
    },
    City: {
        screen: City
    },
    Promoter: {
        screen: Promoter
    }
});

export default createAppContainer(TabNavigator);