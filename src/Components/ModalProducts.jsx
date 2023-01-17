import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInputComponent from './FormInputComponent';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getCompanyAndProductArray } from '../lib/Common/CommonFunctions';
import 'react-toastify/dist/ReactToastify.css';
import close from '../Images/close.png';
import { db } from '../lib/firebase';


function ModalProducts({
    showModal,
    setShowModal,
    modalDetails,
    setModalDetails,
    isEditing,
    setIsEditing,
    isUserLogin,
    companyDropdownDetails,
}) {


    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const companies = selector.companyReducer.companies;

    const [validated, setValidated] = useState(false);
    const [details, setDetails] = useState({});
    const [name, setName] = useState('');
    const [imageFileArray, setImageFileArray] = useState([]);


    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setModalDetails({});
    }

    useEffect(() => {
        if (isEditing) {
            setDetails(prev => ({
                ...prev,
                imagesArray: imageFileArray
            }))
        }
    }, [imageFileArray]);

    useEffect(() => {
        if (isEditing) {
            setDetails(modalDetails);
            setImageFileArray(JSON.parse(modalDetails.imagesArray));
        }
        else if (isUserLogin) {
            setDetails(prev => ({
                ...prev,
                companyDetails: companyDropdownDetails
            }))
            setName(companyDropdownDetails?.companyName);
        }
        else {
            setDetails(prev => ({
                ...prev,
                companyDetails: {
                    companyId: companies[0]?.id,
                    companyName: companies[0]?.data.companyName,
                    companyEmail: companies[0]?.data.email
                }
            }))
        }
    }, [isEditing, showModal]);

    const handleChange = e => {
        const { id, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleCompanySelect = e => {
        const index = e.target.selectedIndex;
        const id = companies[index].id;
        const value = e.target.childNodes[index].value;
        const email = companies[index].data.email;
        setName(value);
        setDetails(prev => ({
            ...prev,
            companyDetails: {
                companyId: id,
                companyName: value,
                companyEmail: email
            }
        }));
    }

    const onSelectFile = e => {
        const setItems = () => setImageFileArray(prev => prev.concat(a));
        const files = Array.from(e.target.files);
        const a = [];
        files.forEach(file => {
            const toUplaodImage = {}
            for (let i in file) {
                toUplaodImage[i] = file[i];
            }
            a.push(toUplaodImage);
        });
        if (imageFileArray.length <= 0) setItems();
        else {
            const includes = () => {
                for (let i = 0; i < imageFileArray.length; i++) {
                    for (let j = 0; j < a.length; j++) {
                        if (imageFileArray[i].name === a[j].name) {
                            return true;
                        }
                    }
                }
            }
            if (includes()) {
                alert('Item already exists !');
                return;
            }
            else setItems();
        }
    }

    const deleteImage = image => {
        const index = imageFileArray.findIndex(item => item === image);
        imageFileArray.splice(index, 1);
        setImageFileArray([...imageFileArray]);
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
            const docRef = doc(db, 'products', details.id);
            const body = {
                ...details,
                imagesArray: JSON.stringify(imageFileArray)
            };
            setDoc(docRef, body)
                .then(() => '')
                .catch(err => console.log(err));
        }
        else {
            const body = {
                ...details,
                imagesArray: JSON.stringify(imageFileArray)
            };
            addDoc(collection(db, 'products'), body)
                .then(() => '')
                .catch(err => console.log(err));
        }
        getCompanyAndProductArray(dispatch, 'products', 'UPDATE_PRODUCT');
        e.preventDefault();
        handleClose();
    }


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>
                    {isEditing ? 'Edit Product Details' : 'Product Details'}
                </Modal.Title>
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
                        onChange={handleCompanySelect}
                        value={isEditing ? details?.companyDetails?.companyName : name}
                        disabled={isEditing || isUserLogin ? true : false}
                        required>
                        {
                            companies.length ? companies.map(company => {
                                return (
                                    <option
                                        key={company.id}
                                        id={company.id}
                                        name={company.data?.email}
                                        value={company.data?.companyName}
                                    >
                                        {company.data?.companyName[0].toUpperCase() + company.data?.companyName?.substring(1)}
                                    </option>
                                )
                            }) : <option value='Select a company'>No companies to select</option>
                        }
                    </Form.Select>

                    <InputGroup size="sm" className="my-3">
                        <label className='add_images_label'>
                            + Add Images
                            <Form.Control
                                type='file'
                                onChange={onSelectFile}
                                multiple
                                accept='image/png, image/jpeg, image/webp'
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                style={{ display: 'none' }}
                            />
                        </label>
                    </InputGroup>

                    <div className="images_container">
                        {
                            imageFileArray && imageFileArray.map(image => {
                                return (
                                    <div className="image" key={image.name}>
                                        <p>{image.name.substring(0, 20)}...</p>
                                        <img
                                            onClick={() => deleteImage(image)}
                                            src={close}
                                            alt="close"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='my-3'>
                        <Button variant="primary" type='submit'>
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                        <Button className='mx-3' variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalProducts;

