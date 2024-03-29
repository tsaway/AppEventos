// imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// imports screens
import CardFee from './CardFee';
import ExpensesRegisted from './ExpensesRegisted';

const TabNavigator = createBottomTabNavigator(
    {
        CardFee: {
            screen: CardFee,
            navigationOptions: {
                tabBarLabel: 'Taxas',
            },
        },
        ExpensesRegisted: {
            screen: ExpensesRegisted,
            navigationOptions: {
                tabBarLabel: 'Despesas',
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
