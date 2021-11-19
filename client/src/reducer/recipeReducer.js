


export const recipeReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'RECIPES_LOAD_SUCCESS':
            return {
                ...state,
                recipesLoading: false,
                recipes: payload
            }
        case 'RECIPES_LOAD_FAIL':
            return {
                ...state,
                recipesLoading: true,
                recipes: []
            }
        case 'ADD_RECIPE':
            return {
                ...state,
                recipes: [...state.recipes, payload]
            }

        case 'DELETE_RECIPE':

            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe._id !== payload)
            }

        case 'FIND_RECIPE':
            return {
                ...state,
                recipe: payload
            }
        case 'UPDATE_RECIPE':
            
            return {
                ...state,
                recipes: state.recipes.map(
                    recipe => recipe._id === payload._id ? payload : recipe)

            }


    }
}