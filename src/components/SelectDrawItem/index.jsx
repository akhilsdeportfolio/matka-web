/* eslint-disable react/prop-types */

import { CheckList, Form, PasscodeInput } from "antd-mobile";
import Countdown from "react-countdown";
import moment from "moment";
import './styles.css'
import { useTranslation } from "react-i18next";

export default function SelectDrawItem({ game, value }) {
  const {t}=useTranslation();
  return (
    <div>
      <CheckList.Item        
        value={value}
        clickable
        style={{ "--align-items": "center" }}
        className="border border-slate-200"        
        arrow={false}
      >
        <div className="py-2">
          <div className="flex flex-row justify-between items-center px-4">
          <div>
              <p className="text-xs  text-white bg-green-400 px-2 py-1 rounded-lg font-light">
                {t('status')+" : "}
                {game.openDrawStatus === "TO_BE_DRAWN" ? " OPEN" : " CLOSE"}
              </p>
            </div>
            <div className="mx-2">              
              <p className="text-xs  text-white bg-amber-400 px-2 py-1 rounded-lg font-light">{moment(game.date,'DD-MM-YYYY').format('LL')}</p>
            </div>
            
          </div>
          <p className="text-center font-bold text-lg mx-4 my-2" >{t(game.productName)}</p>
          <Form.Item disabled className="bg-transparent">
            <div className="flex flex-row items-center justify-between">
              <PasscodeInput
                style={{ "--cell-size": "36px", "--border-color": "cornflowerblue",'--dot-size':'8px' }}                
                value="***"
                length={3}
                className="mr-2"
              />
              <PasscodeInput
                style={{ "--cell-size": "36px", "--border-color": "cornflowerblue",'--dot-size':'8px' }}                
                value="***"
                length={2}
                className="mr-2"
              />
              <PasscodeInput
                style={{ "--cell-size": "36px", "--border-color": "cornflowerblue",'--dot-size':'8px'}}                
                value="***"
                length={3}
              />
            </div>
          </Form.Item>

          <div className="flex flex-row justify-between items-center p-2">
            <div className="text-center">              
              <Countdown
                className="font-bold text-lg counter"
                daysInHours
                date={moment.unix(game.openDrawTime).toDate()}
              />
              <p className="text-xs font-bold text-gray-400">{t('Draw Time')+' : '+moment.unix(game.openDrawTime).format('LT').toString()} </p>
            </div>
            <div className="text-center">              
              <Countdown                
                daysInHours
                date={moment.unix(game.closeDrawTime).toDate()}
                intervalDelay={0}
                precision={3}
                className="font-bold text-lg counter text-center"
              />
              <p className="text-xs font-bold text-gray-400">{t('Draw Time')+' : '+moment.unix(game.closeDrawTime).format('LT').toString()}</p>
            </div>
          </div>
        </div>
      </CheckList.Item>
    </div>
  );
}
