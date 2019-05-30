import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: 'name',
    temperature: 0,
    pressure: 0,
    error: false
};

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.CHOOSE_CITY:
            return updateObject(state, {name: action.name, temperature: action.temperature, pressure: action.pressure, error: action.error});
        default:
            return state;
    }
};

export default reducer;