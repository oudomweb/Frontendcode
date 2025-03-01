import React, { useState } from "react";
import { Form, Button, message, Input} from "antd";
import { request } from "../../util/helper";
import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (item) => {
    setLoading(true);
    const param = { username: item.username, password: item.password };

    try {
      const res = await request("auth/login", "post", param);
      if (res && !res.error) {
        setAcccessToken(res.access_token);
        setProfile(JSON.stringify(res.profile));
        setPermission(JSON.stringify(res.permission));
        if (res.profile?.user_id) {
          localStorage.setItem("user_id", res.profile.user_id);
        }
        navigate("/");
        message.success("Login successful!");
      } else {
        message.error("Login failed! Please check your username and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="https://i.pinimg.com/736x/82/30/de/8230deba7a5660a77d80a830eb20377a.jpg" alt="Logo" className=" img_logo h-20" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <Form layout="vertical" form={form} onFinish={onLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input className="rounded-lg" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password className="rounded-lg" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} className="rounded-lg">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;