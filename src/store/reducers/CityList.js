import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    cityList: ['Moscow', 'Paris', 'London'],
    cityInput: ''
};

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_CITY:
            return updateObject(state, {cityList: state.cityList.concat(action.city), cityInput: ''});
        case actionTypes.INPUT:
            return updateObject(state, {cityInput: action.text});
        default:
            return state;
    }
};
export default reducer;