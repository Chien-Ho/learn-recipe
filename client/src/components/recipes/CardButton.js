import React, { useContext } from 'react'
import { RecipeContext } from '../../context/RecipeContext'
import { Button } from 'reactstrap'
import { FaYoutube, FaEdit, FaRegTrashAlt } from 'react-icons/fa'
const CardButton = ({ url, _id }) => {
    const { deleteRecipe, findRecipe, setShowUpdateRecipeModal } = useContext(RecipeContext)
    const openUpdateRecipeModal = (_id) => {
        findRecipe(_id)
        setShowUpdateRecipeModal(true)
    }
    return (
        <div>
            <Button className="recipe-button" color="link" href={url} target="_blank">
                <FaYoutube size={20} />
            </Button>
            <Button className="recipe-button" color="link" onClick={openUpdateRecipeModal.bind(this, _id)}><FaEdit size={20} /></Button>
            <Button className="recipe-button" color="link" onClick={deleteRecipe.bind(this, _id)}><FaRegTrashAlt size={20} /></Button>
        </div>
    )
}

export default CardButton
