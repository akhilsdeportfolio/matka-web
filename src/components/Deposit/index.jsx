/* eslint-disable no-unused-vars */
import { Button, Form, Input, NavBar, Toast,  } from "antd-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import {
  usePhonePeGatewayQrMutation,  
} from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { paymentCreated } from "../../features/payments";
import { formatMoney } from "../../utils/money";
import { useTranslation } from "react-i18next";

export default function Deposit() {
  const navigate = useNavigate();
  const [value, setValue] = useState(200);
  const [callQr] = usePhonePeGatewayQrMutation();
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {t}=useTranslation();


  return (
    <>
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        className="bg-emerald-500 text-white"
      >
        {t('deposit')}
      </NavBar>      
      <div className="" />
      <p className="p-3 mb-2 text-base font-bold">
        {t('Instant Deposit')}
        <span className="text-xs text-gray-400">{t('(amount added to wallet instantly)')}</span>
      </p>
      <Form
        form={form}
        onFinish={(data) => {
          setIsloading(true);

          /* callPhonepe({ amount: data.amount * 100 })
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
            }); */


            callQr({amount:data.amount*100}).then((resp)=>{
              
              if(resp.error)
              {                 
                setIsloading(false)
                Toast.show(resp.error.data.e.error.description)
                return ;
              }

              setIsloading(false);
              dispatch(paymentCreated({amount:data.amount,...resp.data.data}))
              navigate(`/payments/${resp.data.data.merchantTransactionId}`)   
              

            });


          /* vpaCollect({ amount: data.amount * 100 })
            .then((resp) => {
              if (resp.error) {
                Toast.show("Error Code " + resp.error.status);
                setIsloading(false);
                setError(resp.error);
              } else {
                const { merchantTransactionId } = resp.data.data;                
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
          rules={[{ required: true, message: "enter amount to proceed" },{min:3,message:'please deposit atleast 100 rs'}]}
          label={t('Enter amount minimum ₹100')}
        >
          <Input
            type="number"
            placeholder={t('Enter amount minimum ₹100')}
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
            {t('Proceed to Pay')}
          </Button>
        </div>
      </Form>              
    </>
  );
}
