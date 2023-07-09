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
  useGetUserDataByIdQuery,
} from "../../features/api/apiSlice";
import { useAuth } from "../../context/Auth/AuthContext";
import Betline from "../BetLine";
import shortid from "shortid";
import { apiUrl } from "../../const";
import "./styles.css";
import BottomBar from "../BottomBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const lines = useSelector((store) => store.lines);
  const userObject = useSelector((store) => store.user);
  const [value, setValue] = useState("");
  const ref = useRef();
  const navigate=useNavigate();

  const { logOut } = useAuth();
  const { data } = useGetAllGamesQuery();

  const { data: userAccountData, isLoading } = useGetUserDataByIdQuery(
    userObject.uid
  );
  

  useEffect(() => {
    if (!isLoading) {
      dispatch(userFound({ ...userObject, serverData: userAccountData }));
    }
  }, [isLoading]);

  useEffect(()=>{
      if(localStorage.getItem("betlines"))
      {
        const data=localStorage.getItem("betlines");
        console.log("Data",data)
        dispatch(addBetLines({lines:JSON.parse(data)}))
      }
  },[])


  useEffect(()=>{
    if(lines.length)
      localStorage.setItem("betlines",JSON.stringify(lines));
  },[lines]);



  function updateSelected(value) {
    switch (value) {
      case "ank":
        dispatch(
          addBetline({
            name: value,
            stake: 100,
            ank: [""],
            drawType: "both",
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
            drawType: "both",
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
            drawType: "both",
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
            drawType: "both",
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
            drawType: "both",
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

  async function handlePayment() {
    setLoading(true);

  
    try {
      const config = {
        headers: {
          token: userObject.accessToken,
        },
      };

      const resp = await axios.post(
        apiUrl + "/payments/init",
        { amount: lines.reduce((ac, el) => ac + Number(el.stake), 0) * 100 },
        config
      );

      var options = {
        key: "rzp_test_WAL4lJiNcSdqGK", // Enter the Key ID generated from the Dashboard
        amount: resp.data.data.paymentInfo.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        order_id: resp.data.data.paymentInfo.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          setLoading(false);
          const onUpdated = await axios.post(
            apiUrl +
              `/payments/onSuccesfulTransaction/${resp.data.data._id}/${userObject.uid}`,
            { ...response }
          );

          dispatch(
            userFound({
              ...userObject,
              balance: Math.floor(
                onUpdated.data?.updatedUserData.balance / 100
              ),
            })
          );
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "gold",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log("failed", response);
        setLoading(false);
      });

      rzp1.open();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  const user = useSelector((store) => store.user);
  return (
    <div style={{ padding: 0, minHeight: "80%" }}>
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
              fontSize={24}
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
              id={el.id}
              drawType={el.drawType}
              stake={el.stake}
              ank={el.ank}
              jodi={el?.jodi}              
              numbers={el?.numbers}
              openNumbers={el?.openNumbers}
              closeNumbers={el?.closeNumbers}
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
        primary={handlePayment}
        secondary={handlePayment}
        isLoading={loading}
      />
    </div>
  );
}
