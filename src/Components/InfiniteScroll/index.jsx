import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const InfiniteScroll = ({ dataLength, children, loader, next, hasMore }) => {
    const loaderRef = useRef(null);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];

            if (hasMore && target.isIntersecting) {
                next();
            }
        },
        [hasMore, dataLength]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <>
            {children}
            {hasMore &&
                (loader ? (
                    loader
                ) : (
                    <div className="text-center">
                        <Spinner animation="border" size="sm" />
                    </div>
                ))}
            <div ref={loaderRef} />
        </>
    );
};

InfiniteScroll.propTypes = {
    dataLength: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    children: PropTypes.node,
    loader: PropTypes.node,
};

export default InfiniteScroll;
