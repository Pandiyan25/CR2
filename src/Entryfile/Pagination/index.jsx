import React from 'react';
// import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
// import './pagination.scss';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className='ant-pagination ant-table-pagination ant-table-pagination-right'
        //   className={classnames('pagination-container', { [className]: className })}
        >

            {currentPage === 1 ?

                <li
                    className="ant-pagination-prev ant-pagination-disabled"

                >
                    {"<"}
                    {/* <div className="arrow left" /> */}
                </li>
                :

                <li
                    // className={classnames('pagination-item', {
                    //   disabled: currentPage === 1
                    // })}
                    className={`ant-pagination-item ant-pagination-item-${currentPage}`}
                    onClick={onPrevious}
                >
                    {"<"}
                    {/* <div className="arrow left" /> */}
                </li>
            }
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="ant-pagination-item dots">&#8230;</li>;
                }

                return (
                    pageNumber === currentPage ?

                        <li
                            // className={classnames('pagination-item', {
                            //   selected: pageNumber === currentPage
                            // })}
                            // ant-pagination-disabled
                            className='ant-pagination-item ant-pagination-item-1 ant-pagination-item-active'
                            title={pageNumber}
                            key={pageNumber}
                            tabIndex="0"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                        :

                        <li
                            // className={classnames('pagination-item', {
                            //   selected: pageNumber === currentPage
                            // })}
                            // ant-pagination-disabled
                            className={`ant-pagination-item ant-pagination-item-${pageNumber}`}
                            title={pageNumber}
                            key={pageNumber}
                            tabIndex="0"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                );
            })}
            {currentPage === lastPage ?

                <li
                    // className={classnames('pagination-item', {
                    //   disabled: currentPage === lastPage
                    // })}
                    className="ant-pagination-next ant-pagination-disabled"

                // onClick={onNext}
                >
                    {">"}
                    {/* <div className="arrow right" /> */}
                </li>
                :

                <li
                    // className={classnames('pagination-item', {
                    //   disabled: currentPage === lastPage
                    // })}
                    className="ant-pagination-next"
                    onClick={onNext}
                >
                    {">"}
                    {/* <div className="arrow right" /> */}
                </li>
            }


        </ul>
    );
};

export default Pagination;
