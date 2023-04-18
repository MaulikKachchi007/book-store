import '../../../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppRoutes from '../../../Configs/AppRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function BookDetail () {

    const navigate = useNavigate();
    const { id } = useParams();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = `Bearer ${localStorage.getItem('token')}`;

    const getBookApi = async (e) => {
        const bookApi = `${BASE_URL}/api/books/${id}`;
        setLoading(true);
        axios({
            method: 'GET',
            url: bookApi,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': token,
            },
        }).then((response) => {
            setBooks(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };


    useEffect(() => {
        getBookApi();
    }, [books]);
    
    return (
        <>
            <section className="home-body-content">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h1 className="mb-3">Book Detail</h1>
                        </div>
                        <div className="col-2">
                            <LinkContainer to="/">
                                <button className="btn btn-primary">Back</button>
                            </LinkContainer>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <img src={books?.image_url} className="img-fluid" width="200" height="200" />
                        </div>
                        <div className="col-sm-8">
                            <h2>{books?.title}</h2>
                            <h5>By, {books?.author}, Released: {books?.published}</h5>
                            <p>Publisher: {books?.publisher}, ISBN: {books?.isbn}</p>
                            <p>
                                {books?.description}
                            </p>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
