import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { RecipeContext } from '../../context/RecipeContext'
const AddRecipesModal = () => {
    const { addRecipe, showAddRecipeModal, setShowAddRecipeModal,
        showToast, setShowToast } = useContext(RecipeContext)
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        description: '',
        url: '',
        status: 'TO COOK'
    })
    const { name, description, url, status } = newRecipe
    const closeDialog = () => {

    }
    const handleChange = (e) => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const { message, success } = await addRecipe(newRecipe)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
        resetRecipeData()
    }
    const resetRecipeData = () => {
        setNewRecipe({
            name: '',
            description: '',
            url: '',
            status: 'TO COOK'
        })

        setShowAddRecipeModal(false)
    }
    return (
        <div>
            <Modal
                show={showAddRecipeModal}
                onHide={resetRecipeData}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Recipes</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group>
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
                            <Form.Control
                                type='text'
                                placeholder='Youtube URL'
                                name='url'
                                value={url}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={resetRecipeData}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit'>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddRecipesModal
