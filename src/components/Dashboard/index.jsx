import { TabBar } from "antd-mobile";
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
    {
      key: "/charts",
      title: "Charts",
      icon: <TbTableFilled />,
    },
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
  return (
    <div style={{ margin: "0px" }}>
      <div>
        {/* <NavBar backArrow={false}>Welcome to Satta King</NavBar> */}
        <AppBar />
      </div>
      <div style={{ minHeight: "82vh", maxHeight: "82vh", overflow: "scroll" }}>
        <Outlet />
      </div>
    </div>
  );
}
