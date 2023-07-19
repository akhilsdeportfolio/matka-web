import { List } from "antd-mobile";
import React from "react";
import { formatMoney, getAmount } from "../../../utils/money";

export default function LinesListItem(props) {
  const { name, id, serialNo, stake, winnings } = props;

  function getNumbers() {
    switch (name) {
      case "ank":
        return props[name];
      case "jodi":
        return props[name].join("");
      case "single-panna":
        return props["numbers"].join("");
      case "double-panna":
        return props["numbers"].join("");
      case "triple-panna":
        return props["numbers"].join("");
      case "half-sangam":
        return props["numbers"].join("");
      case "full-sangam":
        return (
          props["openNumbers"].join("") + "," + props["closeNumbers"].join("")
        );
      default:
        return "n/a";
    }
  }

  return (
    <List.Item clickable arrow={false}>
      <div className="flex flex-row gap-1 justify-between p-2">
        <div>
          <p className="text-2xl font-bold  text-gray-300">{serialNo}</p>
        </div>
        <div>
          <div className="flex flex-col">
            <div>
              <p className="text-xs  text-black font-bold">
                {String(name).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs  text-gray-400">Your Number's</p>
            </div>
            <div>
              <p className="text-xs  text-gray-400">[{getNumbers()}]</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xs font-bold  text-black">Stake</p>
          </div>
          <div>
            <p className="text-xs  text-gray-400">
              {formatMoney.format(stake)}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xs  text-black font-bold">Winnings</p>
          </div>
          <div>
            <p className="text-xs  text-gray-400">
              {formatMoney.format(getAmount(winnings))}
            </p>
          </div>
        </div>
      </div>
    </List.Item>
  );
}
