/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import { formatMoneyWithDecimals, getAmountByLine } from "../../../utils/money";
import { useTranslation } from "react-i18next";

export default function LinesListItem(props) {
  
  const { name, serialNo, stake, winnings,drawType,id} = props;
  const {t}=useTranslation();

  function getNumbers() {
    switch (name) {
      case "ank":
        return props[name];
      case "jodi":
        return props[name].join("");
      case "single-panna":
        return props["numbers"].join("");
      case "double-panna":
        return props["numbers"].join("");
      case "triple-panna":
        return props["numbers"].join("");
      case "half-sangam":
        return t("panna")+props["numbers"]?.join("")+`, ${t('digits')} : `+(props["ank"]?.join("")||'n/a');
      case "full-sangam":
        return (
          props["openNumbers"].join("") + "," + props["closeNumbers"].join("")
        );
      default:
        return "n/a";
    }
  }

  return (
    <List.Item clickable arrow={false}>
      <div className="flex flex-row gap-1 justify-between p-2">
        <div>
          <p className="text-2xl font-bold  text-gray-300">{serialNo}</p>
        </div>
        <div>
          <div className="flex flex-col justify-start">
            <div>
              <p className="text-xs  text-black font-bold">
                {t(name.replace("-"," "))}
              </p>
            </div>
            <div>
              <p className="text-xs  text-gray-400" style={{fontSize:'10px'}}>{name==='half-sangam'&&drawType==='open' && t("Open Panna Close Ank")}</p>
              <p className="text-xs  text-gray-400" style={{fontSize:'10px'}}>{name==='half-sangam'&&drawType==='close' && t("Close Panna Open Ank")}</p>
              <p className="text-xs  text-gray-400">{drawType && name!=='half-sangam'&& t('betType')+ drawType}</p>
            </div>
            <div>
              {name !=='half-sangam' &&<p className="text-xs  text-gray-400">{t('numbers')} : [{getNumbers()}]</p>}
              {name =='half-sangam' &&<p className="text-xs  text-gray-400">{getNumbers()}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xs font-bold  text-black">{t('stake')}</p>
          </div>
          <div>
            <p className="text-xs  text-gray-400">
              {formatMoneyWithDecimals.format(stake)}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xs  text-black font-bold">{t('winnings')}</p>
          </div>
          <div>
            <p className="text-xs  text-gray-400">
              {formatMoneyWithDecimals.format(getAmountByLine(winnings,id))}
            </p>
          </div>
        </div>
      </div>
    </List.Item>
  );
}
