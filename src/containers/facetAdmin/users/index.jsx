import React, { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import { TableComponent } from "Components/CustomComponents";
import UserTableRow from "Components/facetAdmin/userTableRow";

import { getUsersRequest } from "store/facetAdmin/actions";

const tableHeadings = ["#", "User", "Account Type", "Organization"];

const mapState = ({ admin }) => ({
  users: admin.users,
  isLoading: admin.isLoading && !admin.users?.length,
});

const Users = () => {
  const dispatch = useDispatch();

  const { isLoading, users } = useSelector(mapState);

  // fetch the list of users onboarded on facet system
  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  return (
    <Col className="py-5 px-5">
      <h2>Users</h2>
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
              {users.map((item, index) => (
                <UserTableRow key={index} index={index + 1} data={item} />
              ))}
            </TableComponent>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Users;
