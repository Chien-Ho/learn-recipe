import React, { createContext, useReducer, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../constants/authConstants'
import { recipeReducer } from '../reducer/recipeReducer'
export const RecipeContext = createContext()
const RecipeContextProvider = ({ children }) => {
    const [recipeState, dispatch] = useReducer(recipeReducer, {
        recipe: null,
        recipes: [],
        recipesLoading: true
    })
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false)
    const [showUpdateRecipeModal, setShowUpdateRecipeModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    const [alert, setAlert] = useState(null)
    const getRecipes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/recipes`)
            if (response.data.success) {
                dispatch({
                    type: 'RECIPES_LOAD_SUCCESS',
                    payload: response.data.recipes
                })

            }
        } catch (error) {
            dispatch({ type: 'RECIPES_LOAD_FAIL' })
        }
    }
    const addRecipe = async newRecipe => {
        try {
            const response = await axios.post(`${apiUrl}/recipes`, newRecipe)
            if (response.data.success)
                dispatch({
                    type: 'ADD_RECIPE',
                    payload: response.data.newRecipe
                })
            const { message, success } = response.data
            setAlert({ type: 'success', message: message })
            setTimeout(() => {
                setAlert(null)
            }, 5000);
            return response.data

        } catch (error) {
            const { message, success } = error.response
            setAlert({ type: 'danger', message: message })
            setTimeout(() => {
                setAlert(null)
            }, 5000);
        }
    }
    const findRecipe = (recipeId) => {

        const recipe = recipeState.recipes.find(recipe => recipe._id === recipeId)

        dispatch({
            type: 'FIND_RECIPE',
            payload: recipe
        })
    }
    const updateRecipe = async updatedRecipe => {

        try {
            const response = await axios.put(`${apiUrl}/recipes/${updatedRecipe._id}`, updatedRecipe)

            if (response.data.success) {
                dispatch({
                    type: 'UPDATE_RECIPE',
                    payload: response.data.newRecipe
                })
                const { message, success } = response.data
                setAlert({ type: 'success', message: message })
                setTimeout(() => {
                    setAlert(null)
                }, 5000);
            }

        } catch (error) {
            const { message, success } = error.response
            setAlert({ type: 'success', message: message })
            setTimeout(() => {
                setAlert(null)
            }, 5000);
            console.log(error.response);


        }


    }
    const deleteRecipe = async recipeId => {
        try {
            const response = await axios.delete(`${apiUrl}/recipes/${recipeId}`)
            if (response.data.success) {
                dispatch({
                    type: 'DELETE_RECIPE',
                    payload: recipeId
                })
            }
            const { message, success } = this.response.data.success
            setAlert({ type: 'success', message: message })
            setTimeout(() => {
                setAlert(null)
            }, 5000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const recipeContextData = {
        recipeState, getRecipes, addRecipe,
        showAddRecipeModal, setShowAddRecipeModal,
        showToast, setShowToast,
        deleteRecipe,
        findRecipe, updateRecipe, alert,
        setShowUpdateRecipeModal, showUpdateRecipeModal
    }
    return (
        <RecipeContext.Provider value={recipeContextData}>{children}</RecipeContext.Provider>
    )
}

export default RecipeContextProvider
