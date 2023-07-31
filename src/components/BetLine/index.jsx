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
  addBetline,
  removeBetLine,
  updateDrawType,
  updateStake,
  updateValue,
  validate,
} from "../../features/betlines";
import { CloseOutline, ExclamationCircleOutline } from "antd-mobile-icons";
import GameDescription from "../GameDescription";
import { formatMoney } from "../../utils/money";
import { useTranslation } from "react-i18next";
import { TbCopy } from "react-icons/tb";
import shortid from "shortid";
import { MdCopyAll, MdDelete } from "react-icons/md";


export default function Betline(props) {
  const { name, stake, drawType, id, isValid } = props;
  const [type, setDrawType] = useState(drawType);
  const dispatch = useDispatch();
  const [length, setLength] = useState(1);
  const ref = useRef();
  const openRef = useRef();
  const closeRef = useRef();
  const pannaRef=useRef();
  const ankRef=useRef();
  const {t}=useTranslation();

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
        setLength(4);
        break;
      case "full-sangam":
        setLength(6);
        break;
      default:
        break;
    }
  }, [name]);


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
            ank:[],
            drawType: "open",
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
        const { numbers: hs,ank:an} = props;
        if(type==='numbers') 
          return hs.join("");
        if(type==='ank')
          return an.join("");
          break;
      case "full-sangam":
        const { openNumbers, closeNumbers } = props;
        if (type === "open") return openNumbers?.join("");
        else return closeNumbers.join("");
      default:
        break;
    }
  }


  function ExtraActions()
  {
    return (<>
      <div className="flex flex-row">
      <MdCopyAll
      className="mr-4"
          onClick={() => {
            updateSelected(name)
          }}
        />
      <MdDelete
          onClick={() => {
            dispatch(removeBetLine({ id }));
          }}
        />
      </div>
    </>)
  }
  return (
    <Card
      extra={
        <ExtraActions/>
      }
      title={t(name?.replace("-"," "))}
      className="mt-4 mb-4 mx-1 bg-white border"
    >
      {!isValid && (
        <NoticeBar
          icon={<ExclamationCircleOutline />}
          content={t('inValidBetMessage')}
          color="alert"
        />
      )}
      <GameDescription type={name} />
      <div className="flex justify-center">
        {name !== "half-sangam" && name !== "full-sangam" && (
          <PasscodeInput
            seperated
            ref={ref}
            error={!isValid}
            onFill={() => {
              ref.current.blur();
              dispatch(validate({ id }));
            }}
            style={{
              "--cell-size": "36px",
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

        {name === "half-sangam" && (
          <Space direction="horizontal">
            <PasscodeInput
              ref={pannaRef}
              error={!isValid}
              onFill={() => {
                pannaRef.current.blur();              
                ankRef.current.focus()
                dispatch(validate({ id }));
              }}
              style={{
                "--cell-size": "36px",
                fontWeight: "bold",
              }}
              plain
              value={getValue(type==='open'?'numbers':'ank')}
              length={type==='open'?3:1}
              onChange={(value) => {
                let key = type==='open'?"numbers":"ank";
                // setValue(value);
                dispatch(
                  updateValue({ updateKey: key, updateValue: value, id })
                );
              }}
            />
            <PasscodeInput
              ref={ankRef}
              error={!isValid}
              onFill={() => {
                ankRef.current.blur();        
                dispatch(validate({ id }));
              }}
              style={{
                "--cell-size": "36px",
                fontWeight: "bold",
              }}
              plain
              value={getValue(type==='open'?'ank':'numbers')}
              length={type==='open'?1:3}
              onChange={(value) => {
                let key = type==='open'?"ank":"numbers";
                // setValue(value);
                dispatch(
                  updateValue({ updateKey: key, updateValue: value, id })
                );
              }}
            />
          </Space>
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
                "--cell-size": "36px",
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
                "--cell-size": "36px",
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
          <Label title={"Draw Type"} >
            <Selector
              style={{ "--padding": "5px 10px" }}
              options={
                (name === "half-sangam" && [
                  {
                    label: "close ank",
                    value: "open",
                  },
                  {
                    label: "open ank",
                    value: "close",
                  },
                ]) || [
                  {
                    label: "open",
                    value: "open",
                  },
                  {
                    label: "close",
                    value: "close",
                  },
                ]
              }
              defaultValue={["open"]}
              value={type}
              onChange={(arr, extend) => {
                if (arr.length) {
                  dispatch(
                    updateDrawType({ drawType: extend.items[0].value, id: id })
                  );
                  setDrawType(extend.items[0].value);
                }
              }}
            />
            {name === "half-sangam" && drawType === "open" && (
              <span style={{ fontSize: "10px" }}>
                Open Panna close Ank (last digit is ank and rest is panna)
              </span>
            )}
            {name === "half-sangam" && drawType === "close" && (
              <span style={{ fontSize: "10px" }}>
                Close Panna open Ank (1st digit is ank and rest is panna)
              </span>
            )}
          </Label>
        </div>
      )}
      <Divider />
      <div className="flex flex-row justify-between">
        <Label title={"Amount"}>
          <Selector
            style={{ "--padding": "5px 10px"}}
            options={[
              {
                label: formatMoney.format(10),
                value: "10",
              },
              {
                label: formatMoney.format(20),
                value: "20",
              },
              {
                label: formatMoney.format(50),
                value: "50",
              },
              {
                label: formatMoney.format(100),
                value: "100",
              },
              {
                label: formatMoney.format(250),
                value: "250",
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
        <Label
          title={`Max : ${formatMoney.format(2500)}`}
          textRight
          style={{ padding: 10 }}
        >
          <Stepper
            min={1}
            max={2500}
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
