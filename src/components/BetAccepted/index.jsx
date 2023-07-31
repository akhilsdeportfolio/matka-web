import { NavBar, ResultPage } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {ClockCircleOutline} from 'antd-mobile-icons';
import { useTranslation } from "react-i18next";

export default function BetAccepted() {
  const navigate = useNavigate();
  const {t}=useTranslation();

  return (
    <div className="text-center">
      <NavBar
        back={false}
        backArrow={false}
        className=" text-white"
        style={{backgroundColor:"lightseagreen"}}
      />
      <ResultPage
        icon={<ClockCircleOutline/>}
        status="success"
        title={t("Your bet is accepted")}
        description={t("check your bet results in mybets section")}
        primaryButtonText={t("Go to MyBets")}
        onPrimaryButtonClick={() => {
          navigate("/mybets", { replace: true });
        }}
      />
    </div>
  );
}
