import React from "react";
import { Button as RBButton, Spinner } from "react-bootstrap";
import {
  CaretRight,
  Check2,
  Plus,
  Trash,
  X as CancelIcon,
} from "react-bootstrap-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./style.css";

const buttonIcon = (type, props) => {
  switch (type) {
    case "save":
      return <Check2 {...props} />;

    case "submit":
      return <Check2 {...props} />;

    case "next":
      return <CaretRight {...props} />;

    case "close":
      return <CancelIcon {...props} />;

    case "delete":
      return <Trash {...props} />;

    case "create":
      return <Plus {...props} />;

    default:
      return null;
  }
};

const Button = ({
  isLoading,
  iconType,
  disabled,
  iconPosition,
  className,
  children,
  ...props
}) => {
  const buttonClasses = classNames(
    "d-flex justify-content-center align-items-center button-container",
    {
      "flex-row-reverse": iconPosition === "end",
    },
    className
  );

  return (
    <RBButton
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : buttonIcon(iconType)}
      {children}
    </RBButton>
  );
};

Button.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  iconType: PropTypes.oneOf([
    "save",
    "submit",
    "next",
    "close",
    "delete",
    "create",
  ]),
  iconPosition: PropTypes.oneOf(["start", "end"]),
  className: PropTypes.string,
};

export default React.memo(Button);
