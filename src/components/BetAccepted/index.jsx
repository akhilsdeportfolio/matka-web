import { NavBar, ResultPage } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import {ClockCircleOutline} from 'antd-mobile-icons';

export default function BetAccepted() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <NavBar
        back={false}
        backArrow={false}
        className="bg-emerald-500 text-white"
      />
      <ResultPage
        icon={<ClockCircleOutline/>}
        status="success"
        title="Your bet is accepted"
        description="check your bet results in mybets section"
        primaryButtonText="Go to MyBets"
        onPrimaryButtonClick={() => {
          navigate("/mybets", { replace: true });
        }}
      />
    </div>
  );
}
