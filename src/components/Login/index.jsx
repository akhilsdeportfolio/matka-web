import { useState } from "react";
import "./index.css";
import { Button, Card, Form, Input, NoticeBar } from "antd-mobile";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../clientFirebase";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar";
import { TbBrandFacebook, TbBrandGoogle, TbLockAccess } from "react-icons/tb";
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton, createButton } from "react-social-login-buttons";
import SecurePayments from "../SecurePayments";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  
  async function handleLogin() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (e) {
      setLoading(false);
      setError({ error: e });
    }
  }

  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <Card style={{ padding: 20 }} className="drop-shadow-2xl">
          <img
            src="logo.png"
            width="160"
            height="100"
            style={{ margin: "auto" }}
          />
          <p className="text-xl mb-2 mt-4">{t("login")}</p>
          <p className="text-xs mb-2">{t("Please Login to continue")}</p>
           <Form form={form} onFinish={handleLogin}>
            <Form.Item
              label={t("Email Address")}
              name="email"
              rules={[
                { required: true, message: t("enter email") },
                { type: "email", message: "Pleas enter a valid email address" },
              ]}
            >
              <Input
                className="bg-slate-100  p-2 border border-blue-200 rounded-md"
                placeholder={t("enter email")}
                value={email}
                onChange={(e) => setEmail(e)}
              />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[{ required: true, message: t("enter password") }]}
            >
              <Input
                className="bg-slate-100 p-2 border border-blue-200 rounded-md"
                placeholder={t("enter password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e)}
              />
            </Form.Item>
            {error && (
              <NoticeBar
                style={{
                  "--background-color": "transparant",
                  "--border-color": "transparant",
                  "--text-color": "red",
                  paddingLeft: "20%",
                }}
                icon={<TbLockAccess />}
                content={error.error.code}
                color="error"
              />
            )}
            <Button
              className="font-bold mt-2"
              loading={loading}
              loadingText={t("Finding User")}
              color="primary"
              fill="outline"
              size="default"
              type="ghost"
            >
              {t("proceed to login")}
            </Button>            
            
          </Form> */          
          <div className="p-2">
            <Link to={"/signup"} className="text-slate-600 font-bold">
              {t("noAccount")}
              <span className="text-blue-400"> {t("signup")}</span>
            </Link>
            <div className="mt-2" />
            <Link to={"/forgot"} className="text-slate-600 font-bold">
              {t("forgotPassword")}
            </Link>
          </div>
        </Card>        
      </div>
      <SecurePayments/>
    </>
  );
}
