import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactMarkdown from "react-markdown";
import * as deployment from "./deployment.json";

class DeployTool extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <form>
        <fieldset>
          <legend>Deployment</legend>
          <label for="domain">Domain</label>
          <button
            onClick={e => {
              this.check();
              e.preventDefault();
            }}
          >
            Check availability
          </button>
          <p id="checkresult">{this.state.checkResult}</p>
          <p id="suggestResult">{this.state.suggestResult}</p>
          <input type="text" id="domain" placeholder="example.com" />
          <label for="content">Content</label>
          <textarea
            cols="80"
            rows="4"
            id="content"
            placeholder="Your website goes here."
          />
          <label for="deployment-processor">Deployment Processor</label>
          <input
            type="text"
            id="deployment-processor"
            placeholder="http://localhost:3000"
            value="http://localhost:3000"
          />
        </fieldset>
        <input type="button" value="Button" />
        <input type="reset" value="Button" />
        <input type="submit" value="Button" />
        <a href="#" class="button">
          Link
        </a>
        <a href="#" role="button">
          Link
        </a>
        <label class="button">Label</label>
        <label role="button">Label</label>
      </form>
    );
  }
  check() {
    const data = {
      domain: document.getElementById("domain").value
    };
    fetch(document.getElementById("deployment-processor").value + "/check", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(checkResult => {
        console.log("checkResult", checkResult);
        this.setState({ checkResult: JSON.stringify(checkResult) });
        this.suggest();
      });
  }
  suggest() {
    const data = {
      domain: document.getElementById("domain").value
    };
    fetch(document.getElementById("deployment-processor").value + "/suggest", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(suggestResult => {
        console.log("suggestResult", suggestResult);
        this.setState({ suggestResult: JSON.stringify(suggestResult) });
      });
  }
}
class X extends React.Component {
  componentDidMount() {
    window.document.title = deployment.domain;
  }
  render() {
    return (
      <div>
        <ReactMarkdown source={deployment.content} />
        <DeployTool />
      </div>
    );
  }
}

ReactDOM.render(<X />, document.getElementById("root"));
