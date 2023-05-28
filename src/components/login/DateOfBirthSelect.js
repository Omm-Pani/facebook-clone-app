import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  years,
  days,
  months,
  dateError,
  handleRegister,
}) {
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
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0px"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleRegister}>
        {days.map((day, i) => (
          <option key={i} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegister}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegister}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
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
          {dateError}
        </div>
      )}
    </div>
  );
}
