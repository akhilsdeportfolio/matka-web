import { Button, Form, Input, NavBar, Toast } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import {
  useInitiatePaymentMutation,
  usePhonePeGatewayMutation,
  usePhonePeGatewayIntentMutation,
  usePhonePeGatewayQrMutation,
  usePhonePeUpiCollectMutation,
  usePhonePeCheckStautsQuery,
} from "../../features/api/apiSlice";
import { auth } from "../../clientFirebase";
import QRCode from "react-qr-code";

export default function Deposit() {
  const navigate = useNavigate();
  const [value, setValue] = useState(200);
  const [callInitPayment] = useInitiatePaymentMutation();
  const [callIntent] = usePhonePeGatewayIntentMutation();
  const [callQr] = usePhonePeGatewayQrMutation();
  const [vpaCollect] = usePhonePeUpiCollectMutation();
  const [callPhonepe] = usePhonePeGatewayMutation();
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const [qrData, setQrData] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState({});

  return (
    <>
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        className="bg-emerald-500 text-white"
      >
        Fast Deposit
      </NavBar>
      <div className="py-8" />
      <Form
        form={form}
        onFinish={(data) => {
          setIsloading(true);

          callPhonepe({ amount: data.amount * 100 })
            .then((resp) => {
              if (resp.error) {
                Toast.show("Error Code " + resp.error.status);
                setIsloading(false);
                setError(resp.error);
                return;
              }

              const url = resp.data.data.instrumentResponse.redirectInfo.url;
              const { merchantTransactionId } = resp.data.data;
              //const windowFeatures = "noopener,noreferrer,width=360,height=650";
              //window.open(url,'_blank',windowFeatures);
              location.href = url;
              //navigate(`/payments/${merchantTransactionId}`);
            })
            .catch((e) => {
              console.log("Error", e);
            });

          /* vpaCollect({ amount: data.amount * 100 })
            .then((resp) => {
              if (resp.error) {
                Toast.show("Error Code " + resp.error.status);
                setIsloading(false);
                setError(resp.error);
              } else {
                const { merchantTransactionId } = resp.data.data;
                console.log(resp.data);
                navigate(`/payments/${merchantTransactionId}`);
              }
            })
            .catch((e) => {
              console.error("error", e);
            }); */
          /* callInitPayment({ amount: data.amount * 100 })
            .then((resp) => {
              setCompleted(true);

              const paymentUrl =
                "https://cashier.mhprop.solutions/pay/" +
                resp.data.data._id +
                "/" +
                auth.currentUser.uid;
              location.href = paymentUrl;
              // setIsloading(false);
              setLink(paymentUrl);
            })
            .catch((e) => {
              console.error(e);
              // setIsloading(false);
            }); */
        }}
        layout="vertical"
        className="items-center"
      >
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "enter amount to proceed" }]}
          label="enter amount (100 - 99999 INR)"
        >
          <Input
            type="number"
            placeholder="enter amount (100 - 99999 INR)"
            value={value}
            className="p-3 border-2 border-black rounded"
            onChange={(val) => setValue(val)}
          />
        </Form.Item>
        <div className="p-4">
          <Button
            type="ghost"
            color="success"
            size="large"
            block
            className="text-white font-bold"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            Proceed to Pay
          </Button>
        </div>
      </Form>
      {JSON.stringify(error)}
    </>
  );
}
