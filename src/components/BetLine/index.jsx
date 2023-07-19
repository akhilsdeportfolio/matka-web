/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import {
  Card,
  Divider,
  NoticeBar,
  PasscodeInput,
  Selector,
  Space,
  Stepper,
} from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { Label } from "../Label";
import { useDispatch } from "react-redux";
import {
  removeBetLine,
  updateDrawType,
  updateStake,
  updateValue,
  validate,
} from "../../features/betlines";
import { CloseOutline, ExclamationCircleOutline } from "antd-mobile-icons";
import GameDescription from "../GameDescription";
import { formatMoney } from "../../utils/money";

export default function Betline(props) {
  const { name, stake, drawType, id, isValid } = props;
  const [type, setDrawType] = useState(drawType);
  const dispatch = useDispatch();
  const [length, setLength] = useState(1);
  const ref = useRef();
  const openRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    switch (name) {
      case "ank":
        setLength(1);
        break;
      case "jodi":
        setLength(2);
        break;
      case "single-panna":
        setLength(3);
        break;
      case "double-panna":
        setLength(3);
        break;
      case "triple-panna":
        setLength(3);
        break;
      case "half-sangam":
        setLength(3);
        break;
      case "full-sangam":
        setLength(6);
        break;
      default:
        break;
    }
  }, [name]);

  function getValue(type) {
    switch (name) {
      case "ank":
        const { ank } = props;
        return ank.join("");
      case "jodi":
        const { jodi } = props;

        return jodi.join("");
      case "single-panna":
        const { numbers } = props;
        return numbers.join("");
      case "double-panna":
        const { numbers: dp } = props;
        return dp.join("");
      case "triple-panna":
        const { numbers: tp } = props;
        return tp.join("");
      case "half-sangam":
        const { numbers: hs } = props;
        return hs.join("");
      case "full-sangam":
        const { openNumbers, closeNumbers } = props;
        if (type === "open") return openNumbers?.join("");
        else return closeNumbers.join("");
      default:
        break;
    }
  }

  return (
    <Card
      extra={
        <CloseOutline
          onClick={() => {
            dispatch(removeBetLine({ id }));
          }}
        />
      }
      title={String(name).toUpperCase()}
      className="mt-4 mb-4 shadow-lg mx-2 bg-white border-2 border-emerald-200"
    >
      {!isValid && (
        <NoticeBar
          icon={<ExclamationCircleOutline />}
          content={"This is not a valid Bet please check the digits"}
          color="alert"
        />
      )}
      <GameDescription type={name} />
      <div className="flex justify-center">
        {name !== "full-sangam" && (
          <PasscodeInput
            ref={ref}
            error={!isValid}
            onFill={() => {
              ref.current.blur();
              dispatch(validate({ id }));
            }}
            style={{
              "--cell-size": "48px",
              fontWeight: "bold",
            }}
            plain
            value={getValue()}
            length={length}
            onChange={(value) => {
              let key = "";
              if (name === "ank") key = "ank";

              if (name === "jodi") key = "jodi";

              if (
                name == "single-panna" ||
                name == "double-panna" ||
                name == "triple-panna"
              )
                key = "numbers";
              if (name == "half-sangam" || name == "full-sangam")
                key = "numbers";

              // setValue(value);
              dispatch(updateValue({ updateKey: key, updateValue: value, id }));
            }}
          />
        )}

        {name == "full-sangam" && (
          <Space direction="horizontal">
            <PasscodeInput
              error={!isValid}
              ref={openRef}
              onFill={() => {
                closeRef.current.focus();
              }}
              style={{
                "--cell-size": "48px",
                fontWeight: "bold",
              }}
              plain
              value={getValue("open")}
              length={3}
              onChange={(value) => {
                let key = "";

                if (name == "half-sangam" || name == "full-sangam")
                  key = "openNumbers";

                dispatch(
                  updateValue({ updateKey: key, updateValue: value, id })
                );
              }}
            />

            <PasscodeInput
              aria-disabled
              error={!isValid}
              ref={closeRef}
              onFill={() => {
                closeRef.current.blur();
                dispatch(validate({ id }));
              }}
              style={{
                "--cell-size": "48px",
                fontWeight: "bold",
              }}
              plain
              value={getValue("close")}
              length={3}
              onChange={(value) => {
                let key = "";

                if (name == "full-sangam") key = "closeNumbers";

                dispatch(
                  updateValue({ updateKey: key, updateValue: value, id })
                );
              }}
            />
          </Space>
        )}
      </div>
      {!!drawType && (
        <div className="flex flex-row  p-0 justify-between">
          <Label title={"Draw Type"}>
            <Selector
              style={{ "--padding": "5px 10px" }}
              options={[
                {
                  label: "open",
                  value: "open",
                },
                {
                  label: "close",
                  value: "close",
                },
              ]}
              defaultValue={["open"]}
              value={type}
              onChange={(arr, extend) => {
                
                if(arr.length)
                {dispatch(
                  updateDrawType({ drawType: extend.items[0].value, id: id })
                );
                setDrawType(extend.items[0].value);}
              }}
            />
          </Label>
        </div>
      )}
      <Divider />
      <div className="flex flex-row justify-between">
        <Label title={"Amount"}>
          <Selector
            style={{ "--padding": "3px 3px" }}
            options={[              
              {
                label:formatMoney.format(10),
                value: "10",
              },              
              {
                label:formatMoney.format(20),
                value: "20",
              },                            
              {
                label:formatMoney.format(50),
                value: "50",
              },
              {
                label:formatMoney.format(100),
                value: "100",
              },
              {
                label:formatMoney.format(250),
                value: "250",
              },
              {
                label:formatMoney.format(500),
                value: "500",
              },
              {
                label:formatMoney.format(1000),
                value: "1000",
              },
              
            ]}
            defaultValue={["100"]}
            value={[String(stake)]}
            onChange={(arr, extend) => {
              if (extend.items.length) {
                dispatch(
                  updateStake({ stake: +extend?.items[0]?.value, id: id })
                );
              }
            }}
          />
        </Label>
        <Label title={`Max : ${formatMoney.format(10000)}`} textRight style={{ padding: 10 }}>
          <Stepper
            min={1}
            max={10000}
            value={stake}
            onChange={(value) =>
              dispatch(updateStake({ stake: value, id: id }))
            }
          />
        </Label>
      </div>
    </Card>
  );
}
