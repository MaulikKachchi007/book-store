const Register = '/register';
const Login = '/login';
const Home = '/';
const PROFILE = '/profile';
const AdminBooks = {
    getAllBooks: '/admin/books',
    getBooks: '/admin/books/:id',
    createBook: '/admin/create/books',
};
const getBookDetail = '/books/detail/:id';

const AppRoutes = {
    Home,
    Register,
    Login,
    PROFILE,
    getBookDetail,
    AdminBooks
};

export default AppRoutes;
