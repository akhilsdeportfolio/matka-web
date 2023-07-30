import { Link, useNavigate, useParams } from "react-router-dom";
import {  usePhonePeCheckStautsQuery } from "../../features/api/apiSlice";
import { Button, Card, Input, ResultPage, SpinLoading } from "antd-mobile";
import Countdown, { zeroPad } from "react-countdown";
import moment from "moment";
import { formatMoneyWithDecimals } from "../../utils/money";
import "./index.css";
import { useSelector } from "react-redux";
import {SiPhonepe,SiPaytm,SiGooglepay,SiAmazonpay} from 'react-icons/si'

export default function PaymentsStatus() {
  const { id } = useParams();
  const payments = useSelector(store=>store.payments); 
  const {data ,loading} = usePhonePeCheckStautsQuery(id,{pollingInterval:45000});
  const navigate = useNavigate();

  const details = [
    {
      label: "Transaction Id",
      value: data?.data?.transactionId,
    },
  ];



   if(loading)
  {
    return <div className="text-center"><SpinLoading color="primary"/></div>
  } 

  return (
    <div>
      {data?.code === "PAYMENT_SUCCESS" && (
        <ResultPage
          className="success"
          status="success"
          title={<div style={{ fontSize: 15 }}>SUCCESS</div>}
          description={
            <>
              <span style={{ fontSize: 48, color: "#ffffff" }}>
                {formatMoneyWithDecimals.format(data?.data?.amount / 100)}
              </span>
            </>
          }
          details={details}
          primaryButtonText={`Let's Play`}
          onPrimaryButtonClick={() => {
            navigate("/");
          }}
        ></ResultPage>
      )}
      {data?.code !== "PAYMENT_SUCCESS" && (
        <ResultPage
          className="pending"
          status="waiting"
          title={<div style={{ fontSize: 15 }}>PENDING</div>}
          description={
            <>
              <span style={{ fontSize: 32, color: "#ffffff" }}>
                {formatMoneyWithDecimals.format(payments?.amount)}
              </span>
              <br />
              <span className="text-center text-weight text-xs">
                Payment Request Expires in
              </span>
              <br />
              <Countdown
                renderer={({ minutes, seconds }) => (
                  <span className="text-xl counter text-center text-white">
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                  </span>
                )}
                daysInHours
                date={moment().add("8", "minutes").toDate()}
                intervalDelay={0}
                precision={3}
              />
            </>
          }
        >
          <Card style={{ marginTop: 12 }}>
            <div className="mx-auto w-1/2 text-center max-w-fit">
              <img
                src={`data:image/png;base64,${payments?.instrumentResponse?.qrData}`}
                width={150}
                height={150}
              />
              <a
                className="text-center"
                download="qr.png"
                href={`data:image/png;base64,${payments?.instrumentResponse?.qrData}`}
              >
                Download
              </a>
            </div>
            <p className="font-bold text-sm text-center p-4 ">Pay using QR or Pay using UPI apps</p>
            <div className="flex flex-row justify-evenly items-center max-w-full">
              <div>
                <Link
                  to={payments?.instrumentResponse?.intentUrl}
                >
                 <SiPhonepe size={32} color="indigo"/>
                </Link>
              </div>
              <div>
                <Link
                  to={payments?.instrumentResponse?.intentUrl}
                >
                 <SiPaytm size={32} color="skyblue"/>
                </Link>
              </div>
              <div>
                <Link
                  to={payments?.instrumentResponse?.intentUrl}
                >
                 <SiGooglepay size={32} color="#3A81F1"/>
                </Link>
              </div>
              <div>
                <Link
                  to={payments?.instrumentResponse?.intentUrl}
                >
                 <SiAmazonpay size={32} color="orange"/>
                </Link>
              </div>
              
            </div>
       
            <div className="text-center p-4">
              <p className="p-2">Checking payment status</p>
              <SpinLoading color="primary" className="m-auto w-1/2" />
              <p className="p-2 ">
                Please don&apos;t close the window or press back{" "}
              </p>
            </div>
          </Card>
        </ResultPage>
      )}
    </div>
  );
}
