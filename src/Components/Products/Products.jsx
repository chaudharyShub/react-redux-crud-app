import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Container } from 'react-bootstrap';
import ModalProducts from './ModalProducts';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { getCompanyAndProductArray } from '../Common/CommonFunctions';
import './Products.css';


function Products() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isUserLogin, setisUserLogin] = useState(false);
    const [specificProductsArray, setSpecificProductsArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companyDropdownDetails, setCompanyDropdownDetails] = useState({});

    const products = selector.productReducer.products;


    const handleDelete = id => {
        const productRef = doc(db, 'products', id);
        deleteDoc(productRef)
            .then(() => '')
            .catch(err => console.log(err));

        const index = products.findIndex(items => id === items.id);
        products.splice(index, 1);
        const a = [...products];
        dispatch({ type: 'UPDATE_PRODUCT', payload: a });
    }


    const handleEdit = id => {
        const object = products.find(items => id === items.id);
        if (!object) return;
        setModalDetails({ ...object.data, id: object.id });
        setIsEditing(true);
        setShowModal(true);
    }


    useLayoutEffect(() => {
        const companyEmail = JSON.parse(localStorage.getItem('companyEmail'));
        if (companyEmail) setisUserLogin(true);
        else setisUserLogin(false);
    }, []);


    useLayoutEffect(() => {
        setLoading(true);
        getCompanyAndProductArray(dispatch, 'products', 'UPDATE_PRODUCT', setLoading);
        getCompanyAndProductArray(dispatch, 'company', 'UPDATE_COMPANY', null);
    }, [showModal, isEditing]);


    useEffect(() => {
        const companyEmailFromLocalStorage = JSON.parse(localStorage.getItem('companyEmail'));
        const arr = products.filter(items =>
            items.data.companyDetails.companyEmail === companyEmailFromLocalStorage
        );
        setSpecificProductsArray(arr);
        const obj = arr[0]?.data?.companyDetails;
        setCompanyDropdownDetails(obj);
    }, [products]);


    return (
        <div className='product_main'>
            {
                showModal ? <ModalProducts
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalDetails={modalDetails}
                    isEditing={isEditing}
                    isUserLogin={isUserLogin}
                    setModalDetails={setModalDetails}
                    setIsEditing={setIsEditing}
                    companyDropdownDetails={companyDropdownDetails}
                /> : null
            }
            <Container>
                <div className='add_button'>
                    <div></div>
                    <Button className='my-3' variant="primary" onClick={() => setShowModal(true)}>
                        Add
                    </Button>
                </div>
                {
                    (!isUserLogin === true ? products.length > 0 : specificProductsArray.length > 0) ?
                        <Table striped bordered hover className='product_table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Company Name</th>
                                    <th>Model Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (!isUserLogin === true ? products : specificProductsArray)
                                        ?.map((product, index) => {
                                            return (
                                                <tr key={product.id}>
                                                    <td>{index + 1}.</td>
                                                    <td className='product_name'>{product.data?.productName}</td>
                                                    <td className='product_company_name'>{product.data?.companyDetails?.companyName}</td>
                                                    <td className='product_model' onClick={() => navigate(`details/${product?.id}`)}>{product.data?.modelName}</td>
                                                    <td>&#8377; {product.data?.price}</td>
                                                    <td className='edit_delete_btn'>
                                                        <Button className='mx-1' variant="warning" onClick={() => handleEdit(product.id)}>Edit</Button>
                                                        <Button className='mx-1' variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                            </tbody>
                        </Table> : (!loading ? <h3>Nothing to show !!!</h3> : null)
                }
                {
                    loading &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
            </Container>
        </div>
    );
}

export default Products;
