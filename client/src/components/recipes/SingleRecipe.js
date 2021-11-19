import React from 'react'
import CardButton from './CardButton'
import { Card, CardBody, CardTitle, CardText, Row, Col, Badge } from 'reactstrap'
const singleRecipe = ({ recipe: { _id, status, description, name, url } }) => {
    return (<>
        <Card body outline color={status === 'COOKED' ? 'success' :
            status === 'TO COOK' ? 'danger' : 'warning'}>

            <CardBody>
                <CardTitle>
                    <Row className="single-recipe">
                        <Col>
                            <p className="recipe-name h5 text-capitalize">{name}</p>
                            <Badge color={status === 'COOKED' ? 'success' :
                                status === 'TO COOK' ? 'danger' : 'warning'}>{status}</Badge>
                        </Col>
                        <Col className="text-card-right">
                            <CardButton url={url} _id={_id} />
                        </Col>
                    </Row>
                </CardTitle>

                <CardText className="my-1 ">{description}</CardText>

            </CardBody>
        </Card>
    </>
    )
}
export default singleRecipe
