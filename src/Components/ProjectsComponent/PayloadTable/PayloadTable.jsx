import PropTypes from 'prop-types';
import React from 'react';

import Editor from 'Components/Editor/index';
import TableComponent from 'Components/CustomComponents/TableComponent/index';

import PayloadTableRow from './PayloadTableRow';
import { useState } from 'react';
import { useEffect } from 'react';

const PayloadTable = ({ data, mode, onChange, headings, isMain }) => {
  const [payloadData, setPayloadData] = useState(data);

  useEffect(() => {
    setPayloadData(data);
  }, [data]);

  // update data whn key value changes
  const handleValueChange = (name, val) => {
    onChange(name, val);
  };

  return (
    <div className={isMain && `payload-table-wrapper`}>
      {mode === 'table' ? (
        <TableComponent headings={headings} className="mb-0">
          {Object.entries(data)?.map((item, index) => (
            <PayloadTableRow
              key={index}
              item={item}
              isChild={!isMain}
              onChange={handleValueChange}
            />
          ))}
        </TableComponent>
      ) : (
        mode === 'code' && (
          <Editor json={data} mode="code" indentation={4} onChangeText={onChange} />
        )
      )}
    </div>
  );
};

PayloadTable.propTypes = {
  data: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['table', 'code']),
  onChange: PropTypes.func,
  headings: PropTypes.arrayOf(PropTypes.string),
  isMain: PropTypes.bool,
};

export default PayloadTable;
