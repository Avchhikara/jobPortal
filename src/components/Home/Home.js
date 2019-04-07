import React from "react";
import Search from "./../Search/Search";
import Jobs from "./../Jobs/Jobs";
import FunctionalArea from "./../FArea/FArea";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showJobs: true
    };
  }

  toggleJobs = () => {
    this.setState({ showJobs: false });
    setTimeout(() => {
      this.setState({ showJobs: true });
    }, 1);
  };

  // console.log(props);
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.showJobs ? (
            <Search {...this.props} toggleJobs={this.toggleJobs} />
          ) : (
            ""
          )}
          <FunctionalArea {...this.props} toggleJobs={this.toggleJobs} />
          {this.state.showJobs ? <Jobs {...this.props} /> : ""}
        </div>
      </div>
    );
  }
}

export default Home;
