import React from 'react'

export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                isLoading: false,
                isAuthenticated,
                user
            }
        default:
            return state
    }
    console.log(state);
}


