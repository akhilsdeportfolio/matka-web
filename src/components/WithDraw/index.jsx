import { Button, Form, Input, NavBar, Toast } from "antd-mobile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateWithDrawMutation } from "../../features/api/apiSlice";
import { formatMoney } from "../../utils/money";
import {
  isValidNumberForRegion,  
  parsePhoneNumber,
} from "libphonenumber-js";
import { useTranslation } from "react-i18next";

export default function WithDraw() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const userBalance = useSelector((store) => store.user.balance) / 100;
  const [callWithDrawApi] = useCreateWithDrawMutation();  
  const {t}=useTranslation();

  function isValidPhoneNumber(_, phoneNumber) {
    if (!phoneNumber) return Promise.resolve();

    if (phoneNumber.length > 5) {
      const number = parsePhoneNumber("+91" + phoneNumber);
      if (isValidNumberForRegion(number.number, "IN")) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Invalid phone Number"));
      }
    } else {
      return Promise.reject(new Error("Invalid phone Number"));
    }
  }

  function isValid_IFSC_Code(_, ifsc_Code) {
    // Regex to check valid
    // ifsc_Code
    let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);

    // if ifsc_Code
    // is empty return false
    if (ifsc_Code == null) {
      return Promise.reject(new Error("Invalid IFSC code"));
    }

    // Return true if the ifsc_Code
    // matched the ReGex
    if (regex.test(ifsc_Code) == true) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Invalid IFSC code"));
    }
  }

  const customValidator = (_, value) => {
    if (!value) {
      return Promise.reject(
        new Error("You don't have enough balance in your account.")
      );
    }

    const currentValue = Number(value);
    if (currentValue > userBalance) {
      return Promise.reject(
        new Error("You don't have enough balance in your account.")
      );
    } else {
      return Promise.resolve();
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
        {t('withdraw')}
      </NavBar>
      <div className="" />
      <p className="p-3 mb-2 text-base font-bold">
        {t('Instant With Draw')}
        <span className="text-xs text-gray-400">{t('(15-30 mins)')}</span>
      </p>
      <Form
        form={form}
        onFinish={(data) => {
          setIsloading(true);
          callWithDrawApi(data).then((resp) => {
            if (resp.error) {
              Toast.show(resp?.error?.data?.error || "something went wrong");
              setIsloading(false);            
            }

            if (!resp.error) {
              Toast.show("Withdrawl request placed successfully");
              navigate("/", { replace: true });
              setIsloading(false);
            }
          });
        }}
        layout="vertical"
        className="items-center"
      >
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: t("field required") },
            {
              validator: isValidPhoneNumber,
              message: "not a valid phone number",
            },
          ]}
          label={t("Enter Mobile Number")}
        >
          <Input
            type="number"
            placeholder={t("Enter Mobile Number")}
            className="p-3 border-2 border-black rounded"
          />
        </Form.Item>
        <Form.Item
          name="acountNumber"
          rules={[
            { required: true, message: t("Enter Account Number") },
          ]}
          label={t("Enter Account Number")}
        >
          <Input
            type="number"
            placeholder={t("Enter Account Number")}
            className="p-3 border-2 border-black rounded"
          />
        </Form.Item>
        <Form.Item
          name="ifsc"
          rules={[
            { required: true, message: t("Enter IFSC code") },
            { validator: isValid_IFSC_Code, message: t("Invalid IFSC Code") },
          ]}
          label={t("Enter IFSC code")}
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
              message: t("enter amount to proceed"),
            },
            {
              validator: customValidator,
              message: t("Not enough funds in your account"),
            },
          ]}
          label={t("Enter amount minimum ₹100")}
        >
          <Input
            type="number"
            placeholder={t("Enter amount minimum ₹100")}
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
            {t('Proceed to Withdraw')}
          </Button>
          <div className="p-2" />
        </div>
      </Form>
    </>
  );
}
