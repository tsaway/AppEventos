//imports libraries/API's
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//imports screens
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