class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: [],
      un_done: []
    }
    this.hadleSubmit = this.hadleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.moveToUndone = this.moveToUndone.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
  }

  hadleSubmit(text) {
    var udoneList = this.state.un_done;
    udoneList.push(text);
    this.setState({
      un_done: udoneList
    });
  }

  deleteListItem(currentTask) {
    var idx = this.state.un_done.indexOf(currentTask);
    this.state.un_done.splice(idx, 1);
    this.setState({
      un_done: this.state.un_done
    })
  }

  removeItem(currentTask) {

    this.state.done.push(currentTask);
    var idx = this.state.un_done.indexOf(currentTask);
    this.state.un_done.splice(idx, 1);

    this.setState({
      un_done: this.state.un_done,
      done: this.state.done
    })
  }

  moveToUndone(currentTask) {
    var idx = this.state.done.indexOf(currentTask);
    this.state.done.splice(idx, 1);
    this.state.un_done.push(currentTask);
    this.setState({
      un_done: this.state.un_done,
      done: this.state.done
    })

  }

  render() {
    return (
      <div id="app">
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <a className="navbar-brand mr-auto mr-lg-0" id="app-name" href="#">My ToDo list</a>
          <img src="../todo/images/logo.png" />
        </nav>
        <Input handleclick={this.hadleSubmit}></Input>
        <OpenTasks tasks={this.state.un_done} handlemark={this.removeItem} deleteListItem={this.deleteListItem}></OpenTasks>
        <DoneTasks tasks={this.state.done} moveToUndone={this.moveToUndone}></DoneTasks>
      </div>
    );
  }
}


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    var text = this.textInput.value;

    if (text === "") {
      return;
    }

    else {
      this.props.handleclick(text);
      this.textInput.value = "";
      this.setState({
        textInput: this.textInput
      });
    }
  }

  render() {
    return (
      <div className="container d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" id="input-bar">
        <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">

          <form className="form-inline my-2 my-lg-0">
            <input ref={(text) => this.textInput = text} className="form-control mr-sm-2" id="input_field" type="text" placeholder="Add a to-do..." aria-label="Search" />
            <button id="add-btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.submit}>Add</button>
          </form>
        </div>
      </div>
    );
  }
}

class OpenTasks extends React.Component {
  constructor(props) {
    super(props);
    this.markV = this.markV.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      activities: this.props.tasks
    }
  }

  deleteItem(currentTask) {
    this.props.deleteListItem(currentTask);
  }

  markV(currentTask) {
    this.props.handlemark(currentTask)
  }

  render() {
    return (
      <div className="container my-3 p-3 bg-white rounded shadow-sm">
        <h5 className="border-bottom border-gray pb-2 mb-0">Open Tasks</h5>

        {this.state.activities.map((activity, i) => <Activity canDelete="x" itemIndex={i} key={i} text={activity} icon="../todo/images/boxUnchecked.png" handlecheck={this.markV} deleteTask={this.deleteItem}></Activity>)}

      </div>
    );
  }
}


class DoneTasks extends React.Component {
  constructor(props) {
    super(props);
    this.markV = this.markV.bind(this)
    this.state = {
      activities: this.props.tasks
    }
  }

  markV(currentTask) {
    this.props.moveToUndone(currentTask)
  }

  render() {
    return (
      <div className="container my-3 p-3 bg-white rounded shadow-sm">
        <h5 className="border-bottom border-gray pb-2 mb-0">Completed Tasks</h5>
        {this.state.activities.map((activity, i) => <Activity canDelete="" key={i} icon="../todo/images/boxChecked.png" text={activity} handlecheck={this.markV}></Activity>)}
      </div>
    );
  }
}


class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.markDone = this.markDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  markDone(e) {
    var currentTask = e.target.id;
    this.props.handlecheck(currentTask);
  }

  deleteTask(e) {
    var currentTask = e.target.id;
    this.props.deleteTask(currentTask);
  }

  render() {
    return (
      <div className="media text-muted pt-3 activity" >
        <img src={this.props.icon} alt="" className="checkbox mr-2 rounded" id={this.props.text} onClick={this.markDone} />
        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">{this.props.text}</p>
        <a href="#" id={this.props.text} onClick={this.deleteTask}>{this.props.canDelete}</a>
      </div>
    );
  }
}


function render() {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
}


render();
