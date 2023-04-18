import '../../../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from './../../Pagination';
import Loader from './../../Loader';
import Table from 'react-bootstrap/Table';
import AppRoutes from '../../../Configs/AppRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import CreateBook from './CreateBook';
import BookDeleteModel from './BookDeleteModel';
import CustomModal from '../CustomModel';
import { Link, useNavigate  } from 'react-router-dom';
import ROUTES from '../../../Configs/AppRoutes';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function Home () {
    
    const [books, setBooks] = useState([]);

    const [totalPage, setTotalPage] = useState('');
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [Delete, setDelete] = useState(false)
    const [bookId, setBookId] = useState('');

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [loading, setLoading] = useState(false);

    const loggedUserRoleName = localStorage.getItem('loggedUserRoleName');
    if (loggedUserRoleName != 'admin' ) {
        toast.error('Only admin is allowed');
        window.location = ROUTES.Home;
    }
    const token = `Bearer ${localStorage.getItem('token')}`;

    const handleDelete = (index) => {
        setDelete(true);
        setBookId(index);
    }

    const getBookApi = async (e) => {
        const bookApi = `${BASE_URL}/api/books?page=${currentPage}&limit=10`;
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
            console.log(response.data.data.total);
            setBooks(response.data.data);
            setTotalRecord(response.data.data.total);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            // if (error.response.status === 422 || error.response.status ===
            //     401) {
            //     console.log(error.response.data.message);
            //     toast.error(error.response.data.message);
            // } else {
            //     toast.error('Something went wrong!');
            // }
        });
    };

    const handleClear = async (e) => {
        setSearch('');
        setDateRange([null, null]);
        getBookApi();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        let booksApi;
        setLoading(true);
        console.log(dateRange);
        if (search) {
            booksApi = `${BASE_URL}/api/books?search=${search}`;
        }
        if (dateRange[0] > 0 || dateRange[1] > 0) {
            let startDate = dateRange[0]?.getFullYear() + '-' +
                (dateRange[0]?.getMonth() + 1) + '-' + dateRange[0]?.getDate();
            let endDate = dateRange[1]?.getFullYear() + '-' +
                (dateRange[1]?.getMonth() + 1) + '-' + dateRange[1]?.getDate();
            let fullDate = startDate + '/' + endDate;
            console.log(fullDate);
            booksApi = `${BASE_URL}/api/books?date=${fullDate}`;
        }
        axios({
            method: 'GET',
            url: booksApi,
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
            // if (error.response.status === 422 || error.response.status ===
            //     401) {
            //     console.log(error.response.data.message);
            //     toast.error(error.response.data.message);
            // } else {
            //     toast.error('Something went wrong!');
            // }
        });

    };

    useEffect(() => {
        if (totalRecord || totalRecord === 0) {
            var page = totalRecord / 10;
            setTotalPage(page);
        }
    }, [totalRecord]);

    useEffect(() => {
        getBookApi();
    }, [currentPage]);
    return (
        <>
            <section className="home-body-content">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h1 className="mb-3">Book List</h1>
                        </div>
                        <div
                            className="col-9 d-flex flex-wrap gap-3 d-flex justify-content-end">
                            <div className="row">
                                <div className="col-5">
                                    <input type="text"
                                           className="form form-control"
                                           value={search}
                                           onChange={(e) => setSearch(
                                               e.target.value)}
                                           placeholder="Search by Title, Author, Publisher, or ISBN"/>
                                </div>
                                <div className="col-7">
                                    <div
                                        className="d-flex justify-content-end gap-3">
                                        <button type="button"
                                                onClick={handleSearch}
                                                className="btn btn- btn-primary">Search
                                        </button>
                                        <button type="button"
                                                onClick={handleClear}
                                                className="btn btn- btn-primary">Reset
                                        </button>
                                        <LinkContainer to={AppRoutes.AdminBooks.createBook}>
                                            <a className="btn btn- btn-primary">Add Book
                                            </a>
                                        </LinkContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="table-container">
                            <Table responsive className="depositTable">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                    <th>Publisher</th>
                                    <th>Published</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading ? <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td rowSpan="5" className="d-flex justify-content-center"><Loader/></td>
                                        <td></td>
                                        <td></td>
                                    </tr> :
                                    books?.data?.map((book) => {
                                        return (
                                            <tr key={book.id}>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>{book.isbn}</td>
                                                <td>{book.publisher}</td>
                                                <td>{book.published}</td>
                                                <td>
                                                    <Link to={`${AppRoutes.AdminBooks.getAllBooks + '/' + book.id}`} className='btn btn-sm btn-warning me-2'><FontAwesomeIcon icon={faEdit} /></Link>
                                                    <a className="btn btn-sm btn-danger"  onClick={() => handleDelete(book.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    {totalPage >= 1 &&
                         <Pagination totalPage={totalPage} currentPage={currentPage}
                                     setCurrentPage={setCurrentPage}/>
                    }
                </div>
                <CustomModal display={Delete} handleClose={() => setDelete(false)} size='md' className='userModal'>
                        <BookDeleteModel setDelete={setDelete} bookId={bookId} />
                </CustomModal>
            </section>
        </>
    );
}
