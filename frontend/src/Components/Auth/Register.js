import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../Configs/AppRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function Register () {
    const navigate = useNavigate();
    if ( localStorage.getItem('token') ) {
        window.location = ROUTES.Home;
    }
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleChange = event => {
        event.preventDefault();
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password_confirmation':
                setConfirmPassword(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerApi = `${BASE_URL}/api/register`;
        const data = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        }
        axios({
           method: 'POST',
           url: registerApi,
           data: data,
           headers: {
               "content-type": "application/json",
               "accept": "application/json"
           },
        }).then((response) => {
            navigate(ROUTES.Login);
            toast.success(response.data.message)
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
                        <Card.Header><Card.Title>Register</Card.Title></Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"
                                            controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name"
                                                  placeholder="Enter Name"
                                                  onChange={handleChange}/>
                                </Form.Group>
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
                                <Form.Group className="mb-3"
                                            controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="password_confirmation"
                                                  placeholder="Password Confirmation"
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}
