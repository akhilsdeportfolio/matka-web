import { useGetAllMyBetsByTokenQuery } from "../../features/api/apiSlice";
import {  List, Result } from "antd-mobile";
import BetItem from "./BetItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addBets } from "../../features/bets";

export default function MyBets() {
  const { data = { data: [] }, } = useGetAllMyBetsByTokenQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.data.length) dispatch(addBets(data.data));
  }, [data]);

  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  

  if (data?.data.length === 0) {
    return (
      <Result
        status="info"
        title="Your have not placed any bets yet"
        description={`start playing  and win upto ${rupee.format(
          100000
        )} every 15 mins`}
      />
    );
  }

  return (
    <List mode="card" className="list">
      {data?.data?.map((bet) => {
        return <BetItem key={bet._id} {...bet} />;
      })}
    </List>
  );
}
