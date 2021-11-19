import React, { useContext, useEffect } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import { AuthContext } from '../context/AuthContext'
import SingleRecipe from '../components/recipes/SingleRecipe'
import AddRecipesModal from '../components/recipes/AddRecipesModal'
import UpdateRecipeModal from '../components/recipes/UpdateRecipeModal'
import AlertMessage from '../components/layouts/Alert'
import { Toast } from 'react-bootstrap'
import { BsPlusCircle } from 'react-icons/bs'
import {
    Spinner, Card, CardImg, CardText, CardBody, CardHeader,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap'
const Dashboard = () => {
    const { authState: { user: { username } } } = useContext(AuthContext)

    const { recipeState: { recipes, recipesLoading, recipe }, getRecipes, showToast: {
        show, type, message
    }, setShowToast, setAddRecipesModal, setShowAddRecipeModal, alert } = useContext(RecipeContext)

    useEffect(() => getRecipes(), [recipes])

    let body = null
    if (recipesLoading) {
        body = (
            <div className="d-flex justify-content-center"><Spinner type="border" color="info" size="lg" /></div>
        )
    } else if (recipes.length === 0) {
        body = (
            <><div className="d-flex justify-content-center">
                <Card className="text-center my-5 w-50 ">
                    <CardHeader as="h1"> Chào {username}</CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">Chào mừng đến với Recipes</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Nice Recipes!</CardSubtitle>
                        <CardText>Nhấn vào nút ở dưới để thêm công thức mới</CardText>
                        <Button color="info" onClick={setShowAddRecipeModal.bind(this, true)}>Công thức mới</Button>
                    </CardBody>
                </Card>
            </div>
            </>
        )
    } else {
        body = (<>
            <AlertMessage info={alert} />
            <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                {recipes.map(recipe => (
                    <Col key={recipe._id} >
                        <SingleRecipe recipe={recipe} />
                    </Col>
                ))}

            </Row>

            <BsPlusCircle className="plus-icon" onClick={setShowAddRecipeModal.bind(this, true)} />
        </>)
    }
    return (<>
        {body}
        <AddRecipesModal />
        {recipe !== null && (<UpdateRecipeModal />)}

    </>)

}

export default Dashboard
