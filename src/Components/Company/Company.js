import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import DataModalCompany from './DataModalCompany';
import './Company.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyToArray, addProductToArray, getCompanyDataFromLocalStorage } from '../../Redux/actions';


function Company() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const companies = selector.companyReducer.companies;

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        getCompanyDataFromLocalStorage(dispatch);
    }, []);

    const handleEdit = uniqueId => {
        const object = companies.find(items => uniqueId === items.uniqueId);
        setModalDetails(object);
        setModalState(true);
        setShowModal(true);
    }

    const handleDelete = uniqueId => {
        const index = companies.findIndex(items => uniqueId === items.uniqueId);
        companies.splice(index, 1);
        const a = [...companies];
        dispatch(addProductToArray('UPDATE_COMPANY', a));
    }

    return (
        <div className='company_main'>
            {
                showModal ? <DataModalCompany
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
                <Table striped bordered hover className='company_table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies?.map((company, index) => {
                            return (
                                <tr key={company.uniqueId}>
                                    <td>{index + 1}</td>
                                    <td className='company_name'>{company.companyName}</td>
                                    <td className='company_user_name'>{company.userName}</td>
                                    <td>{company.email}</td>
                                    <td className='edit_delete_btn'>
                                        <Button className='mx-1' variant="warning" onClick={() => handleEdit(company.uniqueId)}>Edit</Button>
                                        <Button className='mx-1' variant="danger" onClick={() => handleDelete(company.uniqueId)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Company;
