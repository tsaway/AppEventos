import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Keyboard, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { } from './../../actions/AppAction';

import CardFee from './CardFee';
import ExpensesRegisted from './ExpensesRegisted';

const TabNavigator = createBottomTabNavigator({
    CardFee: {
        screen: CardFee
    },
    ExpensesRegisted: {
        screen: ExpensesRegisted
    }
});

export default createAppContainer(TabNavigator);