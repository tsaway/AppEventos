//imports libraries/API's
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

//imports screens
import Expenses from './Expenses'
import ProductsFinal from './ProductsFinal'
import Sales from './Sales'

const TabNavigator = createBottomTabNavigator({
    Expenses: {
        screen: Expenses,
        navigationOptions: {
            tabBarLabel: 'Despesas'
        }
    },
    Sales: {
        screen: Sales,
        navigationOptions: {
            tabBarLabel: 'Vendas'
        }
    },
    ProductsFinal: {
        screen: ProductsFinal,
        navigationOptions: {
            tabBarLabel: 'Produtos finais'
        }
    }
}, {
    tabBarOptions: {
        tabStyle: {
            backgroundColor: '#414CCD'
        },
        activeTintColor: '#FFF',
        inactiveTintColor: '#000',
        labelStyle: {
            fontSize: 20
        }
    }
})

export default createAppContainer(TabNavigator)