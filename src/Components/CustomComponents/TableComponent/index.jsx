import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const TableComponent = ({ children, headings, size, striped, bordered, ...props }) => {
    return (
        <Table striped={striped} bordered={bordered} size={size} {...props}>
            <thead>
                <tr>
                    {headings?.map((th, index) => {
                        return <th key={index}>{th}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </Table>
    )
}

export default TableComponent;

TableComponent.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    headings: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.string,
    striped: PropTypes.bool,
    bordered: PropTypes.bool
}
