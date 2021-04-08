import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu} from "antd";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <>
      <nav className="menuBar">
        <div className="logo"></div>
        <div className="menuCon">
          <div className="leftMenu">
            <Menu mode="horizontal" >
              <Menu.Item key="search">
                <a href="/search">Поиск</a>
              </Menu.Item>
              <Menu.Item key="favourite">
                <a href="/favourites">Избранное</a>
              </Menu.Item>

              <Menu.Item key="logout">
                <a href="/" onClick={logoutHandler}>Выйти</a>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </nav>
    </>
  );
};
