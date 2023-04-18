import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage + 1);
    };
    return (
        <div>
            <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageCount={Math.ceil(totalPage)}
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                containerClassName="adminPagination"
                previousLinkClassName="paginationLink"
                nextLinkClassName="paginationLink"
                disabledClassName="paginationDisabled"  
                activeClassName="paginationActive"
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
            />
        </div>
    );
};

export default Pagination;
