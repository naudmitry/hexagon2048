import {connect} from "react-redux";
import App from "../App";
import {sendRequest, setRadius, setServer} from "../actions/RngServerActions";

function mapStateToProps(state) {
  let web = state.web;

  return {
    rngServer: web.rngServer,
    radius: web.radius,
    hexs: web.hexs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetHexs: (url, radius, data = {}) => dispatch(sendRequest(url, radius, data)),
    onSetServer: (value) => dispatch(setServer(value)),
    onSetRadius: (value) => dispatch(setRadius(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);