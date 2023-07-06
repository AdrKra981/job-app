import { Button, Col, Form, Row } from "antd";
import React from "react";

function EducationInput() {
  return (
    <div
      style={{
        marginTop: 35,
      }}
    >
      <h1 className="text-md">Education</h1>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 16]} align="bottom">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "qualification"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Qualification"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "institution"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Institution"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "rate"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Rate"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <i
                  className="ri-delete-bin-line"
                  onClick={() => remove(name)}
                />
              </Row>
            ))}
            <Form.Item className="my-2">
              <Button type="dashed" onClick={() => add()} block>
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default EducationInput;
