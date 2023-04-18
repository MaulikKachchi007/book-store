import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate  } from 'react-router-dom';
import ROUTES from '../../Configs/AppRoutes';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function HomeNavbar() {
    const navigate = useNavigate();
    let userToken = localStorage.getItem('token');
    const user = localStorage.getItem('loggedUserName');
    const loggedUserRoleName = localStorage.getItem('loggedUserRoleName');
    
    // login submit
    const handleLogout = async (e) => {
        e.preventDefault();
        const logoutApi = `${BASE_URL}/api/logout`;
        const token = `Bearer ${userToken}`;
        axios({
            method: 'get',
            url: logoutApi,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': token,
            },
        }).then((response) => {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedUserName');
            localStorage.removeItem('loggedUserEmail');
            localStorage.removeItem('loggedUserRoleName');
            toast.success(response.data.message)
            navigate(ROUTES.Login);
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
           <Navbar bg="dark" expand="lg" variant="dark">
               <Container>
                   <LinkContainer to="/">
                   <Navbar.Brand>Book Store</Navbar.Brand>
                   </LinkContainer>
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse id="basic-navbar-nav">
                       <Nav className="me-auto">
                           <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                           </LinkContainer>
                           {
                               loggedUserRoleName === 'admin' ?
                               <LinkContainer
                                   to={ROUTES.AdminBooks.getAllBooks}>
                                   <Nav.Link>Books</Nav.Link>
                               </LinkContainer> 
                                   : null
                           }
                       </Nav>
                       {
                           userToken ?
                               <NavDropdown className="text-white" title={user} id="basic-nav-dropdown">
                                   <LinkContainer to="profile">
                                       <NavDropdown.Item>
                                           Profile
                                       </NavDropdown.Item>
                                   </LinkContainer>
                                   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                               </NavDropdown>
                               :
                               <Nav className="ms-auto">
                                   <LinkContainer to="register">
                                        <Nav.Link>Register /</Nav.Link>
                                   </LinkContainer>
                                   <LinkContainer to="login">
                                        <Nav.Link href="login">Login</Nav.Link>
                                   </LinkContainer>
                               </Nav>
                       }
                   </Navbar.Collapse>
               </Container>
           </Navbar>
       </>
    );
}
