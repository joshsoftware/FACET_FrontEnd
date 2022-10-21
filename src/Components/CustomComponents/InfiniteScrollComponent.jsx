import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import React from 'react';

const InfiniteScrollComponent = ({ children, ...props }) => {
    return <InfiniteScroll {...props}>{children}</InfiniteScroll>
};

export default InfiniteScrollComponent;

InfiniteScrollComponent.propTypes = {
    dataLength: PropTypes.number,
    next: PropTypes.func,
    hasMore: PropTypes.bool,
    children: PropTypes.node,
    loader: PropTypes.node,
};
