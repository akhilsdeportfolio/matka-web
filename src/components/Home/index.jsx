/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { AddCircleOutline } from "antd-mobile-icons";
import { addBetline,addBetLines} from "../../features/betlines";
import {  Dropdown, Radio, Space } from "antd-mobile";
import axios from "axios";
import { userFound } from "../../features/users";
import {
  useGetAllGamesQuery,
} from "../../features/api/apiSlice";
import { useAuth } from "../../context/Auth/AuthContext";
import Betline from "../BetLine";
import shortid from "shortid";
import { apiUrl, linesKey } from "../../const";
import "./styles.css";
import BottomBar from "../BottomBar";
import { useNavigate } from "react-router-dom";
import { analytics, auth } from "../../clientFirebase";
import { logEvent } from "firebase/analytics";
import { getAmount } from "../../utils/money";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const lines = useSelector((store) => store.lines);
  const userObject = useSelector((store) => store.user);
  const [value, setValue] = useState("");
  const ref = useRef();
  const navigate=useNavigate();
  
  

  

  useEffect(()=>{    
    if(localStorage.getItem(linesKey))
      dispatch(addBetLines({lines:JSON.parse(localStorage.getItem(linesKey))}))
  },[])


  useEffect(()=>{
    if(lines.length)
    localStorage.setItem(linesKey,JSON.stringify(lines));
  },[lines]);
  



  


  function updateSelected(value) {
    switch (value) {
      case "ank":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            ank: [""],
            drawType: "open",
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "jodi":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            jodi: [''],
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "single-panna":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            numbers: [],
            drawType: "open",
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "double-panna":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            numbers: [],
            drawType: "open",
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "triple-panna":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            numbers: [],
            drawType: "open",
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "half-sangam":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            numbers:[],
            drawType: "",
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "full-sangam":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            openNumbers: [],            
            closeNumbers:[],
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
    }
  }


   function handlePickDraw()
   {
      logEvent(analytics,"add_to_cart",{amount:getAmount(lines),totalBets:lines?.length})
      navigate('/select-game')
   }  

   function handleQuickDraw()
   {
      // get the next avialable game and place the bet 
      
   }

  



  return (
    <div style={{ padding: 0}}>
      {/*   <p>{ userObject.balance || userObject?.serverData?.userData?.balance/100}</p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Dropdown
          arrow={
            <AddCircleOutline
              fontSize={16}
              style={{ color: "var(--adm-color-primary)" }}
            />
          }
          ref={ref}
        >
          <Dropdown.Item key="text" title="Add Bets" highlight>
            <div style={{ padding: 12, display: "flex" }}>
              <Radio.Group
                value={value}
                onChange={(value) => {
                  setValue(value.toString());                
                  ref.current.close();
                  updateSelected(value);
                  setValue("");
                }}
              >
                <Space
                  direction="vertical"
                  block
                  style={{ fontWeight: "bold" }}
                >
                  <Radio block value="ank">
                    Ank
                  </Radio>
                  <Radio block value="jodi">
                    Jodi
                  </Radio>
                  <Radio block value="single-panna">
                    Single Panna
                  </Radio>
                  <Radio block value="double-panna">
                    Double Panna
                  </Radio>
                  <Radio block value="triple-panna">
                    Triple Panna
                  </Radio>
                  <Radio block value="half-sangam">
                    Half Sangam
                  </Radio>
                  <Radio block value="full-sangam">
                    Full Sangam
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        {lines.map((el, index) => {          
          return (
            <Betline
              key={index}
              name={el.name}
              index={index}
              id={el?.id}
              drawType={el?.drawType}
              stake={el?.stake}
              ank={el?.ank}
              jodi={el?.jodi}              
              numbers={el?.numbers}
              openNumbers={el?.openNumbers}
              closeNumbers={el?.closeNumbers}
              isValid={el?.isValid}
            />
          );
        })}
      </div>

      {/*   {playableGames?.games?.map((game,index) => {
        return (
          <div key={index}>
            <h1>              
              {game.productId}
              {game.productName}
            </h1>
          </div>
        );
      })} */}
      <BottomBar        
        primary={handlePickDraw}
        secondary={handleQuickDraw}
        isLoading={loading}
        primaryText="Pick Draw"
        secondaryText="Quick Draw"
      />
    </div>
  );
}
