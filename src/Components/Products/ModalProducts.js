import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import FormInputComponent from '../Others/FormInputComponent';
import 'react-toastify/dist/ReactToastify.css';
import { addProductToArray } from '../../Redux/actions';


function ModalProducts({ showModal, setShowModal, modalDetails, setModalDetails, isEditing, setIsEditing }) {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [details, setDetails] = useState({});
    const [name, setName] = useState('');

    const products = selector.productReducer.products;
    const companies = selector.companyReducer.companies;

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setModalDetails({});
    }

    useEffect(() => {
        if (isEditing) setDetails(modalDetails);
        else {
            setDetails(prev => ({
                ...prev,
                companyDetails: {
                    companyId: companies[0].uniqueId,
                    companyName: companies[0].companyName
                }
            }))
        }
    }, [isEditing]);

    useEffect(() => {
        setName(companies[0]?.companyName);
    }, []);

    const handleChange = e => {
        const { id, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleSelect = e => {
        const index = e.target.selectedIndex;
        const id = e.target.childNodes[index].id;
        const value = e.target.childNodes[index].value;
        setName(value);
        setDetails(prev => ({
            ...prev,
            companyDetails: {
                companyId: id,
                companyName: value
            }
        }));
    }

    const handleSubmit = e => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
        else if (isEditing) {
            setTimeout(() => {
                const index = products.findIndex(items => items.uniqueId === details.uniqueId);
                products.splice(index, 1, details);
                const arr = [...products];
                dispatch(addProductToArray('UPDATE_PRODUCT', arr));
            }, 500);
        }
        else {
            const body = { ...details, uniqueId: uuid() };
            dispatch(addProductToArray('ADD_PRODUCT', body));
        }
        e.preventDefault();
        handleClose();
    }


    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormInputComponent
                            label='Product name'
                            type='text'
                            placeholder='Enter product name'
                            id='productName'
                            value={details.productName}
                            errorMsg='Please enter valid name'
                            onChange={handleChange}
                        />
                        <FormInputComponent
                            label='Model Name'
                            type='text'
                            placeholder='Enter model name'
                            id='modelName'
                            value={details.modelName}
                            errorMsg='Please enter valid model'
                            onChange={handleChange}
                        />
                        <FormInputComponent
                            label='Price'
                            type='number'
                            placeholder='Enter price'
                            id='price'
                            value={details.price}
                            errorMsg='Please enter valid price'
                            onChange={handleChange}
                        />

                        <Form.Select
                            style={{ marginTop: '2em 0' }}
                            onChange={handleSelect}
                            value={isEditing ? details?.companyDetails?.companyName : name}
                            required>
                            {
                                companies.length ? companies.map(company => {
                                    return (
                                        <option
                                            key={company.uniqueId}
                                            id={company.uniqueId}
                                            value={company.companyName}
                                        >
                                            {company.companyName[0]?.toUpperCase() + company.companyName?.substring(1)}
                                        </option>
                                    )
                                }) : <option value='Select a company'>No companies found !</option>
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a company name
                        </Form.Control.Feedback>
                        <div className='my-3'>
                            <Button variant="primary" type='submit'>
                                {isEditing ? 'Update' : 'Save Changes'}
                            </Button>
                            <Button className='mx-3' variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProducts;
