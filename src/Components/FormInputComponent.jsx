import React from 'react';
import Form from 'react-bootstrap/Form';

function FormInputComponent({ label, type, placeholder, id, errorMsg, onChange, value, isEditing }) {

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                id={id}
                value={value || ''}
                onChange={onChange}
                disabled={isEditing && type === 'email' ? true : false}
                autoFocus
                required />
            <Form.Control.Feedback type="invalid">
                {errorMsg}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormInputComponent;
