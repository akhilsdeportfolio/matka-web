/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import moment from "moment";
import { TbTicket } from "react-icons/tb";
import { formatMoney, getAmount } from "../../../../utils/money";
import ResultItem from "../../../Results/ResultItem";


export default function BetDetailsHeader({ createdAt, lines, status,...rest }) {
  
  const { drawId: drawData, winningsDivison } = rest;

  return (
    <>
    <List.Item
      className="border-b"
      arrow={<TbTicket />}      
      clickable={false}
    >
      <div className="p-2 text-xs border-bottom">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col">
            <div>
              <p className="font-bold py-2" style={{ color: "#999999" }}>
                Transaction Time
              </p>
              <p className="font-bold" style={{ fontSize: "10px" }}>
                {moment(createdAt).format("LLL")}
              </p>
            </div>
            <div>
              <p className="font-bold py-2" style={{ color: "#999999" }}>
                Draw Time
              </p>
              <p className="font-bold" style={{ fontSize: "10px" }}>
                {moment.unix(drawData.openDrawTime).format("LLL")}
              </p>
            </div>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              Stake
            </p>
            <p className="font-bold text-default">
              {formatMoney.format(getAmount(lines))}
            </p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              Status
            </p>
            <p className="text-default font-bold"> {status}</p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              Winnings
            </p>
            <p className="font-bold text-default">
              {" "}
              {formatMoney.format(getAmount(winningsDivison))}
            </p>
          </div>
        </div>
      </div>
    </List.Item>
    <div className="p-0">
    <p className="font-bold text-sm my-2 text-gray-400">Draw Result</p>
    <ResultItem game={drawData}  />
    </div>
    </>
  );
}
