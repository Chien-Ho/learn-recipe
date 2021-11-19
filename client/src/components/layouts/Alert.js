import React from 'react'
import { Alert } from 'react-bootstrap'
const AlertMessage = ({ info }) => {
    return info === null ? null : (
        <div className="alert-message">
            <Alert variant={info.type}>{info.message}!</Alert>
        </div>)
}

export default AlertMessage
