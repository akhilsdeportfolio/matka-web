import { Dropdown, List, Radio, Result, SearchBar, Space, SpinLoading } from "antd-mobile";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ResultItem from "./ResultItem";
import { useGetGameResultsMutation } from "../../features/api/apiSlice";

export default function Results() {
  const today = moment().format("DD-MM-YYYY");
  const dates = [];
  const [date, setDate] = useState(today);
  const [call,apiResult] = useGetGameResultsMutation();
  const ref = useRef();  
  const [gameResults, setGameResults] = useState([]);
  const [copy, setCopy] = useState([]);

  for (let i = 0; i <= 7; i++) {
    const date = moment(today, "DD-MM-YYYY").add(-i, "d").format("DD-MM-YYYY");
    dates.push(date);
  }

  

  useEffect(() => {
    ref?.current?.close();    
    call({ date }).then((resp) => {
      if (!resp.error) setGameResults(resp.data.games);
    });
  }, [date]);

  useEffect(()=>{
    setCopy(gameResults)
  },[gameResults])



  if(apiResult.status==='pending')
  {
    return <div className="text text-center">
      <SpinLoading color="primary" className="m-auto w-1/2"/>
    </div>
  }

  function handleSearch(value) {    
    const d = gameResults.filter((game) => {
      if (game.productName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setCopy(d);
  }

  return (
    <>
      <div className="p-2">
        <SearchBar placeholder="Enter a game name" onChange={handleSearch} />
      </div>
      <div className="flex flex-row justify-start items-center">      
        <p className="px-2 text-sm font-bold">Date : </p><Dropdown ref={ref}>
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
        {copy?.map((game) => (
          <ResultItem game={game} key={game._id} />
        ))}
      </List>
    </>
  );
}
