import React from "react";
import { Button, Col, Form, Row } from "antd";

function ExperienceInput() {
  return (
    <div
      style={{
        marginTop: 35,
      }}
    >
      <h1 className="text-md">Experience</h1>
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 16]} align="bottom">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "company"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Company"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "role"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Role"
                  >
                    <input type="role" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "period"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Period of Work"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <i
                  className="ri-delete-bin-line"
                  onClick={() => remove(name)}
                ></i>
              </Row>
            ))}
            <Form.Item className="my-2">
              <Button type="dashed" onClick={() => add()} block>
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ExperienceInput;
