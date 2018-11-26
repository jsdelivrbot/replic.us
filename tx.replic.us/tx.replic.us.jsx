import * as React from "react";
import * as ReactDOM from "react-dom";

class X extends React.Component {
  render() {
    return <div>Hello, world (transaction)</div>;
  }
}

ReactDOM.render(<X />, document.getElementById("root"));
