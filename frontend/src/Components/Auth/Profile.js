import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import AppRoutes from '../../Configs/AppRoutes';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function CreateBook() {
    const navigate = useNavigate();
    const { id } = useParams();

    const token = `Bearer ${localStorage.getItem('token')}`;
    const [loading, setLoading] = useState(false);

    const [editData, setEditData] = useState([]);
    const [name, setName]  = useState('');
    const [email, setEmail]  = useState('');
    const [role, setRole]  = useState('');

    const loggedUserRoleName = localStorage.getItem('loggedUserRoleName');
    
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            default:
                break;
        }
    }

    const getProfileApi = async () => {
        const profileApi = `${BASE_URL}/api/profile`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        axios
        .get(profileApi, config)
        .then((response) => {
            if (response.status === 200) {
                setEditData(response.data.data);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const profileApi = `${BASE_URL}/api/update-profile`;
        let data = {
             'name': name,
             'email': email,
        };

        axios({
            method: 'POST',
            url: profileApi,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token,
            },
        })
        .then(response => {
            toast.success(response.data.message);
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
    
    useEffect(() => {
        setName(editData?.name);
        setEmail(editData?.email);
        setRole(editData?.roles?.[0]?.name);
    }, [editData])

    useEffect(() => {
        getProfileApi();
    }, []);

    return (
        <section className="home-body-content">
            <div className="container">
                    <h1 className="mb-3">Edit Profile</h1>
                <Card>
                    <Card.Header>Edit Profile</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleChange} value={name} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Form.Control type="email" name="name" placeholder="Enter Email" onChange={handleChange} value={email} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="roles" placeholder="Enter Roles" value={role} disabled />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-primary" type="submit">Update Profile</button>
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </section>
    );
}
    
