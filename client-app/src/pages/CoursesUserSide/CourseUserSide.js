import React from "react";
import PropTypes from "prop-types";

function CourseUserSide({ title }) {
  return (
    <div className="course d-flex">
      <h3>{title}</h3>
    </div>
  );
}

CourseUserSide.propTypes = {
  title: PropTypes.string.isRequired,
};
export default CourseUserSide;
