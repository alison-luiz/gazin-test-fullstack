import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import StateProvider from "./state/StateProvider";
import Home from "./views/Home";
import Developers from "./views/developers/Developers";
import CreateLevels from "./views/levels/CreateLevels";
import UpdateDevelopers from "./views/developers/UpdateDevelopers";
import UpdateLevels from "./views/levels/UpdateLevels";
import CreateDevelopers from "./views/developers/CreateDeveloper";
import Levels from "./views/levels/Levels";
import Layout from "./components/Layout";

function App() {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () => {
    setColorScheme((currentScheme) =>
      currentScheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <div>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <StateProvider>
            <Routes>
              <Route
                path="/"
                element={<Layout toggleColorScheme={toggleColorScheme} />}
              >
                <Route index element={<Home />} />
                <Route path="developers" element={<Developers />} />
                <Route
                  path="developers/create"
                  element={<CreateDevelopers />}
                />
                <Route
                  path="developers/update/:id"
                  element={<UpdateDevelopers />}
                />
                <Route path="levels" element={<Levels />} />
                <Route path="levels/create" element={<CreateLevels />} />
                <Route path="levels/update/:id" element={<UpdateLevels />} />
              </Route>
            </Routes>
          </StateProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
