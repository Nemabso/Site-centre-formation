import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./Components/Welcome";
import Navigation from "./Components/Navigation";
import TrainerSpace from "./Components/TrainerSpace";
import Registering from "./Components/Registering";
import Listformations from "./Components/Listformations";
import AddFormation from "./Components/AddFormation";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/espace-formateur" component={TrainerSpace} />
        <Route exact path="/inscription" component={Registering} />
        <Route exact path="/listformations" component={Listformations} />
        <Route exact path="/addformation" component={AddFormation} />
        
      </Switch>
    </div>
  );
}

export default App;
