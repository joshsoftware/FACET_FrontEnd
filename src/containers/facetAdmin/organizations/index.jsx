import React, { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import OrgDetailsTableRow from "Components/facetAdmin/OrgDetailsTableRow";
import { TableComponent } from "Components/CustomComponents";

import { getOrganizationsRequest } from "store/facetAdmin/actions";

const tableHeadings = ["#", "Name", "Organization Id", "Contact"];

const mapState = ({ admin }) => ({
  organizations: admin.organizations,
  isLoading: admin.isLoading && !admin.organizations?.length,
});

const Organizations = () => {
  const dispatch = useDispatch();

  const { organizations, isLoading } = useSelector(mapState);

  // fetch the list of organizations
  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, []);

  return (
    <Col className="py-5 px-5">
      <h2>Organizations</h2>
      <Card className="my-4 px-3">
        <Card.Body>
          {isLoading ? (
            <div className="w-100 text-center">
              <Loader />
            </div>
          ) : (
            <TableComponent
              headings={tableHeadings}
              className="mt-2 mb-3"
              striped
            >
              {organizations.map((item, index) => (
                <OrgDetailsTableRow key={index} data={item} index={index + 1} />
              ))}
            </TableComponent>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Organizations;
