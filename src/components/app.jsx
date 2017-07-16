import React from 'react';
import {connect} from 'react-redux';
import Auth from './auth';
import Navbar from './navbar/navbar_container';

class App extends React.Component {

  render() {
    let toRender = null;
    if (this.props.loggedIn) {
      toRender = (
        <div>
          <Navbar />
          <div className="main-box">
            <div className="three-col-left">
              {this.props.topicIndex}
            </div>
            <div className="three-col-center">
              {this.props.questionIndex}
            </div>
            <div className="three-col-right alert">
            </div>
          </div>
        </div>
      );
    } else {
      toRender = (<Auth />);
    }
    return (
      <div className="app-box">
        {toRender}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return (
    {
      loggedIn: state.session.currentUser ? true : false
    }
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {}
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
