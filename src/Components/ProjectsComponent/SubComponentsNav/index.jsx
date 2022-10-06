import React from 'react'
import PropTypes from 'prop-types';
import { Button, Nav } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import NoResultsFound from 'Components/NoResultsFound';
import './style.css';

const SubComponentsNav = (props) => {
    const {
        title, 
        data, 
        isLoading,
        onAddBtnClick ,
        onSelectItemUrl
    } = props;

    const { id } = useParams();

    return (
        <Nav className='sidebar subnav col-md-12 bg-light d-flex flex-column justify-content-start'>
            <div className='d-flex justify-content-between align-items-center border border-bottom pt-4 pb-1 px-2'>
                <h5>
                    <b>{title}</b>
                </h5>
                <Button
                    size='sm'
                    variant='success'
                    className='mb-2'
                    onClick={onAddBtnClick}
                >
                    + New
                </Button>
            </div>
            <div className='subnav-child'>
                {isLoading?(
                    <div className='p-2'>
                        <Skeleton count={5} className='py-2 my-1' />
                    </div>
                ):(
                    <>
                    {data&&data.map((e, index) => {
                        return <Nav.Item 
                                    className={`sidebar-item ${e.id.toString()===id&&'active'}`} 
                                    key={index}
                                >
                                    <Link to={`${onSelectItemUrl}/${e.id}`} className='nav-link sidebar-link'>
                                        {e.name}
                                    </Link>
                                </Nav.Item>
                    })}
                    {data&&data.length===0&&(
                        <NoResultsFound 
                            btnOnclick={onAddBtnClick}
                        />
                    )}
                    </>
                )}
            </div>
        </Nav>
    )
}

export default SubComponentsNav;

SubComponentsNav.propTypes = {
    title: PropTypes.string, 
    data: PropTypes.array, 
    isLoading: PropTypes.bool,
    onAddBtnClick: PropTypes.func,
    onSelectItemUrl: PropTypes.string
}
