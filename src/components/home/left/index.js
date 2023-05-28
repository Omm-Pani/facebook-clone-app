import LeftLink from "./LeftLink";
import "./styles.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import ArrowDown1 from "../../../svg/arrowDow1";
import { useState } from "react";
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((item, i) => (
        <LeftLink
          img={item.img}
          text={item.text}
          notification={item.notification}
          key={i}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}

      {visible && (
        <div className="more_left ">
          {left.slice(8, left.length).map((item, i) => (
            <LeftLink
              img={item.img}
              text={item.text}
              notification={item.notification}
              key={i}
            />
          ))}
          <div
            className="left_link hover2"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate180">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>
        <span>. </span>
        <Link to="/">Cookies </Link> <span>. </span>
        <Link to="/">More </Link>
        <span>. </span>
        Meta © 2023
      </div>
    </div>
  );
}
