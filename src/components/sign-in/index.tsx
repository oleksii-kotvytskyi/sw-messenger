import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { UploadAvatar } from "@/components/upload-avatar";
import type { RcFile } from "antd/es/upload/interface";
// import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import s from "./style.module.scss";
import XRegExp from "xregexp";
import { signIn, addUserToList } from "@/store/reducers/users";
import { IUser } from "@/store/types";
import { stateToServiceWorker } from "@/helpers";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  file: RcFile & { url: string };
};

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const [isOpen, setIsOpen] = useState(!activeUser);
  const sw = navigator.serviceWorker;

  useEffect(() => {
    if (sw) {
      sw.addEventListener("message", ({ data }: { data: IUser | string[] }) => {
        if (data !== undefined && (data as IUser).name)
          dispatch(addUserToList(data as IUser));
      });
    }
  }, [dispatch, sw]);

  const onSubmit = (values: FormValues) => {
    if (users.find((user) => user.name === values.name)) {
      message.error("User with this name already exist.");
      return;
    }
    const user = { name: values.name, avatar: values.file?.url, online: true };

    dispatch(signIn(user));
    stateToServiceWorker(user);

    message.success("User was successfully created");
    setIsOpen(false);

    navigate("/app");
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
      <Form<FormValues>
        name="basic"
        wrapperCol={{ span: 12 }}
        className={s.modalBodyForm}
        onFinish={onSubmit}
        autoComplete="on"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              validator(_rule, value: string) {
                const regExp = new XRegExp("^[\\p{L}0-9_]+$") as RegExp;
                // check characters in all languages
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

                return Promise.resolve();
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
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
