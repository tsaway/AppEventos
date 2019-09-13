// imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// imports screens
import Period from './Period';
import City from './City';
import Promoter from './Promoter';

const TabNavigator = createBottomTabNavigator(
    {
        Period: {
            screen: Period,
            navigationOptions: {
                tabBarLabel: 'Período',
            },
        },
        City: {
            screen: City,
            navigationOptions: {
                tabBarLabel: 'Cidade',
            },
        },
        Promoter: {
            screen: Promoter,
            navigationOptions: {
                tabBarLabel: 'Promotora',
            },
        },
    },
    {
        tabBarOptions: {
            tabStyle: {
                backgroundColor: '#414CCD',
            },
            activeTintColor: '#FFF',
            inactiveTintColor: '#000',
            labelStyle: {
                fontSize: 20,
            },
        },
    }
);

export default createAppContainer(TabNavigator);
