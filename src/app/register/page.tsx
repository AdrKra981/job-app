"use client";

import Loader from "@/components/Loader";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state: any) => state.loaders);

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.post("api/users/register", values);
      message.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-450">
        <h1 className="text-xl">Register</h1>
        <hr />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Register As" name="userType">
            <Radio.Group>
              <Radio value="employeer">Employeer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Name" name="name">
            <input type="text" className="input" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <Link href="/login">You already have a account? Login</Link>
        </Form>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Register;
