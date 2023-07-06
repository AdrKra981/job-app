import { Col, Form, Row } from "antd";
import React from "react";
import EducationInput from "./EmployeeFormHelpers/EducationInput";
import SkillsInput from "./EmployeeFormHelpers/SkillsInput";
import ExperienceInput from "./EmployeeFormHelpers/ExperienceInput";

function EmployeeForm() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Phone" name="phone">
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Carrier Objective" name="carrierObjective">
            <textarea />
          </Form.Item>
        </Col>
      </Row>

      <EducationInput />

      <SkillsInput />

      <ExperienceInput />
    </>
  );
}

export default EmployeeForm;
