import React, { useContext, useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { RecipeContext } from '../../context/RecipeContext'
const UpdateRecipeModal = () => {
    const { recipeState: { recipe }, updateRecipe,
        showUpdateRecipeModal, setShowUpdateRecipeModal,
        setShowToast
    } = useContext(RecipeContext)
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe)
    const { name, description, url, status } = updatedRecipe
    useEffect(() => {
        setUpdatedRecipe(recipe)

    }, [recipe])
    const closeDialog = () => {
        setUpdatedRecipe(recipe)
        setShowUpdateRecipeModal(false)
    }
    const handleChange = (e) => {
        setUpdatedRecipe({
            ...updatedRecipe,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await updateRecipe(updatedRecipe)
        console.log(response);
        setShowUpdateRecipeModal(false)
    }

    return (
        <div>
            <Modal
                show={showUpdateRecipeModal}
                onHide={closeDialog}


            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Recipes</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Name'
                                name='name'
                                required

                                value={name}
                                onChange={handleChange}
                            />
                            <Form.Text id='title-help' muted>
                                Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>

                            <Form.Control
                                as='textarea'
                                rows={3}
                                placeholder='Description'
                                name='description'
                                value={description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Url </Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='Youtube URL'
                                name='url'
                                value={url}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status </Form.Label>

                            <Form.Control
                                as='select'
                                value={status}
                                name='status'
                                onChange={handleChange}
                            >
                                <option value='TO LEARN'>TO LEARN</option>
                                <option value='LEARNING'>LEARNING</option>
                                <option value='LEARNED'>LEARNED</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit'>
                            Update!
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateRecipeModal
