import React from "react";
import { Button, Col, Form, Row } from "antd";

function SkillsInput() {
  return (
    <div
      style={{
        marginTop: 35,
      }}
    >
      <h1 className="text-md">Skills</h1>
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 16]} align="bottom">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "technology"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Technology"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                    label="Rating"
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
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default SkillsInput;
