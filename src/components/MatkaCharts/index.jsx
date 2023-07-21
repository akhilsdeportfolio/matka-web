import { DotLoading, Dropdown, List, Radio, Result, Space, SpinLoading } from "antd-mobile";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { drawNames } from "../../const";
import { useGetGameResultsMutation } from "../../features/api/apiSlice";

export default function Results() {
  const today = moment().format("DD-MM-YYYY");
  const dates = [];
  const [selected, setSelected] = useState(drawNames[0]);
  const [date, setDate] = useState(today);
  const [call, apiResult] = useGetGameResultsMutation();
  const ref = useRef();
  const ref2 = useRef();
  const [gameResults, setGameResults] = useState([]);

  for (let i = 0; i <= 15; i++) {
    const date = moment(today, "DD-MM-YYYY").add(-i, "d").format("DD-MM-YYYY");
    dates.push(date);
  }

  useEffect(() => {
    call({ game: selected, date }).then((resp) => {
      if (!resp.error) setGameResults(resp.data.games);
    });
  }, []);

  useEffect(() => {
    ref?.current?.close();
    ref2?.current?.close();
    call({ game: selected, date }).then((resp) => {
      if (!resp.error) setGameResults(resp.data.games);
    });
  }, [selected]);

  if (apiResult.status === "pending") {
    return (
      <div className="text text-center">
        <SpinLoading color="primary"/>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <Dropdown ref={ref}>
          <Dropdown.Item key="gameName" title={selected} highlight>
            <div style={{ padding: 12 }}>
              <Radio.Group
                defaultValue={selected}
                onChange={(vlaue) => {
                  setSelected(vlaue);
                }}
              >
                <Space direction="vertical" block>
                  {drawNames.map((name) => {
                    return (
                      <Radio key={name} block value={name}>
                        {name}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>

      {apiResult.status === "fullfilled" && gameResults.length === 0 && (
        <Result
          status="warning"
          title="Game Not Found"
          description="Game data is not available may be because there was no game on this day on this platform"
        />
      )}
    </>
  );
}
