import { useGetAllMyBetsByTokenQuery } from "../../features/api/apiSlice";
import { DotLoading, List, Result } from "antd-mobile";
import BetItem from "./BetItem";


export default function MyBets() {
  const { data, loading } = useGetAllMyBetsByTokenQuery();
  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  if (loading)
    return (
      <div className="text-center">
        <DotLoading />
      </div>
    );

  if (data?.data) {
    return (
      
      <Result
        status="info"      
        title="Your have not placed any bets yet"
        description={`start betting and win upto ${rupee.format(
          120000
        )} every 15 mins`}
      />
    );
  }

  return (
    <List header={"Bets that are placed by you"}>
      {data?.data?.map((bet) => {
        return <BetItem key={bet._id} {...bet} />;
      })}
    </List>
  );
}
