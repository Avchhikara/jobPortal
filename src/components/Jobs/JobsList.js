import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLandmark,
  faSuitcase,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";

// const renderHTML = (id, desc) => {
//   const ele = document.querySelector(`#${id}`);
//   ele.innerHTML = desc;
//   //   console.log(ele);
// };

const JobsList = props => {
  // console.log(props);
  const posted = new Date(props.job.createdAt).getTime();
  const today = new Date().getTime();
  const diff = today - posted;
  return (
    <Card body className="jobs-list">
      <CardTitle>{props.job.job_title}</CardTitle>
      <CardSubtitle className="text-muted jobs-list__sub">
        <span className="jobs-list__experience">
          <FontAwesomeIcon icon={faSuitcase} /> {props.job.min_experience} -{" "}
          {props.job.max_experience} years
        </span>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <span className="jobs-list__work">
          {"  "}
          <FontAwesomeIcon icon={faLandmark} /> {props.job.job_location}
        </span>
      </CardSubtitle>
      <CardText className="text-glow-down row">
        <span className="card-text__key-area col-3">Key Area:</span>
        <span className="col-9">{props.job.functional_area}</span>
        <span className="card-text__desc col-3">Description :</span>
        <span className="col-9" id={`desc${props.id}`}>
          {//       setTimeout(() => {
          //     renderHTML(
          //       `desc${props.id}`,
          //       props.job.job_description.substring(0, 10000)
          //     );
          //   }, 10)
          props.job.job_description.substring(0, 350)}
        </span>
      </CardText>
      <hr />
      <div className="clearfix text-muted jobs-list__footer">
        <span className="float-left">
          ₹ {props.job.min_salary} - {props.job.max_salary} LPA
        </span>
        <span className="float-right">
          <FontAwesomeIcon icon={faCalendarAlt} /> Posted:{" "}
          {Math.floor(diff / 86400000)} days ago
        </span>
      </div>
    </Card>
  );
};

export default JobsList;
