import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { UploadAvatar } from "@/components/upload-avatar";
import type { RcFile } from "antd/es/upload/interface";
import s from "./style.module.scss";
import XRegExp from "xregexp";

export const SignIn = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onFinish = (values: {
    name: string;
    file: RcFile & { url: string };
  }) => {
    console.log("SUCCESS", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Create profile to start messaging"
      open={isOpen}
      onOk={() => setIsOpen(!isOpen)}
      closeIcon={false}
      footer={null}
      wrapClassName={s.wrapper}
      classNames={{
        body: s.modalBody,
      }}
    >
      <Form
        wrapperCol={{ span: 12 }}
        className={s.modalBodyForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              validator(_rule, value: string) {
                const regExp = new XRegExp("^[\\p{L}0-9_]+$") as RegExp;
                // check characters in all languages,
                // more info https://stackoverflow.com/questions/150033/regular-expression-to-match-non-ascii-characters/873600#873600 and https://xregexp.com/api/

                if (!value)
                  return Promise.reject(new Error("Name is required"));

                if (!regExp.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Should be only numbers, characters and underline symbol"
                    )
                  );
                }

                if (value.length < 8 || value.length > 12)
                  return Promise.reject(
                    new Error(
                      "Name must be at least 8 and less then 12 characters"
                    )
                  );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Avatar">
          <UploadAvatar />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button key="submit" type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
