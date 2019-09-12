//imports libraries/API's
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

//imports files
import { EndEvent, SaveEvent, GetExpensesRegisted } from './../actions/MenuAction'

export class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadInitial: true
        }

    }

    render() {
        return (
            <ImageBackground source={require('./../assets/images/bg.png')} style={styles.bg}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.spaceMenu}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.props.eventActive == 1)
                                        Alert.alert('Aviso', 'Você está em período de evento')
                                    else if (this.props.eventActive == 0)
                                        this.props.navigation.navigate('EventRegistration')
                                }}
                                style={styles.item}>
                                <Icon name='calendar' size={30} color='#FFF' />
                                <Text style={styles.itemText}>Cadastro do Evento</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.props.eventActive == 1) {
                                        this.props.GetExpensesRegisted(() =>
                                            this.props.navigation.navigate('ReleasesTab'))
                                    }
                                    else if (this.props.eventActive == 0)
                                        Alert.alert('Aviso', 'Não é temporada de evento')
                                }}
                                style={styles.item}>
                                <Icon name='arrow-up' size={30} color='#FFF' />
                                <Text style={styles.itemText}>Lançamentos</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceMenu}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('QueryTab')}
                                style={styles.item}>
                                <Icon name='search' size={30} color='#FFF' />
                                <Text style={styles.itemText}>Consultas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SettingsTab')}
                                style={styles.item}>
                                <Icon name='cogs' size={30} color='#FFF' />
                                <Text style={styles.itemText}>Configurações</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.contentBtnMaster}>
                    <TouchableOpacity
                        onPress={() => this.props.EndEvent((name, city, estado, promoter, dateInitial, dateFinal, releases) => {
                            this.props.bgBtnMasterMenu = '#acacac'
                            this.props.SaveEvent(name, city, estado, promoter, dateInitial, dateFinal, releases)
                        })}
                        style={[styles.btnMaster, { backgroundColor: this.props.bgBtnMasterMenu }]}>
                        <Icon name='cogs' size={30} color='#FFF' />
                        <Text style={styles.itemText}>Finalizar o evento atual</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        height: '50%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center'
    },
    spaceMenu: {
        justifyContent: 'space-around'
    },
    item: {
        height: 120,
        width: 140,
        paddingVertical: 20,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5
    },
    itemText: {
        color: '#FFF'
    },
    contentBtnMaster: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMaster: {
        height: 60,
        width: '60%',
        paddingVertical: 20,
        marginBottom: 20,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})

const mapStateToProps = state => {
    return {
        bgBtnMasterMenu: state.app.bgBtnMasterMenu,
        eventActive: state.app.eventActive
    }
}

const MenuConnect = connect(mapStateToProps, { EndEvent, SaveEvent, GetExpensesRegisted })(Menu)
export default MenuConnect