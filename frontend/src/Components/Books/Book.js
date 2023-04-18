import Card from 'react-bootstrap/Card';
import AppRoutes from '../../Configs/AppRoutes';
import { LinkContainer } from 'react-router-bootstrap';

function Book({ book }) {
    return (
        <div className="card my_card">
                <img src={book.image_url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <div className="row">
                            <div className="col-6">
                                <span className="badge bg-success">{book.published}</span>
                            </div>
                            <div className="col-6">
                                <span className="badge bg-success">{book.author}</span>
                            </div>
                            <div className="col-12 mt-3 mb-2">
                                ISBN Number: <span className="badge bg-success">{book.isbn}</span>
                            </div>
                        </div>
                        <p className="card-text">{book.description.slice(0,50)}...</p>
                        <div className="col-12">
                            <LinkContainer to={`${'/books/detail/' + book.id}`}>
                                <button className="btn btn-primary">Read More</button>
                            </LinkContainer>
                        </div>
                    </div>
            </div>
    );
}
export default Book;
