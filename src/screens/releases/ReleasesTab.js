// imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// imports screens
import Expenses from './Expenses';
import ProductsFinal from './ProductsFinal';
import Sales from './Sales';

const TabNavigator = createBottomTabNavigator(
    {
        Expenses: {
            screen: Expenses,
            navigationOptions: {
                tabBarLabel: 'Despesas',
            },
        },
        Sales: {
            screen: Sales,
            navigationOptions: {
                tabBarLabel: 'Vendas',
            },
        },
        ProductsFinal: {
            screen: ProductsFinal,
            navigationOptions: {
                tabBarLabel: 'Produtos',
            },
        },
    },
    {
        tabBarOptions: {
            tabStyle: {
                backgroundColor: '#414CCD',
                paddingBottom: 10,
            },
            activeTintColor: '#FFF',
            inactiveTintColor: '#000',
            labelStyle: {
                fontSize: 18,
            },
        },
    }
);

export default createAppContainer(TabNavigator);
