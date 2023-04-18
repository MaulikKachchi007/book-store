import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../Configs/AppRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function Login () {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    if (localStorage.getItem('token') ) {
        window.location = ROUTES.Home;
    }
    const handleChange = event => {
        event.preventDefault();
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    };
    // login submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginApi = `${BASE_URL}/api/login`;
        const data = {
            email: email,
            password: password,
        }
        axios({
            method: 'POST',
            url: loginApi,
            data: data,
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
        }).then((response) => {
            localStorage.setItem('token', response.data?.data?.token);
            localStorage.setItem('loggedUserRoleName', response.data?.data?.data?.roles[0].name);
            localStorage.setItem('loggedUserName', response.data?.data?.data.name);
            localStorage.setItem('loggedUserEmail', response.data?.data?.data.email);
            toast.success(response.data.message)
            navigate(ROUTES.Home);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 422 || error.response.status === 401) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message)
            } else {
                toast.error("Something went wrong!")
            }
        });
    };

    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-1 rounded">
                    <Card>
                        <Card.Header><Card.Title>Login</Card.Title></Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"
                                            controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email"
                                                  placeholder="Enter email"
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3"
                                            controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password"
                                                  placeholder="Password"
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}
