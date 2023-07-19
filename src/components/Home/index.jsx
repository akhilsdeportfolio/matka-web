/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCircleOutline } from "antd-mobile-icons";
import { addBetline, addBetLines } from "../../features/betlines";
import { Dropdown, Radio, ResultPage, Space } from "antd-mobile";
import Betline from "../BetLine";
import shortid from "shortid";
import { linesKey } from "../../const";
import "./styles.css";
import BottomBar from "../BottomBar";
import { useNavigate } from "react-router-dom";
import { analytics } from "../../clientFirebase";
import { logEvent } from "firebase/analytics";
import { formatMoney, getAmount } from "../../utils/money";
import { GiftOutline } from "antd-mobile-icons";
import { winnings } from "../GameDescription";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const lines = useSelector((store) => store.lines);
  const [value, setValue] = useState("");
  const ref = useRef();
  const navigate = useNavigate();

  const details = winnings.map(function (el) {
    if (el.name !== "Rate Card") {
      return {
        label: el.name.toUpperCase(),
        value: String(el.factor) + " X",
      };
    } else {
      return {
        label: el.name.toUpperCase(),
        value: String(el.factor),
      };
    }
  });

  useEffect(() => {
    if (localStorage.getItem(linesKey))
      dispatch(
        addBetLines({ lines: JSON.parse(localStorage.getItem(linesKey)) })
      );
  }, []);

  useEffect(() => {
    localStorage.setItem(linesKey, JSON.stringify(lines));
  }, [lines]);

  function updateSelected(value) {
    switch (value) {
      case "ank":
        dispatch(
          addBetline({
            name: value,
            stake: 20,
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
            stake: 20,
            jodi: [""],
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
      case "single-panna":
        dispatch(
          addBetline({
            name: value,
            stake: 20,
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
            stake: 20,
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
            stake: 20,
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
            stake: 20,
            numbers: [],
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
            stake: 20,
            openNumbers: [],
            closeNumbers: [],
            id: shortid.generate(),
            isValid: false,
          })
        );
        break;
    }
  }

  function handlePickDraw() {
    logEvent(analytics, "add_to_cart", {
      amount: getAmount(lines),
      totalBets: lines?.length,
    });
    navigate("/select-game");
  }

  function handleQuickDraw() {
    // get the next avialable game and place the bet

    dispatch(addBetLines({ lines: [] }));
  }

  return (
    <div style={{ padding: 0 }}>
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
            <div
              className="text-right"
              style={{ padding: 12, display: "flex" }}
            >
              <Radio.Group
                value={value}
                onChange={(value) => {
                  setValue(value.toString());
                  ref.current.close();
                  updateSelected(value);
                  setValue("");
                }}
              >
                <Space direction="vertical" block>
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

      {lines.length === 0 && (
        <ResultPage
          details={details}
          icon={<GiftOutline />}
          status="success"
          title={`Play now and win ${formatMoney.format(100000)}`}
          description={`Guess numbers and win upto ${formatMoney.format(
            100000
          )} every hour`}
          primaryButtonText="Play Jodi"
          secondaryButtonText="Play Ank"
          onPrimaryButtonClick={() => {
            updateSelected("jodi");
          }}
          onSecondaryButtonClick={() => {
            updateSelected("ank");
          }}
        />
      )}
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
      <BottomBar
        primary={handlePickDraw}
        secondary={handleQuickDraw}
        isLoading={loading}
        primaryText="Pick Draw"
        /* secondaryText="Quick Draw" */
      />
    </div>
  );
}
