import { Button, Form, Input, NavBar } from "antd-mobile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateWithDrawMutation } from "../../features/api/apiSlice";

export default function WithDraw() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const userBalance = useSelector((store) => store.user.balance) / 100;
  const [callWithDrawApi,]=useCreateWithDrawMutation();

  const customValidator = (_, value) => {
    if (!value) {
      throw new Error("");
    }

    const currentValue = Number(value);
    if (currentValue > userBalance) {
      return Promise.reject(new Error("You don't have enough balance in your account."));
    } else {
      return Promise.resolve()
    }
  };

  return (
    <>
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        className="bg-emerald-500 text-white"
      >
        Instant With Draw
      </NavBar>
      <div className="py-8" />
      <Form
        form={form}
        onFinish={(data) => {
          setIsloading(true);          
          callWithDrawApi(data)
        }}
        layout="vertical"
        className="items-center"
      >
        <Form.Item
          name="mobile"
          rules={[{ required: true, message: "Enter Phone Number to proceed" }]}
          label="Enter Mobile Number"
        >
          <Input
            type="number"
            placeholder="enter mobile number"
            className="p-3 border-2 border-black rounded"
          />
        </Form.Item>
        <Form.Item
          name="acountNumber"
          rules={[
            { required: true, message: "Enter Account Number to proceed" },
          ]}
          label="Enter Account Number"
        >
          <Input
            type="number"
            placeholder="enter mobile number"
            className="p-3 border-2 border-black rounded"
          />
        </Form.Item>
        <Form.Item
          name="ifsc"
          rules={[{ required: true, message: "Enter IFSC Code" }]}
          label="Enter IFSC code"
        >
          <Input
            type="text"
            placeholder="enter mobile number"
            className="p-3 border-2 border-black rounded"
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: "enter amount to proceed",
            },
            {
              validator: customValidator,
              message: "You dont have enough funds in your account",
            },
          ]}
          label="Enter amount (100 - 99999 INR)"
        >
          <Input
            type="number"
            placeholder="enter amount (100 - 99999 INR)"
            className="p-3 border-2 border-black rounded"
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
            Proceed to Withdraw
          </Button>
          <div className="p-2" />
        </div>
      </Form>
    </>
  );
}
