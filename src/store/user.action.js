import { userService } from "../services/user.service"

export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.error('Error while logging in:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while logging in', type: 'error' } }
            dispatch(action)
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout();
            const action = { type: 'SET_USER', user: null }
            dispatch(action)
        } catch (err) {
            console.error('Error while logging out:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while logging out', type: 'error' } }
            dispatch(action)
        }
    }
}

export function signup(newUser) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(newUser)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.error('Error while signing up:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while signing up', type: 'error' } }
            dispatch(action)
        }
    }
}


export function updateUser(user) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(user)
            let action = { type: 'UPDATE_USER', updatedUser }
            dispatch(action)
        } catch (err) {
            console.error('Error while updating user:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while updating user', type: 'error' } }
            dispatch(action)
        }
    }
}