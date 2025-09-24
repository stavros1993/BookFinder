import React from "react";
import CloseIcon from "../icons/CloseIcon";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="btn-delete" onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export default DeleteButton;
