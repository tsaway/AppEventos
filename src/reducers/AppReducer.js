const initialState = {
    bgBtnMasterMenu: '',
    eventActive: 2
}


const AppReducer = (state = initialState, action) => {
    if (action.type == 'changeEventActive') return { ...state, eventActive: action.payload.eventActive }
    if (action.type == 'changeBgBtnMasterMenu') return { ...state, bgBtnMasterMenu: action.payload.bgBtnMasterMenu }

    return state
}

export default AppReducer