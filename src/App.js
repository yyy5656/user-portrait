import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
