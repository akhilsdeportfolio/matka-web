import { Button,Divider, List } from "antd-mobile";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils/money";
import {useAuth} from '../../context/Auth/AuthContext';
import {  
  PayCircleOutline,    
  QuestionCircleOutline,
  UnlockOutline
} from "antd-mobile-icons";
import "./styles.css";
import { TbCashBanknote, TbCoinRupee, TbQuestionMark} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const balance = useSelector((store) => store.user.balance / 100);
  const {logOut}=useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-2 flex flex-row">
        <List className="w-full">
          <List.Item className="mkListItem">
            <div className="flex flex-row">
              <TbCashBanknote color="green" size={32} />
              <div className="flex flex-col px-2">
                <p className="text-sm font-bold">Balance</p>
                <p className="text-sm ">{formatMoney.format(balance)}</p>
              </div>
            </div>
            <div className="flex flex-row p-2 gap-2">
              <Button size="small" color="primary" className="font-bold" onClick={()=>{navigate('/deposit')}}>
                Deposit
              </Button>
              <Button
                size="small"
                color="warning"
                type="ghost"
                className="font-bold"
                onClick={()=>{
                  navigate('/withdraw')
                }}
              >
                Withdraw
              </Button>
            </div>
          </List.Item>
        </List>
      </div>

      <Divider />
      <List >
        {/* <List.Item
          className="p-2"
          prefix={<InformationCircleOutline />}
          onClick={() => {}}
        >
          Personal Data
        </List.Item> */}
        {/* <List.Item
          className="p-2"
          prefix={<UserCircleOutline />}
          onClick={() => {}}
        >
          Account Confirmation
        </List.Item> */}
        <List.Item className="p-2" prefix={<TbCoinRupee size={24} />} onClick={() => {
          navigate('/payments/all')
        }}>
          Payments History
        </List.Item>
      {/*   <List.Item className="p-2" prefix={<SetOutline />} onClick={() => {}}>
          Settings
        </List.Item> */}
        <List.Item className="p-2" prefix={<TbQuestionMark size={24} />} onClick={() => {}}>
          Help and Support
        </List.Item>
      </List>
      <Divider />
      <List>
        <List.Item
          className="p-2"
          prefix={<UnlockOutline color="red"/>}
          onClick={() => {logOut()}}
        >
          Logout
        </List.Item>
      </List>
    </div>
  );
}
