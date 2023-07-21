/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import { formatMoney } from "../../../utils/money";
import moment from "moment/moment";
import { ClockCircleOutline, BankcardOutline } from "antd-mobile-icons";

export default function TransactionListItem(props) {
  const { phonePe = null, amount, type, status, createdAt, _id } = props;

  return (
    <>
      <List.Item clickable onClick={() => {}}>
        <div className="flex flex-row justify-between items-center py-3">
          <div className="flex flex-col items-start">
            <div>
            <p className="text-sm font-bold text-black text-start">
                {type?.toUpperCase()}
              </p>
              <p className="text-gray-400" style={{fontSize:'10px'}}>TID : &nbsp;{_id}</p>              
            </div>
            <div className="flex flex-row items-center">
              {phonePe && (
                <>
                  <BankcardOutline fontSize={12} /> &nbsp;
                  <p className="text-xs  text-gray-400">
                    {phonePe?.paymentInstrument?.type}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-row items-center">
              <ClockCircleOutline fontSize={12} /> &nbsp;
              <p className="text-xs  text-gray-400">
                {moment(createdAt).format("LLL")}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>
              <p
                className={`text-default ${
                  type === "deposit" ? "text-green-700" : "text-red-500"
                }`}
              >
                {type === "deposit" ? "+" : "-"}{" "}
                {formatMoney.format(amount / 100)}
              </p>
            </div>
            <div>
              <p className={`text-xs  text-red-500`}>
                {status === "success" ? null : status}
              </p>
            </div>
          </div>
        </div>
      </List.Item>
    </>
  );
}
