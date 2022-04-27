import { userService } from "../services/user.service";

const initialState = {
    user: {}
}


export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'UPDATE_USER':
            newState = { ...state, user: action.updatedUser }
            break;
        default:
            break;

    }

    return newState
}