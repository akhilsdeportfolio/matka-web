import {
  Button,
  Dropdown,
  PullToRefresh,
  Radio,
  Space,
  TabBar,
} from "antd-mobile";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import {
  TbHistory,
  TbDeviceGamepad2,
  TbClipboardData,
  TbUserCircle,
} from "react-icons/tb";
import { MdTranslate } from "react-icons/md";
import { useGetUserDataByIdMutation } from "../../features/api/apiSlice";
import { updateBalance } from "../../features/users/";
import { auth } from "../../clientFirebase";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatMoneyWithDecimals } from "../../utils/money";
import "./index.css";
import i18n from "../../../i18next";
import { useTranslation } from "react-i18next";

const AppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const balance = useSelector((store) => store.user.balance / 100);
  const { t } = useTranslation();


  const setRouteActive = (value) => {
    navigate(value);
  };
  const tabs = [
    {
      key: "/",
      title: t("play"),
      icon: <TbDeviceGamepad2 />,
    },
    {
      key: "/mybets",
      title: t("my bets"),
      icon: <TbHistory />,
    },
    {
      key: "/results",
      title: t("results"),
      icon: <TbClipboardData />,
    },
    /* {
      key: "/charts",
      title: "Charts",
      icon: <TbTableFilled />,
    },     */
    {
      key: "/profile",
      title: formatMoneyWithDecimals.format(balance),
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callApi] = useGetUserDataByIdMutation();
  const ref = useRef();
  const {t}=useTranslation();

  useEffect(() => {
    callApi(auth.currentUser.uid).then((resp) => {
      dispatch(updateBalance(resp.data.userData.balance));
    });
  }, []);

  return (
    <PullToRefresh
      onRefresh={() => {
        location.reload();
      }}
      renderText={(status) => {
        return <div>{status == "canRelease" ? "Reload" : "Loading.."}</div>;
      }}
    >
      <div style={{ margin: "0px", overflow: "hidden" }}>
        <div>
          <div className="flex flex-row justify-between items-center" style={{backgroundColor:'lightseagreen'}}>
            <div className="px-4 p-2">
              <img height={40} width={64} src="/logo.png" />
            </div>
            <div className="mx-2 flex flex-row items-center">
              <div>
                <Button
                  className="font-bold text-black"
                  type="ghost"
                  color="warning"
                  shape="rounded"
                  size="small"
                  onClick={() => {
                    navigate("/deposit");
                  }}
                >
                  {t('deposit')}
                </Button>
              </div>
              <div>
                <Dropdown style={{ backgroundColor: "transparent" }} ref={ref}>
                  <Dropdown.Item
                    key="sorter"
                    className="custom"
                    title={<MdTranslate style={{ color: "white" }} />}
                  >
                    <div style={{ padding: 12 }}>
                      <Radio.Group
                        defaultValue={i18n.language}
                        onChange={(value) => {
                          localStorage.setItem('language',value);
                          i18n.changeLanguage(value);
                          ref.current.close();
                        }}
                      >
                        <Space direction="vertical" block>
                          <Radio block value="hi" key="hi">
                            हिंदी
                          </Radio>
                          <Radio block value="en" key="en">
                            English
                          </Radio>
                          <Radio block value="te" key="te">
                            తెలుగు
                          </Radio>
                          <Radio block value="kn" key="kn">
                            ಕನ್ನಡ
                          </Radio>
                          <Radio block value="ta" key="ta">
                            தமிழ்
                          </Radio>
                          <Radio block value="ml" key="ml">
                            മലയാളം
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          <AppBar />
        </div>
        <div
          style={{ minHeight: "60vh", maxHeight: "75vh", overflow: "scroll" }}
        >
          <Outlet />
        </div>
      </div>
    </PullToRefresh>
  );
}
