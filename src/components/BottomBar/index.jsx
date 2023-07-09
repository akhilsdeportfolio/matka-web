import { Button, Space } from "antd-mobile";
import { useSelector } from "react-redux";

export default function BottomBar({  
  primary,
  secondary,
  isLoading = false,
}) {
  const lines = useSelector((store) => store.lines);
  const amount = lines.reduce((ac, el) => ac + Number(el.stake), 0);

  if (amount == 0) return null;

  return (
    <div
      style={{ position: "absolute", bottom: 0, minWidth: "100%" }}
      className="bg-slate-200 p-3"
    >
      <div className="flex flex-row justify-between items-center	">
        <div>
          <p className="text-lg font-bold"> &#8377;{amount}</p>
        </div>
        <Space direction="horizontal" className="align-middle">
          <Button
            color="primary"
            className="font-bold"
            size="small"
            onClick={() => {
              primary();
            }}
            loading={isLoading}
          >
            Pick Draw
          </Button>
          {!isLoading && (
            <Button
              color="primary"
              className="font-bold"
              size="small"
              loading={isLoading}
              onClick={secondary}
            >
              Quick Draw
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
