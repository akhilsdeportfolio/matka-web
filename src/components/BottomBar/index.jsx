/* eslint-disable react/prop-types */
import { Button, Space } from "antd-mobile";
import { TbCoinRupee, TbCurrencyRupee } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function BottomBar({  
  primary,
  secondary,
  isLoading = false,
  primaryText="SUBMIT",
  secondaryText="Cancel",
  disableSecondary=false
}) {
  
  const lines = useSelector((store) => store.lines);
  const disabled= lines.filter((el)=>!el.isValid).length > 0; 
  const amount = lines.reduce((ac, el) => ac + Number(el.stake), 0);

  if (amount == 0) return null;

  return (
    <div
      style={{ position: "absolute", bottom: 0, minWidth: "100%" }}
      className="bg-slate-200 p-3"
    >
      <div className="flex flex-row justify-between items-center	">
        <div>
          <p className="text-lg font-bold flex flex-row items-center">
            <TbCurrencyRupee /> {amount}
            </p>
        </div>
        <Space direction="horizontal" className="align-middle">
          <Button
            color="primary"
            className="font-bold"
            size="small"
            disabled={disabled}
            onClick={() => {
              primary();
            }}
            loading={isLoading}
          >
            {primaryText}
          </Button>
          {!disableSecondary && (
            <Button               
              color="primary"
              className="font-bold"
              size="small"
              disabled={disabled}
              loading={isLoading}
              onClick={secondary}
            >
              {secondaryText}
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
