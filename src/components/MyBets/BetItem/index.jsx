import { List } from "antd-mobile";
import moment from "moment";
import React from "react";
import { TbCoinRupee, TbTicket } from "react-icons/tb";
import { getAmount } from "../../../utils/money";
import { useNavigate } from "react-router-dom";

export default function BetItem({ _id, createdAt, lines, ...rest }) {

  const navigate=useNavigate();
  
  const { drawId: drawData,winningsDivison} = rest;  
  let rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
});
  
  return (
    <List.Item clickable className="shadow-md" prefix={<TbTicket color="#4338CA" size={32}/>} onClick={()=>{
        navigate(`/bet-details/${_id}`);
    }}>
      <div className="p-2 text-xs ">
        
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div>
              <p className="font-bold py-2" style={{color:'#999999'}}>Transaction Time</p>
              <p className="font-bold text-default">{moment(createdAt).format("LLL")}</p>
            </div>
            <div>
              <p className="font-bold py-2" style={{color:'#999999'}}>Draw Time</p>
              <p className="font-bold text-default text-xs">{moment.unix(drawData.openDrawTime).format("LLL")}</p>
            </div>
          </div>
          <div>
            <p className="font-bold py-2" style={{color:'#999999'}}>Stake</p>
            <p className="font-bold text-default"> {rupee.format(getAmount(lines))}</p>
          </div>
          <div>
            <p className="font-bold py-2" style={{color:'#999999'}}>Winnings</p>
            <p className="font-bold text-default"> {rupee.format(getAmount(winningsDivison))}</p>
          </div>
        </div>        
      </div>
    </List.Item>
  );
}
