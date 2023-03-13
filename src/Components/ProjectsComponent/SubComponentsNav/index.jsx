import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

import NoResultsFound from "Components/NoResultsFound";
import SubComponentNavItem from "./SubComponentNavItem";

import "./style.css";

const SubComponentsNav = ({
  title,
  data,
  isLoading,
  onAddBtnClick,
  componentBaseUrl,
}) => (
  <Nav className="sidebar subnav col-md-12 bg-light d-flex flex-column justify-content-start">
    <div className="d-flex justify-content-between align-items-center border border-bottom py-3 px-2">
      <h4 className="fw-bolder mb-0">{title}</h4>
      <Button
        size="sm"
        variant="success"
        onClick={onAddBtnClick}
        className="d-flex align-items-center"
      >
        <Plus /> New
      </Button>
    </div>
    <div className="subnav-child">
      {isLoading ? (
        <div className="p-2">
          <Skeleton count={5} className="py-2 my-1" />
        </div>
      ) : (
        <>
          {data?.map(({ id: itemId, name }, index) => (
            <SubComponentNavItem
              key={index}
              itemId={itemId}
              name={name}
              componentBaseUrl={componentBaseUrl}
            />
          ))}
          {!data?.length && <NoResultsFound btnOnclick={onAddBtnClick} />}
        </>
      )}
    </div>
  </Nav>
);

SubComponentsNav.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  onAddBtnClick: PropTypes.func.isRequired,
  componentBaseUrl: PropTypes.string.isRequired,
};

export default React.memo(SubComponentsNav);
