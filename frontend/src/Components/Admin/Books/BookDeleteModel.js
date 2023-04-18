
import React from "react"
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./../../../Configs/AppRoutes";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const BookDeleteModel = ({ setDelete, bookId }) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        const token = `Bearer ${localStorage.getItem("token")}`;
        const bookApi = `${BASE_URL}/api/books/${bookId}`;

        // console.log("manage", manageId);
        axios({
            method: 'delete',
            url: bookApi,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token,
            },
        })
        .then(response => {
            toast.success(response.data.message);
            setDelete(false)
            navigate(AppRoutes.AdminBooks.getAllBooks);
        })
        .catch(error => {
            console.log(error);
            if (error.response.status === 422) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        })

    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title><h5 className="confirmTitle">Confirmation Alert!</h5></Modal.Title>
            </Modal.Header>
            <Form className='adminForm' onSubmit={handleDelete}>
                <Modal.Body>
                    <p className='confirm mb-2'><span>Are you sure to delete this Book?</span></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='modalNo' onClick={() => { setDelete(false) }}>No</Button>
                    <Button variant="primary" className='modalYes' onClick={() => handleDelete()}>Yes</Button>
                </Modal.Footer>
            </Form>
        </>
    )
}
export default BookDeleteModel;
