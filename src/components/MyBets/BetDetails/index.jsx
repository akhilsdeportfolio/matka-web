import {  NavBar } from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BetItem from "../BetItem";
import BetDetailsHeader from "./BetDetailsHeader";
import LinesList from "../../LinesList";

export default function BetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { data, loading } = useGetBetDetailsByIdQuery(id);
  const bets = useSelector(store=>store.bets);
  const betDetails = bets.find((el)=>el._id===id);  
  
  return (
    <div >
      <NavBar
        className="bg-emerald-500 text-white"
        onBack={() => {
          navigate(-1);
        }}
      >
      Bet Details
        
      </NavBar>      
      <div className="p-2 overflow-auto">
        {/* <p className="text-sm font-bold text-gray-300">Bet Id </p>        
        <p className="text-xs font-bold text-gray-300">{betDetails._id}</p>         */}
        <BetDetailsHeader {...betDetails}/>       

        <p className="font-bold text-gray-400 mt-2 text-sm">Bet Lines</p>
        <div style={{overflow:'hidden',overflowY:'scroll',maxHeight:'70vh'}}>
        <LinesList lines={betDetails.lines} winnings={betDetails.winningsDivison}/>
        </div> 
      </div>
    </div>
  );
}
