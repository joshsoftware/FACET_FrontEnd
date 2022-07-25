import React from 'react';
import './style.css';

const FieldBox = (
    {
        item,
        isActive,
        handleClick
    }
) => {
    return (
        <div 
            className={`border rounded my-1 px-4 py-3 d-flex align-items-center fieldType ${isActive&&'active'}`}
            onClick={handleClick}
        >
            <div className={`border d-flex px-2 py-1 rounded fieldTypeIcon-${item.name}`}>
                {item.icon}
            </div>
            <div className='ps-3'>
                <strong className='text-capitalize'>{item.name}</strong>
                <div>
                    <small>{item.tagline}</small>
                </div>
            </div>
        </div>
    )
}

export default FieldBox;