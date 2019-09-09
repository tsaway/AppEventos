//imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//imports screens
import CardFee from './CardFee';
import ExpensesRegisted from './ExpensesRegisted';

const TabNavigator = createBottomTabNavigator({
    CardFee: {
        screen: CardFee,
        navigationOptions: {
            title: 'Taxas'
        }
    },
    ExpensesRegisted: {
        screen: ExpensesRegisted,
        navigationOptions: {
            title: 'Despesas'
        }
    }
});

export default createAppContainer(TabNavigator);