import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingsPrivacy from "./SettingsPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
    Cookies.set("user", "");
  };

  const [visible, setVisible] = useState(0);
  return (
    <div className="menu">
      {visible === 0 && (
        <div>
          <div className="menu_box">
            <Link to="/profile" className="menu_header hover3">
              <img src={user?.picture} alt="" />
              <span>
                {user?.first_name}
                {user?.last_name}
              </span>
            </Link>
            <div className="menu_box_splitter"></div>
            <div className="see_profiles hover3">
              <span>See all profiles</span>
            </div>
          </div>
          {/* Settings and privacy */}
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & Privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* help and support */}
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* Display and accessibility */}
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* give feedback */}
          <div className="menu_item hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <span>Give feedback</span>
          </div>
          {/* Log out */}
          <div
            className="menu_item hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Log Out</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
