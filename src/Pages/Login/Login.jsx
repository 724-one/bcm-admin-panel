import { Form, Input, Button, Spin } from "antd";
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

const Login = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  const handleLogin = () => {
    // setIsAuthenticated(true);
    navigate("/users");
  };
  return (
    <div className="login-container">
      <div className="login-top mb-6">
        <h4 className="heading-login">Welcome</h4>
      </div>

      <div className="form-items">
        <Form
          name="login"
          layout="vertical"
          className="input-item"
          // onFinish={onFinish}
        >
          <Form.Item
            label={<span className="font-semibold text-[16px]">Email</span>}
            // label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the correct email" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter the correct email"
              }
            ]}
          >
            <Input
              className="ant-input-login  placeholder h-14"
              prefix={<HiOutlineMail className="prefix-icon" />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-[16px]">Password</span>}
            name="password"
            // name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              className="ant-input-login   placeholder h-14"
              prefix={<FiLock className="prefix-icon" />}
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? (
                  <LuEye
                    style={{
                      color: "#ED4B4B",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <LuEyeOff
                    className="prefix-icon"
                    style={{
                      color: "#ED4B4B",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                  />
                )
              }
            />
          </Form.Item>
          {/* <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the correct email" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for validating email
                message: "Please enter the correct email"
              }
            ]}
            // rules={[{ required: true, message: "Please input your Email!" }]}
            className="radial-gradient-input"
          >
            <Input
              className="ant-input-login"
              prefix={<HiOutlineMail className="prefix-icon" />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              className="ant-input-login"
              prefix={<FiLock className="prefix-icon" />}
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? (
                  <HiOutlineEye
                    style={{
                      color: "#ED4B4B",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <HiOutlineEyeOff
                    className="prefix-icon"
                    style={{
                      color: "#ED4B4B",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                  />
                )
              }
            />
          </Form.Item> */}

          <Form.Item>
            <div className="login-button">
              <Button
                className="primary-btn p-2 "
                type="primary"
                htmlType="submit"
                block
                onClick={handleLogin}
                // loading={loading}
              >
                {/* {loading ? ( */}
                <div className="loader-container font-semibold text-[20px] line-height-[36px]">
                  {/* <Spin size="small" /> */}
                </div>
                {/* ) : ( */}{" "}
                <span className="loader-container font-semibold text-[22px] line-height-[36px]">
                  Login
                </span>
                {/* )} */}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
