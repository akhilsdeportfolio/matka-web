/* eslint-disable react/prop-types */

import { Form, List, PasscodeInput } from "antd-mobile";
import moment from "moment";

export default function ResultItem({ game ,disableStatus=false}) {
  
  return (
    <div>
      <List.Item
        clickable
        style={{ "--align-items": "center" }}
        className="border-b"
        arrow={false}
      >
        <div className="py-2">
          <div className="flex flex-row justify-between items-center px-4">
           {!disableStatus && <div>
              <p className={`text-xs  text-white ${game.openDrawStatus === "TO_BE_DRAWN" ?  "bg-green-400": "bg-red-400"}   px-2 py-1 rounded-lg font-light`}>
                Staus :{" "}
                {game.openDrawStatus === "TO_BE_DRAWN" ? "Open" : "Closed"}
              </p>
            </div>}
            <div >
              <p className="text-xs  text-white bg-emerald-400 px-2 py-1 rounded-lg font-light">
                Date : {moment(game.date, "DD-MM-YYYY").format("LL")}
              </p>
            </div>
          </div>
          <p className="text-center font-bold text-lg mx-4">
            {game.productName}
          </p>
          <Form.Item disabled className="bg-transparent">
            <div className="flex flex-row items-center justify-between">
              <PasscodeInput
                
                style={{
                  "--cell-size": "36px",
                  "--border-color": "cornflowerblue",
                  "--dot-size": "8px",
                }}
                plain
                value={game.openNumbers.join("")||"***"}
                length={3}
                className="mr-2"
              />
              <PasscodeInput
                style={{
                  "--cell-size": "36px",
                  "--border-color": "cornflowerblue",
                  "--dot-size": "8px",
                }}
                value={(game.openNumbers.reduce((ac,el)=>ac+el,0)%10 || "*")+""+(game.closeNumbers.length > 2 ?  game?.closeNumbers?.reduce((ac,el)=>ac+el,0)%10 : "*")}
                plain
                length={2}
                className="mr-2"
              />
              <PasscodeInput
                plain
                style={{
                  "--cell-size": "36px",
                  "--border-color": "cornflowerblue",
                  "--dot-size": "8px",
                }}
                value={game.closeNumbers.join("")||"***"}
                length={3}
              />
            </div>
          </Form.Item>

          <div className="flex flex-row justify-between items-center p-2">
            <div className="text-center">
              <p className="text-xs font-bold ">
                {"Draw Time : " +
                  moment.unix(game.openDrawTime).format("LT").toString()}{" "}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold ">
                {"Draw Time : " +
                  moment.unix(game.closeDrawTime).format("LT").toString()}
              </p>
            </div>
          </div>
        </div>
      </List.Item>
    </div>
  );
}
