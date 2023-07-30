/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import moment from "moment";
import { formatMoneyWithDecimals, getAmount } from "../../../utils/money";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BetItem({ _id, createdAt, lines, status, ...rest }) {
  const navigate = useNavigate();
  const {t}=useTranslation();

  const { drawId: drawData, winningsDivison } = rest;

  return (
    <List.Item
      className="border-b"      
      clickable
      arrow={null}
      onClick={() => {
        navigate(`/bet-details/${_id}`);
      }}
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
            <p className="font-bold text-default">
              {formatMoneyWithDecimals.format(getAmount(lines))}
            </p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
            {t('status')}
            </p>
            <p className="text-default font-bold"> {status}</p>
          </div>
          <div>
            <p className="font-bold py-2" style={{ color: "#999999" }}>
            {t('winnings')}
            </p>
            <p className="font-bold text-default">
              {" "}
              {formatMoneyWithDecimals.format(getAmount(winningsDivison))}
            </p>
          </div>
        </div>
      </div>
    </List.Item>
  );
}
