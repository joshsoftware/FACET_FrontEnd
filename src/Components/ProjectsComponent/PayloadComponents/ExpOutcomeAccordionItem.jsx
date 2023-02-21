import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

import { TableComponent } from "Components/CustomComponents";

import { EXPECTED_OUTCOME_TABLE_HEADINGS } from "constants/appConstants";

const ExpOutcomeAccordionItem = ({ item, eventKey }) => {
  const { name, expected_outcome: expectedOutcome } = item;

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        <TableComponent
          striped
          bordered
          headings={EXPECTED_OUTCOME_TABLE_HEADINGS}
        >
          {expectedOutcome?.map(
            ({ name: fieldName, type, isExact, value, validations }, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fieldName}</td>
                <td>{type}</td>
                <td>{isExact ? "Yes" : "No"}</td>
                <td>{value || "-"}</td>
                <td>
                  <pre className="mb-0">
                    {JSON.stringify(validations, null, 2) || "-"}
                  </pre>
                </td>
              </tr>
            )
          )}
        </TableComponent>
      </Accordion.Body>
    </Accordion.Item>
  );
};

ExpOutcomeAccordionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    expected_outcome: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  eventKey: PropTypes.number.isRequired,
};

export default ExpOutcomeAccordionItem;
