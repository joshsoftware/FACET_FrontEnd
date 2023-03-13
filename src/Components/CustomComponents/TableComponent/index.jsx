import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

const TableComponent = ({
  children,
  headings,
  size,
  striped,
  bordered,
  ...props
}) => (
  <Table
    className="text-break"
    striped={striped}
    bordered={bordered}
    size={size}
    {...props}
  >
    <thead className="align-middle">
      <tr>
        {headings?.map((tableHeading, index) => (
          <th key={index}>{tableHeading}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

TableComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  headings: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.string,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
};

export default TableComponent;
