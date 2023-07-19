import { useState } from "react";
import "./index.css";
import { Button, Card, Form, Input, NoticeBar } from "antd-mobile";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../clientFirebase";
import { Link, useNavigate } from "react-router-dom";
import { TbLockAccess } from "react-icons/tb";
import {
  useAddPhoneNumberToUserMutation,
  useSignupUserMutation,
} from "../../features/api/apiSlice";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [callAddPhoneNumber] = useAddPhoneNumberToUserMutation();
  const [callSignup] = useSignupUserMutation();
  async function handleSignup(data) {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLoading(false);
        
        callSignup({data:user.user}).then((resp)=>{                    
          callAddPhoneNumber(data).then((res)=>{            
            navigate("/", { replace: true });
          });          
        });
        
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setError({ error: e });
      });
  }

  return (
    <div className="loginContainer">
      <Card
        style={{ padding: 20 }}
        className="drop-shadow-xl border-2 border-blue-300"
      >
        <img
          src="/logo.png"
          width="160"
          height="100"
          style={{ margin: "auto" }}
        />
        <p className="text-xl mb-2 mt-4">Create New Account</p>
        <Form form={form} onFinish={handleSignup}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "enter email address" },
              { type: "email", message: "Pleas enter a valid email address" },
            ]}
          >
            <Input
              className="bg-slate-100  p-2 border border-blue-200 rounded-md"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e)}
            />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              { required: true, message: "enter mobile number" },
              { min: 10, message: "Pleas enter a valid mobile number" },
            ]}
          >
            <Input
              className="bg-slate-100  p-2 border border-blue-200 rounded-md"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "enter password" }]}
          >
            <Input
              className="bg-slate-100 p-2 border border-blue-200 rounded-md"
              placeholder="Enter Password"
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
            loadingText="Finding User"
            onClick={() => {
              form.submit();
            }}
            color="primary"
            fill="outline"
            size="default"
            type="ghost"
          >
            Create Account
          </Button>
        </Form>
        <div className="p-2">
          <Link to={"/login"} className="text-slate-600 font-bold">
            Already have account yet ?
            <span className="text-blue-400"> login here</span>{" "}
          </Link>
        </div>
      </Card>
    </div>
  );
}
