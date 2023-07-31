import { Button,Divider, List, Toast } from "antd-mobile";
import { useSelector } from "react-redux";
import { formatMoneyWithDecimals } from "../../utils/money";
import {useAuth} from '../../context/Auth/AuthContext';
import "./styles.css";
import { TbCashBanknote, TbCurrencyRupee, TbLogout, TbQuestionMark} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SecurePayments from "../SecurePayments";

export default function Profile() {
  const balance = useSelector((store) => store.user.balance / 100);
  const {logOut}=useAuth();
  const navigate = useNavigate();
  const {t}=useTranslation();



  return (
    <div>
      <div className="p-2 flex flex-row">
        <List className="w-full">
          <List.Item className="mkListItem">
            <div className="flex flex-row">
            <TbCashBanknote color="green" size={32} /> 
              <div className="flex flex-col px-2">
                <p className="text-xl font-bold">{t('balance')}</p>
                <p className="text-2xl ">{formatMoneyWithDecimals.format(balance)}</p>
              </div>
            </div>
            <div className="flex flex-row p-2 gap-2">
              <Button size="small" color="primary" shape="rounded" className="font-bold" onClick={()=>{navigate('/deposit')}}>
                {t('deposit')}
              </Button>
              <Button
                size="small"
                color="warning"
                type="ghost"
                shape="rounded"
                className="font-bold text-black"
                onClick={()=>{
                  navigate('/withdraw')
                }}
              >
                {t('withdraw')}
              </Button>
            </div>
          </List.Item>
        </List>
      </div>

      <Divider />
      <List >      
        {/* <List.Item
          className="p-2"
          prefix={<UserCircleOutline />}
          onClick={() => {}}
        >
          Account Confirmation
        </List.Item> */}
        <List.Item className="p-2" prefix={<TbCurrencyRupee size={18} />} onClick={() => {
          navigate('/payments/all')
        }}>
          {t('payments history')}
        </List.Item>
      {/*   <List.Item className="p-2" prefix={<SetOutline />} onClick={() => {}}>
          Settings
        </List.Item> */}
        <List.Item className="p-2" prefix={<TbQuestionMark size={18} />} onClick={() => {Toast.show("support@expressmatka.in")}}>
          {t('help')}
        </List.Item>
      </List>
      <Divider />
      <List>
        <List.Item
          arrow={false}
          className="p-2"
          prefix={<TbLogout color="red"/>}
          onClick={() => {logOut()}}
        >
          {t('logout')}
        </List.Item>
      </List>
      <SecurePayments/>
    </div>
  );
}
