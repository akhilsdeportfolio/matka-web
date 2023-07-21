import { DotLoading, Dropdown, List, Radio, Result, Space, SpinLoading } from "antd-mobile";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { drawNames } from "../../const";
import ResultItem from "./ResultItem";
import { useGetGameResultsMutation } from "../../features/api/apiSlice";

export default function Results() {
  const today = moment().format("DD-MM-YYYY");
  const dates = [];
  const [selected, setSelected] = useState(drawNames[0]);
  const [date, setDate] = useState(today);
  const [call,apiResult] = useGetGameResultsMutation();
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
  }, [selected, date]);



  if(apiResult.status==='pending')
  {
    return <div className="text text-center">
      <SpinLoading color="primary" className="m-auto w-1/2"/>
    </div>
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

        <Dropdown ref={ref2}>
          <Dropdown.Item key="gameDate" title={date} highlight>
            <div style={{ padding: 12, overflow: "scroll" }}>
              <Radio.Group
                defaultValue={date}
                onChange={(vlaue) => {
                  setDate(vlaue);
                }}
              >
                <Space direction="vertical" block>
                  {dates.map((date) => {
                    return (
                      <Radio key={date} block value={date}>
                        {date}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>

      { apiResult.status==='fullfilled' &&gameResults.length === 0 && (
        <Result
          status="warning"
          title="Game Not Found"
          description="Game data is not available may be because there was no game on this day on this platform"
        />
      )}
      <List>
        {gameResults?.map((game) => (
          <ResultItem game={game} key={game._id} />
        ))}
      </List>
    </>
  );
}
