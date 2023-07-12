import { Button, PullToRefresh, TabBar } from "antd-mobile";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import {TbHistory,TbDeviceGamepad2,TbClipboardData,TbTableFilled,TbUserCircle} from 'react-icons/tb';

const AppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;


  

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
    }, */
    {
      key: "/profile",
      title: "Profile",
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
        <div className="flex flex-row justify-between items-center bg-indigo-700">
          <div className="p-4">
          <img height={40} width={64} src="/logo.png" />
          </div>
          <div className="mx-2">
            <Button type="ghost" color="warning" shaoe="round" size="small" onClick={()=>{navigate('/deposit')}}>Deposit</Button>
          </div>
        </div>        
        <AppBar />
      </div>
      <div style={{ minHeight: "75vh", maxHeight: "82vh", overflow: "scroll" }}>
        <Outlet />
      </div>
    </div>
    </PullToRefresh>
  );
}
