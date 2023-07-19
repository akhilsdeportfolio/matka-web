import { List } from "antd-mobile";
import LinesListItem from "./LinesListItem";

export default function LinesList({ lines, winnings }) {
  if (!lines) return null;

  return (
    <div >
    <List mode="card">
      {lines.map((el, index) => (
        <LinesListItem
          winnings={winnings}
          key={index}
          serialNo={index + 1}
          {...el}
        />
      ))}
    </List>
    </div>
  );
}
