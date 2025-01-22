import { Form, Input, Button, Spin, message } from "antd";
import "../../styles/Login/Login.scss";
// import { image } from "../../assets/image";
import { GrMail } from "react-icons/gr";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { LuEye, LuEyeOff } from "react-icons/lu";
// import { useLogin } from "../../hooks/useHook";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Login successful!");
      navigate("/users");
      setLoading(false);
    } catch (error) {
      console.error("Login failed: ", error);
      setLoading(false);
      message.error("Invalid email or password.");
    }
  };
  return (
    <div className="login-container">
      <div className="login-top mb-6">
        <h4 className="heading-login">Welcome</h4>
      </div>

      <div className="form-items">
        <Spin spinning={loading}>
          <Form
            name="login"
            layout="vertical"
            className="input-item"
            onFinish={handleLogin} // Callback for form submission
          >
            {/* Email Field */}
            <Form.Item
              label={<span className="font-semibold text-[16px]">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                className="ant-input-login placeholder h-14"
                prefix={<HiOutlineMail className="prefix-icon" />}
                placeholder="Enter your email address"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={
                <span className="font-semibold text-[16px]">Password</span>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                className="ant-input-login placeholder h-14"
                prefix={<FiLock className="prefix-icon" />}
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? (
                    <LuEye
                      style={{
                        color: "#ED4B4B",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <LuEyeOff
                      className="prefix-icon"
                      style={{
                        color: "#ED4B4B",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  )
                }
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                className="primary-btn p-2 loader-container font-semibold text-[22px] line-height-[36px]"
                type="primary"
                htmlType="submit" // Ensures form submission
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
