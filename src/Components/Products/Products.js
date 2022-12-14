import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToArray, getCompanyDataFromLocalStorage } from '../../Redux/actions';
import { Button, Table, Container } from 'react-bootstrap';
import DataModalProducts from './DataModalProducts';

function Products() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const products = selector.productReducer.products;

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [modalState, setModalState] = useState(false);

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

    const handleEdit = uniqueId => {
        const object = products.find(items => uniqueId === items.uniqueId);
        setModalDetails(object);
        setModalState(true);
        setShowModal(true);
    }

    const handleDelete = uniqueId => {
        const index = products.findIndex(items => uniqueId === items.uniqueId);
        products.splice(index, 1);
        const a = [...products];
        dispatch(addProductToArray('UPDATE_PRODUCT', a));
    }

    return (
        <div>
            <div className='product_main'>
                {
                    showModal ? <DataModalProducts
                        showModal={showModal}
                        setShowModal={setShowModal}
                        modalDetails={modalDetails}
                        modalState={modalState}
                        setModalDetails={setModalDetails}
                        setModalState={setModalState}
                    /> : null
                }
                <Container>
                    <div className='add_button'>
                        <div></div>
                        <Button className='my-3' variant="primary" onClick={() => setShowModal(true)}>
                            Add
                        </Button>
                    </div>
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
                            {products?.map((product, index) => {
                                return (
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
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}

export default Products;
