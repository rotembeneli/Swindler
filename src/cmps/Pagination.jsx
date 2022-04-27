export function Pagination({ pageCount, paginate, currPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination flex  space-around">
            <button className="pre-page btn" onClick={() => paginate(currPage, -1)}>Previous</button>
            <ul className="btns-list flex align-center clean-list">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <button className="page-btn btn" onClick={() => paginate(num - 1)}>{num}</button>
                    </li>
                ))}
            </ul>
            <button className="next-page btn" onClick={() => paginate(currPage, 1)}>Next</button>
        </div>
    )
}