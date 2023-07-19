/* eslint-disable react/prop-types */
import { Button, Space } from "antd-mobile";
import { TbCoinRupee, TbCurrencyRupee } from "react-icons/tb";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils/money";

export default function BottomBar({
  primary,
  secondary,
  isLoading = false,
  primaryText = "SUBMIT",
  secondaryText = "Cancel",
  disableSecondary = false,
}) {
  const lines = useSelector((store) => store.lines);
  const disabled = lines.filter((el) => !el.isValid).length > 0;
  const amount = lines.reduce((ac, el) => ac + Number(el.stake), 0);

  if (amount == 0) return null;

  return (
    <div
      style={{ position: "absolute", bottom: 0, minWidth: "100%" }}
      className="bg-amber-300 p-2"
    >
      <div className="flex flex-row justify-between items-center	">
        <div>
          <p className="text-lg font-bold flex flex-row items-center">
            {formatMoney.format(amount)}
          </p>
        </div>
        <Space direction="horizontal" className="align-middle">
          <Button
            size="small"
            color="primary"
            className="font-bold"
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
              size="small"
              color="primary"
              className="font-bold"
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
