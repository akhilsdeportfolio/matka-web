/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import {  
  Card,
  Divider,
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
} from "../../features/betlines";
import { CloseOutline } from "antd-mobile-icons";
import GameDescription from "../GameDescription";

export default function Betline(props) {
  const { name, stake, drawType, id } = props;
  const [type, setDrawType] = useState(drawType);
  const dispatch = useDispatch();
  const [length, setLength] = useState(1);
  const ref = useRef();
  const openRef=useRef();
  const closeRef=useRef();





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
        const { openNumbers ,closeNumbers} = props;
        if(type==="open")
          return openNumbers?.join("");
        else
          return closeNumbers.join("");
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
          color="red"
        />
      }
      title={String(name).toUpperCase()}
      className="mt-4 mb-4 drop-shadow-2xl mx-2 border-2 border-blue-300"
    >
      <GameDescription type={name}/>
      <div className="flex justify-center">        
        { name!=="full-sangam" &&<PasscodeInput
          ref={ref}
          onFill={() => {
            ref.current.blur();
          }}
          style={{
            "--cell-size": "48px",
            fontWeight: "bold",
            '--border-color':'var(--adm-color-primary)'            
          }}
          plain
          value={getValue()}
          length={length}
          onChange={(value) => {            
            let key="";
            if(name==="ank")
              key="ank";
            
            if(name==="jodi")
              key="jodi";

            if(name=="single-panna" || name=="double-panna" || name=="triple-panna")
              key="numbers"         
            if(name=="half-sangam" || name=="full-sangam")     
              key="numbers"
            
              
            // setValue(value);              
            dispatch(updateValue({updateKey:key,updateValue:value,id}))
            
          }}
        />}


        { name=="full-sangam" && <Space direction="horizontal">
        <PasscodeInput
          ref={openRef}
          onFill={() => {
            closeRef.current.focus()
          }}
          style={{
            "--cell-size": "48px",
            fontWeight: "bold",
            '--border-color':'var(--adm-color-primary)'            
          }}
          plain
          value={getValue('open')}
          length={3}
          onChange={(value) => {            
            let key="";
          
            if(name=="half-sangam" || name=="full-sangam")     
              key="openNumbers"
                          
            // setValue(value);              
            dispatch(updateValue({updateKey:key,updateValue:value,id}))
            
          }}
        />
        <PasscodeInput
          ref={closeRef}
          onFill={() => {
            closeRef.current.blur();
          }}
          style={{
            "--cell-size": "48px",
            fontWeight: "bold",
            '--border-color':'var(--adm-color-primary)'            
          }}
          plain
          value={getValue('close')}
          length={3}
          onChange={(value) => {            
            let key="";
          
            if(name=="full-sangam")     
              key="closeNumbers"
            
              
            // setValue(value);              
            dispatch(updateValue({updateKey:key,updateValue:value,id}))
            
          }}
        />
        </Space>}


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
                {
                  label: "both",
                  value: "both",
                },
              ]}
              defaultValue={["both"]}
              value={type}
              onChange={(arr, extend) => {
                dispatch(
                  updateDrawType({ drawType: extend.items[0].value, id: id })
                );
                setDrawType(extend.items[0].value);
              }}
            />
          </Label>
        </div>
      )}
      <Divider />
      <div className="flex flex-row justify-between">
        <Label title={"Amount"}>
          <Selector
            style={{ "--padding": "5px 10px" }}
            options={[
              {
                label: Number("25").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "25",
              },
              {
                label: Number("50").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "50",
              },
              {
                label: Number("75").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "75",
              },
              {
                label: Number("100").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "100",
              },
              {
                label: Number("200").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "200",
              },
              {
                label: Number("500").toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }),
                value: "500",
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
        <Label title={"Max : 10000"} textRight style={{ padding: 10 }}>
          <Stepper
            min={10}
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
