import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const InfiniteScrollComponent = ({ children, loader, ...props }) => {
    return (
        <InfiniteScroll
            loader={loader ? loader : (
                <div className="text-center">
                    <Spinner animation="border" size="sm" />
                </div>
            )}
            {...props}
        >
            {children}
        </InfiniteScroll>
    );
};

InfiniteScrollComponent.propTypes = {
    dataLength: PropTypes.number,
    next: PropTypes.func,
    hasMore: PropTypes.bool,
    children: PropTypes.node,
    loader: PropTypes.node,
};

export default InfiniteScrollComponent;
