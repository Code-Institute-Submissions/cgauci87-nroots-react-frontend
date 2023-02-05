import React, {Fragment} from 'react';

/**
 * Pagination component
 * @param extraClass
 */
function Pagination({extraClass, total, currentPage, pageSize, setCurrentPage}) {
    const links = []; 
    for(let i = 0; (i * pageSize) < total; i++) {
        links.push(<li key={i} className={currentPage == i +1 ? 'active' : ''}><a onClick={e => setCurrentPage(i + 1)}>{i + 1}</a></li>)
    }

    return (
        <Fragment>
            <div className={"pagination-wrapper " + extraClass}>
                <ul className="pg-pagination">
                {currentPage > 1 ? (
                    <li>
                        <a onClick={e => setCurrentPage(currentPage - 1)} aria-label="Previous">
                            <i className="fi flaticon-back"/>
                        </a>
                    </li>) : null}
                    {links}
                    {currentPage * pageSize < total ? (
                    <li>
                        <a onClick={e => setCurrentPage(currentPage + 1)} aria-label="Next">
                            <i className="fi flaticon-next"/>
                        </a>
                    </li>) : null}
                </ul>
            </div>
        </Fragment>
    );
}

export default Pagination;