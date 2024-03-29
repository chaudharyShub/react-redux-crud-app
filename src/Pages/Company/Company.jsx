import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { Button, Table, Container } from 'react-bootstrap';
import ModalCompany from '../../Components/ModalCompany';
import { db } from '../../lib/firebase';
import Loader from '../../Components/Loader';
import { getCompanyAndProductArray } from '../../Redux/actions/action';
import './Company.css';


function Company() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const companies = selector.companyReducer.companies;

    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCompanyAndProductArray(dispatch, 'company', 'UPDATE_COMPANY', setLoading);
    }, []);

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
            .then(() => {
                const index = companies.findIndex(items => id === items.id);
                companies.splice(index, 1);
                dispatch({ type: 'UPDATE_COMPANY', payload: [...companies] });
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='company_main'>
            {
                showModal ? <ModalCompany
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalDetails={modalDetails || {}}
                    // toast={toast}
                    isEditing={isEditing}
                    setModalDetails={setModalDetails}
                    setIsEditing={setIsEditing}
                    setLoading={setLoading}
                /> : null
            }
            <Container>
                <div className='add_button'>
                    <Button className='my-3' variant="primary" onClick={() => setShowModal(true)}>
                        Add
                    </Button>
                </div>
                {loading ? <Loader /> :
                    companies.length === 0 && !loading
                        ? <h3>Nothing to show !!!</h3>
                        : companies.length > 0 && !loading ? <Table striped bordered hover className='company_table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Company Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    companies.map((company, index) => {
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
                        </Table> : null
                }
            </Container>
        </div>
    );
}

export default Company;

