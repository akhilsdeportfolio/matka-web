/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import moment from "moment";
import { TbTicket } from "react-icons/tb";
import { formatMoney, formatMoneyWithDecimals, getAmount } from "../../../../utils/money";
import ResultItem from "../../../Results/ResultItem";
import { useTranslation } from "react-i18next";


export default function BetDetailsHeader({ createdAt, lines, status,...rest }) {
  
  const { drawId: drawData, winningsDivison } = rest;
  const {t}=useTranslation();

  return (
    <>
    <List.Item
      className="border-b"
      arrow={null}
      clickable={false}
    >
      <div className="p-2 text-xs border-bottom">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col">
            <div>
              <p className="font-bold py-2" style={{ color: "#999999" }}>
                {t('transactionTime')}
              </p>
              <p className="font-bold" style={{ fontSize: "10px" }}>
                {moment(createdAt).format("LLL")}
              </p>
            </div>
            <div>
              <p className="font-bold py-2" style={{ color: "#999999" }}>
                {t('drawTime')}
              </p>
              <p className="font-bold" style={{ fontSize: "10px" }}>
                {moment.unix(drawData.openDrawTime).format("LLL")}
              </p>
            </div>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              {t('stake')}
            </p>
            <p className="font-bold text-default" >
              {formatMoneyWithDecimals.format(getAmount(lines))}
            </p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              {t('status')}
            </p>
            <p className="text-default font-bold" > {status}</p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
              {t('winnings')}
            </p>
            <p className="font-bold text-default" >              
              {formatMoneyWithDecimals.format(getAmount(winningsDivison))}
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
