import { Button, PullToRefresh, TabBar } from "antd-mobile";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import {TbHistory,TbDeviceGamepad2,TbClipboardData,TbUserCircle, TbTableFilled} from 'react-icons/tb';
import { useGetUserDataByIdMutation } from "../../features/api/apiSlice";
import {updateBalance} from '../../features/users/';
import { auth } from "../../clientFirebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../utils/money";

const AppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const balance = useSelector(store=>(store.user.balance/100));

  const setRouteActive = (value) => {
    navigate(value);
  };
  const tabs = [
    {
      key: "/",
      title: "Play",
      icon: <TbDeviceGamepad2 />,
    },
    {
      key: "/mybets",
      title: "My bets",
      icon: <TbHistory />,
    },
    {
      key: "/results",
      title: "Results",
      icon: <TbClipboardData />,
    },    
    /* {
      key: "/charts",
      title: "Charts",
      icon: <TbTableFilled />,
    },     */
    {
      key: "/profile",
      title: formatMoney.format(balance),
      icon: <TbUserCircle />,
    },
  ];
  return (    
    <TabBar
      activeKey={pathname}
      onChange={(value) => setRouteActive(value)}
      style={{ padding: 10 }}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
export default function Dashboard() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [callApi,]=useGetUserDataByIdMutation();

  useEffect(()=>{
    callApi(auth.currentUser.uid).then((resp)=>{      
      dispatch(updateBalance(resp.data.userData.balance));
    });
  },[]);

  
  
 
  return (
    <PullToRefresh

    onRefresh={()=>{
      location.reload()
    }}
     renderText={status => {
      return <div>{status=='canRelease'?'Reload':"Loading.."}</div>
    }}>
    <div style={{ margin: "0px",overflow:'hidden'}}>
      <div >
        <div className="flex flex-row justify-between items-center bg-emerald-500">
          <div className="px-4 p-2 rounded-ful">
          <img height={40} width={64} src="/logo.png" />
          </div>
          <div className="mx-2">
            <Button className="font-bold text-black" type="ghost" color="warning" shaoe="round" size="small" onClick={()=>{navigate('/deposit')}}>Deposit</Button>
          </div>
        </div>        
        <AppBar />
      </div>
      <div style={{ minHeight: "70vh", maxHeight: "70vh", overflow: "scroll" }}>
        <Outlet />
      </div>
    </div>
    </PullToRefresh>
  );
}
