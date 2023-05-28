import { useMediaQuery } from "react-responsive";

export default function GenderSelect({ genderError, handleRegister }) {
  const view1 = useMediaQuery({
    query: "(min-width:539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1100px)",
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0px"}` }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegister}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegister}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleRegister}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3
              ? "input_error_message"
              : "input_error_message input_error_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
