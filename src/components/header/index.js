import "./styles.css";
import { Link } from "react-router-dom";
import {
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import ClickOutside from "../../helpers/ClickOutside";
import UserMenu from "./userMenu";

export default function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenu = useRef(null);
  const usermenu = useRef(null);
  ClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  ClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <div ref={allMenu}>
          <div
            className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">4</div>
        </div>

        <div className="profile" ref={usermenu}>
          <div
            className="profile_link hover1"
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <img src={user?.picture} alt="" />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
