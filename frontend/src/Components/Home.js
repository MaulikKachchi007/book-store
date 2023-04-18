import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Book from './Books/Book';
import Pagination from './Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  Loader from './Loader';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function Home () {
    console.log(localStorage.getItem('loggedUser'));
    const [books, setBooks] = useState([]);

    const [totalPage, setTotalPage] = useState('');
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    
    
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [loading, setLoading] = useState(false)

    const getBookApi = async (e) => {
        const bookApi = `${BASE_URL}/api/get-all-books?page=${currentPage}&limit=10`;
        setLoading(true)
        axios({
            method: 'GET',
            url: bookApi,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
        }).then((response) => {
            console.log(response.data.data.total);
            setBooks(response.data.data);
            setTotalRecord(response.data.data.total);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
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
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        let booksApi;
        setLoading(true)
        console.log(dateRange);
        if (search) {
            booksApi = `${BASE_URL}/api/get-all-books?search=${search}`;
        }
        if (dateRange[0] > 0 || dateRange[1] > 0) {
            let startDate = dateRange[0]?.getFullYear() + '-' + (dateRange[0]?.getMonth() + 1) + '-' + dateRange[0]?.getDate();
            let endDate = dateRange[1]?.getFullYear() + '-' + (dateRange[1]?.getMonth() + 1) + '-' + dateRange[1]?.getDate();
            let fullDate = startDate + '/' + endDate;
            console.log(fullDate);
            booksApi = `${BASE_URL}/api/get-all-books?date=${fullDate}`;
        }
        axios({
            method: 'GET',
            url: booksApi,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
        }).then((response) => {
            setBooks(response.data.data);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
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
                        <div className="col-9 d-flex flex-wrap gap-3 d-flex justify-content-end">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <input type="text"
                                           className="form form-control"
                                           value={search}
                                           onChange={(e) => setSearch(
                                               e.target.value)}
                                           placeholder="Search by Title, Author, Publisher, or ISBN"/>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <DatePicker
                                        selectsRange={true}
                                        className="form-control w-100"
                                        startDate={startDate}
                                        endDate={endDate}
                                        maxDate={Date.now()}
                                        onChange={(event) => {
                                            setDateRange(event);
                                        }}
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="Start Date - End Date"/>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="d-flex justify-content-end gap-2">
                                            <button type="button" onClick={handleSearch}
                                                    className="btn btn- btn-primary">Search
                                            </button>
                                            <button type="button" onClick={handleClear}
                                                    className="btn btn- btn-primary">Reset
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center flex-wrap">
                        {loading ? <Loader/>:
                                books?.data?.map((book) => {
                                return (
                                    <div className="col-lg-3 col-md-3"
                                         key={book._id}>
                                        <>
                                            <Book book={book}/>
                                        </>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {totalPage >= 1 &&
                    <Pagination totalPage={totalPage} currentPage={currentPage}
                                setCurrentPage={setCurrentPage}/>
                    }
                </div>
            </section>
        </>
    );
}
