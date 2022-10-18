import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Trash } from 'react-bootstrap-icons';

import FormInput from 'Components/forms/Inputs/FormInput';
import PayloadTable from './PayloadTable';
import Curve from 'assets/icons/curve.svg';
// import FormSelect from 'Components/forms/Inputs/FormSelect';

const PayloadTableRow = ({ item, isChild, onChange }) => {
  const [key, value] = item;
  const [valueType, setValueType] = useState();

  useEffect(() => {
    setValueType(typeof value);
  }, [value]);

  const handleInputChange = (name, val) => {
    onChange(name, val);
  };

  return (
    <>
      <tr className="mb-0">
        <td className="fw-bold">
          {isChild && (
            <div className="curve">
              <img src={Curve} className="curve-icon" />
            </div>
          )}
          {key}
        </td>
        <td className="text-capitalize">{valueType}</td>
        <td>
          {valueType !== 'object' ? (
            <FormInput
              mb={0}
              name={key}
              value={value}
              type={valueType}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          ) : (
            ''
          )}
        </td>
        <td>
          <Trash color="red" />
        </td>
      </tr>
      {valueType === 'object' && (
        <tr className="nested-table-row">
          <td colSpan={12}>
            <PayloadTable data={value} mode="table" onChange={handleInputChange} />
          </td>
        </tr>
      )}
    </>
  );
};

PayloadTableRow.propTypes = {
  item: PropTypes.array.isRequired,
  isChild: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PayloadTableRow;
