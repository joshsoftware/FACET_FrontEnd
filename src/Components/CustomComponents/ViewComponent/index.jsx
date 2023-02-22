import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  // DeleteButton,
  EditButton,
  SaveButton,
} from "Components/forms/Buttons";
import Backdrop from "Components/Backdrop";
import Loader from "Components/Loader";

import "./style.css";

const ViewComponent = (props) => {
  const {
    children,
    hideBtns,
    hideHeader,
    // onDelete,
    onEdit,
    onSave,
    isSaveDisabled,
    rightChildrens,
    title,
    type,
    onBack,
    isLoading,
  } = props;

  const navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);

  const toggleSticky = () => {
    if (window.scrollY >= 60) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleSticky);
    return () => {
      window.removeEventListener("scroll", toggleSticky);
    };
  }, []);

  const handleBack = () => {
    onBack ? onBack() : navigate(-1);
  };

  return (
    <div className="w-100">
      {!hideHeader && (
        <div
          className={`mt-4 px-5 d-flex justify-content-between align-items-center viewcomponent-header ${
            isSticky && "sticky-component-header"
          }`}
        >
          <div>
            <div className="text-primary">
              <span
                className="d-flex align-items-center"
                style={{ cursor: "pointer", width: "fit-content" }}
                onClick={handleBack}
              >
                <ArrowLeft className="me-1" />
                Back
              </span>
            </div>
            <h2>{title}</h2>
          </div>
          {!hideBtns && (
            <div className="d-flex justify-content-between align-items-center">
              {type === "save" ? (
                <SaveButton handleClick={onSave} disabled={isSaveDisabled} />
              ) : (
                <>
                  <EditButton className="mx-2" handleClick={onEdit} />
                  {/* <DeleteButton 
                      handleClick={onDelete} 
                      disabled 
                  /> */}
                </>
              )}
            </div>
          )}
          {hideBtns && rightChildrens}
        </div>
      )}

      <div className="px-5 py-3">
        <Card className="w-100">
          {isLoading && (
            <Backdrop>
              <Loader />
            </Backdrop>
          )}
          <Card.Body className="m-3">{children}</Card.Body>
        </Card>
      </div>
    </div>
  );
};

ViewComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  hideBtns: PropTypes.bool,
  hideHeader: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  isSaveDisabled: PropTypes.bool,
  rightChildrens: PropTypes.element,
  title: PropTypes.string,
  type: PropTypes.string,
  onBack: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ViewComponent;
