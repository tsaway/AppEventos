import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Keyboard, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { } from './../../actions/AppAction';

import Expenses from './Expenses';
import ProductsFinal from './ProductsFinal';
import Sales from './Sales';

const TabNavigator = createBottomTabNavigator({
    Expenses: {
        screen: Expenses
    },
    Sales: {
        screen: Sales
    },
    ProductsFinal: {
        screen: ProductsFinal
    }
});

export default createAppContainer(TabNavigator);