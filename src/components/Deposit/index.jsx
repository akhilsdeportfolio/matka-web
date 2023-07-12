import { Button, Form, Input, NavBar } from "antd-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useInitiatePaymentMutation } from "../../features/api/apiSlice";
import { auth } from "../../clientFirebase";

export default function Deposit() {
  const navigate = useNavigate();
  const [value, setValue] = useState(200);
  const [callInitPayment] = useInitiatePaymentMutation();
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        className="bg-blue-500 text-white"
      >
        Deposit Money
      </NavBar>
      <div className="py-8" />
      <Form
        form={form}
        onFinish={(data) => {
          setIsloading(true);
          callInitPayment({ amount: data.amount * 100 })
            .then((resp) => {
              window.open(
                "https://cashier.mhprop.solutions/pay/" +
                  resp.data.data._id +
                  "/" +
                  auth.currentUser.uid,
                "_blank"
              );

              setIsloading(false);
            })
            .catch((e) => {
              console.error(e);
              setIsloading(false);
            });
        }}
        layout="vertical"
        className="items-center"
      >
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "enter amount to proceed" },
            { max: 5, message: "maximum deposit amount is 99,999" },
            { min: 3, message: "minimum deposit amount is 100" },
          ]}
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
    </>
  );
}
