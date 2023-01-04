import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToArray, getCompanyDataFromLocalStorage } from '../../Redux/actions';
import { Button, Table, Container } from 'react-bootstrap';
import ModalProducts from './ModalProducts';
import { useNavigate } from 'react-router-dom';
import './Products.css';


function Products() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const products = selector.productReducer.products;

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [specificProductsArray, setSpecificProductsArray] = useState([]);

    const isAdminLogin = localStorage.getItem('isAdminLogin');
    const navigate = useNavigate();

    const getProductDataFromLocalStorage = () => {
        let productArrayFromLocalStorage = localStorage.getItem('products');
        if (productArrayFromLocalStorage === null) return;
        const arr = JSON.parse(productArrayFromLocalStorage);
        dispatch(addProductToArray('UPDATE_PRODUCT', arr));
    }

    useEffect(() => {
        getProductDataFromLocalStorage();
        getCompanyDataFromLocalStorage(dispatch);
    }, []);

    useEffect(() => {
        const companyEmailFromLocalStorage = JSON.parse(localStorage.getItem('companyEmail'));
        const arr = products.filter(items =>
            items.companyDetails.companyEmail === companyEmailFromLocalStorage
        );
        setSpecificProductsArray(arr);
    }, [products]);

    const handleEdit = uniqueId => {
        const object = products.find(items => uniqueId === items.uniqueId);
        if (!object) return;
        setModalDetails(object);
        setIsEditing(true);
        setShowModal(true);
    }

    const handleDelete = uniqueId => {
        const index = products.findIndex(items => uniqueId === items.uniqueId);
        products.splice(index, 1);
        const a = [...products];
        dispatch(addProductToArray('UPDATE_PRODUCT', a));
    }

    return (
        <div className='product_main'>
            {
                showModal ? <ModalProducts
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalDetails={modalDetails}
                    isEditing={isEditing}
                    setModalDetails={setModalDetails}
                    setIsEditing={setIsEditing}
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
                    isAdminLogin === 'true' ? (
                        products.length ?
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
                                        products?.map((product, index) => (
                                            <tr key={product.uniqueId}>
                                                <td>{index + 1}.</td>
                                                <td className='product_name'>{product.productName}</td>
                                                <td className='product_company_name'>{product.companyDetails?.companyName}</td>
                                                <td className='product_model'>{product.modelName}</td>
                                                <td>&#8377; {product.price}</td>
                                                <td className='edit_delete_btn'>
                                                    <Button className='mx-1' variant="warning" onClick={() => handleEdit(product.uniqueId)}>Edit</Button>
                                                    <Button className='mx-1' variant="danger" onClick={() => handleDelete(product.uniqueId)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                        )}
                                </tbody>
                            </Table>
                            : <h2>Nothing to show !!!</h2>
                    ) : (
                        specificProductsArray.length ?
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
                                        specificProductsArray?.map((product, index) => (
                                            <tr key={product.uniqueId}>
                                                <td>{index + 1}.</td>
                                                <td className='product_name'>{product.productName}</td>
                                                <td className='product_company_name'>{product.companyDetails?.companyName}</td>
                                                <td className='product_model' onClick={() => navigate(`details/${product.uniqueId}`)}>{product.modelName}</td>
                                                <td>&#8377; {product.price}</td>
                                                <td className='edit_delete_btn'>
                                                    <Button className='mx-1' variant="warning" onClick={() => handleEdit(product.uniqueId)}>Edit</Button>
                                                    <Button className='mx-1' variant="danger" onClick={() => handleDelete(product.uniqueId)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                        )}
                                </tbody>
                            </Table>
                            : <h2>Nothing to show !!!</h2>
                    )
                }
            </Container>
        </div>
    );
}

export default Products;
