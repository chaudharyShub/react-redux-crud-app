import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import ModalCompany from './ModalCompany';
import { useDispatch, useSelector } from 'react-redux';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Spinner from 'react-bootstrap/Spinner';
import './Company.css';


function Company() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const companies = selector.companyReducer.companies;

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const getCompanyArray = () => {
        getDocs(collection(db, 'company'))
            .then(res => {
                const companies = res.docs.map(doc => {
                    return {
                        data: doc.data(),
                        id: doc.id
                    }
                });
                dispatch({ type: 'UPDATE_COMPANY', payload: companies });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getCompanyArray();
    }, [showModal, isEditing]);

    const handleEdit = id => {
        const object = companies.find(items => id === items.id);
        if (!object) return;
        setModalDetails({ ...object.data, id: object.id });
        setIsEditing(true);
        setShowModal(true);
    }

    const handleDelete = id => {
        const companyRef = doc(db, 'company', id);
        deleteDoc(companyRef)
            .then(() => '')
            .catch(err => console.log(err));

        const index = companies.findIndex(items => id === items.id);
        companies.splice(index, 1);
        dispatch({ type: 'UPDATE_COMPANY', payload: [...companies] });
    }

    return (
        <div className='company_main'>
            {
                showModal ? <ModalCompany
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalDetails={modalDetails || {}}
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
                    companies.length ?
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
                                {companies.map((company, index) => {
                                    return (
                                        <tr key={company.id}>
                                            <td>{index + 1}</td>
                                            <td className='company_name'>{company.data?.companyName}</td>
                                            <td className='company_user_name'>{company.data?.userName}</td>
                                            <td>{company.data?.email}</td>
                                            <td className='edit_delete_btn'>
                                                <Button className='mx-1' variant="warning" onClick={() => handleEdit(company.id)}>Edit</Button>
                                                <Button className='mx-1' variant="danger" onClick={() => handleDelete(company.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                }
            </Container>
        </div>
    );
}

export default Company;
