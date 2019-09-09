//imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//imports screens
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