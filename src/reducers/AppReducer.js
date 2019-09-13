const initialState = {
    expensesRegisted: [],
    bgBtnMasterMenu: '',
    eventActive: 2,
    eventName: '',
};

const AppReducer = (state = initialState, action) => {
    if (action.type == 'changeEventActive')
        return { ...state, eventActive: action.payload.eventActive };
    if (action.type == 'changeBgBtnMasterMenu')
        return { ...state, bgBtnMasterMenu: action.payload.bgBtnMasterMenu };
    if (action.type == 'changeEventName')
        return { ...state, eventName: action.payload.eventName };
    if (action.type == 'changeExpensesRegisted')
        return { ...state, expensesRegisted: action.payload.expensesRegisted };

    return state;
};

export default AppReducer;
