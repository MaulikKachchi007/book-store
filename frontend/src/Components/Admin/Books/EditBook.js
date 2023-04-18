import { LinkContainer } from 'react-router-bootstrap';
import AppRoutes from '../../../Configs/AppRoutes';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import ROUTES from '../../../Configs/AppRoutes';
import userIcon from '../../../assets/userIcon.jpg';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function CreateBook() {
    const navigate = useNavigate();
    const { id } = useParams();

    const token = `Bearer ${localStorage.getItem('token')}`;
    const [loading, setLoading] = useState(false);

    const [editData, setEditData] = useState([]);
    const [title,setTitle]  = useState('');
    const [author,setAuthor]  = useState('');
    const [genre,setGenre]  = useState('');
    const [isbn,setIsbn]  = useState('');
    const [publisher,setPublisher]  = useState('');
    const [published,setPublished]  = useState('');
    const [description,setDescription]  = useState('');
    const [image,setImage]  = useState('');
    const [imagePath,setImagePath]  = useState('');

    const loggedUserRoleName = localStorage.getItem('loggedUserRoleName');
    if (loggedUserRoleName != 'admin' ) {
        toast.error('Only admin is allowed');
        window.location = ROUTES.Home;
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'title':
                setTitle(event.target.value);
                break;
            case 'author':
                setAuthor(event.target.value);
                break;
            case 'genre':
                setGenre(event.target.value);
                break;
            case 'isbn':
                setIsbn(event.target.value);
                break;
            case 'publisher':
                setPublisher(event.target.value);
                break;
            case 'published':
                setPublished(event.target.value);
                break;
            case 'description':
                setDescription(event.target.value);
                break;
            default:
                break;
        }
    }

    const getBookApi = async () => {
        const bookApi = `${BASE_URL}/api/books/${id}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        axios
        .get(bookApi, config)
        .then((response) => {
            if (response.status === 200) {
                setEditData(response.data.data);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookApi = `${BASE_URL}/api/books/${id}`;
        let data = {};
        if (image) {
            data = {
                'title': title,
                'author': author,
                'genre': genre,
                'isbn': isbn,
                'publisher': publisher,
                'published': published,
                'description': description,
                'image': image,
            };
        } else {
            data = {
                'title': title,
                'author': author,
                'genre': genre,
                'isbn': isbn,
                'publisher': publisher,
                'published': published,
                'description': description,
                'image': null,
            };
        }
       
        axios({
            method: 'POST',
            url: bookApi,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token,
            },
        })
        .then(response => {
            toast.success(response.data.message);
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

    useEffect(() => {
        setTitle(editData?.title);
        setAuthor(editData?.author);
        setGenre(editData?.genre);
        setDescription(editData?.description);
        setIsbn(editData?.isbn);
        setPublisher(editData?.publisher);
        setPublished(editData?.published);
    }, [editData])

    useEffect(() => {
        getBookApi();
    }, []);

    return (
        <section className="home-body-content">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h1 className="mb-3">Edit Book</h1>
                    </div>
                    <div className="col-9">
                        <div className="d-flex justify-content-end">
                            <LinkContainer to={AppRoutes.AdminBooks.getAllBooks}>
                                <a className="btn btn-primary">Back
                                </a>
                            </LinkContainer>
                        </div>
                    </div>
                </div>
                <Card>
                    <Card.Header>Edit Book</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <div className="row">
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="title" placeholder="Enter Title" onChange={handleChange} value={title} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="author" placeholder="Enter Author" onChange={handleChange} value={author} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="genre" placeholder="Enter genre" onChange={handleChange} value={genre} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="isbn" onChange={handleChange} placeholder="Enter ISBN"  value={isbn} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="text" name="publisher" placeholder="Enter Publisher" onChange={handleChange} value={publisher} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <Form.Control type="date" name="published" onChange={handleChange} value={published} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <Form.Control as="textarea" name='description' rows={3}  placeholder="Description" onChange={handleChange} value={description} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Book image</Form.Label>
                                            <Form.Control type="file" onChange={handleChangeImage} name='image' />
                                               <img className="img-thumbnail mt-3" src={imagePath ? imagePath: editData?.image_url ? editData?.image_url : userIcon } width={100} height={100} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-primary" type="submit">Update Book</button>
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
    
