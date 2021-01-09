import './App.css';

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CommonConfig } from "./config/Common";
import { Pages } from "./config/Pages";
import { TitleBar, Drawer } from "./components/Drawer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";

function App() {

  // by default we keep our menu closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  // but we can toggle it
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  // or close it (or keep it close)
  const closeDrawer = () => {
    setDrawerOpen(false);
  }

  // here we list links in the menu
  const menuContent = [
    { path: CommonConfig.path, name: "Home" },
  ];

  // and add all pages (product categories) to the menu
  const productPages = [];
  for (let i = 0; i < Pages.length; i++) {
    let page = { path: CommonConfig.path + Pages[i], name: Pages[i] };
    menuContent.push(page);
    productPages.push(page);
  }


  return (
    <div className="App">
      <TitleBar title={CommonConfig.title}
        toggleMethod={toggleDrawer}
        closeMethod={closeDrawer}
        menuText="Menu"
        menuOpen={drawerOpen} />
      <Router>
        <Drawer open={drawerOpen} menu={menuContent} />
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route exact path={CommonConfig.path}><Home /></Route>
            {
              productPages.map((item) =>
                <Route key={item.name} path={item.path}><ProductList category={item.name} /></Route>
              )
            }
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
