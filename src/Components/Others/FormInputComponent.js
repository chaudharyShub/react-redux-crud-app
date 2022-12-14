import React from 'react';
import Form from 'react-bootstrap/Form';

function FormInputComponent({ label, type, placeholder, id, errorMsg, onChange, value }) {

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
                autoFocus
                required />
            <Form.Control.Feedback type="invalid">
                {errorMsg}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormInputComponent;
