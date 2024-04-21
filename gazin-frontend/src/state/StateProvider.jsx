import ApplicationState from "./ApplicationState";
import React, { useState } from "react";

function StateProvider({ children }) {
  const [developers, setDevelopers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState([]);
  const [developer, setDeveloper] = useState([]);

  const contextValue = {
    developers,
    setDevelopers,
    levels,
    setLevels,
    level,
    setLevel,
    developer,
    setDeveloper,
  };

  return (
    <ApplicationState.Provider value={contextValue}>
      {children}
    </ApplicationState.Provider>
  );
}

export default StateProvider;
