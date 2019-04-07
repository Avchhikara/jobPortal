import React from "react";

import "./FArea.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

class FAreaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div className="functional-area__list">
        <div
          className="functional-area__list-item clearfix"
          onClick={this.toggle}
        >
          <span className=" float-left">
            {this.props.name ? this.props.name : "Not Available"}
          </span>
          <span className="float-right">
            <FontAwesomeIcon
              icon={this.state.open ? faChevronUp : faChevronDown}
            />
          </span>
        </div>
        {this.state.open ? (
          <ul className="functional-area__list-open">
            {this.props.sub.map((sname, index) => {
              return (
                <li
                  className="functional-area__list-open__item"
                  key={index}
                  onClick={() => {
                    this.props.history.push(
                      `/?rdf=${sname.name}&location=&salary=&experience=`
                    );
                    this.props.toggleJobs();
                    // console.log(this.props);
                  }}
                >
                  {sname.name}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FAreaItem;
