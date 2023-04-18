import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './Components/Navbar/HomeNavbar';
import AppRoutes from './Configs/AppRoutes';
import Home from './Components/Home';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import AdminBooks from './Components/Admin/Books/Books';
import CreateBook from './Components/Admin/Books/CreateBook';
import EditBook from './Components/Admin/Books/EditBook';
import BookDetail from './Components/Admin/Books/BookDetail';
import Profile from  './Components/Auth/Profile';

function App () {
    let token = localStorage.getItem('token');  
    const LoggedUser = () => {
        return token ? <Outlet /> : <Login />;
    } 
    
    return (
        <div className="App">
            <BrowserRouter>
                <HomeNavbar/>
                <Routes>
                    <Route path={AppRoutes.Home} element={<Home/>}/>
                        <Route path={AppRoutes.Register} element={<Register/>}/>
                        <Route path={AppRoutes.Login} element={<Login/>}/>
                    <Route element={<LoggedUser />}>
                        <Route path={AppRoutes.PROFILE} element={<Profile />} />
                        <Route path={AppRoutes.AdminBooks.getAllBooks} element={<AdminBooks />} />
                        <Route path={AppRoutes.AdminBooks.createBook} element={<CreateBook />} />
                        <Route path={AppRoutes.AdminBooks.getBooks} element={<EditBook />} />
                        <Route path={AppRoutes.getBookDetail} element={<BookDetail />} />
                    </Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </div>
    );
}
export default App;
