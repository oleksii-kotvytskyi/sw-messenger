import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { UploadAvatar } from "@/components/upload-avatar";
import type { RcFile } from "antd/es/upload/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import s from "./style.module.scss";
import XRegExp from "xregexp";
import { signIn } from "@/store/reducers/users";
import { IUser } from "@/store/types";
import { stateToServiceWorker } from "@/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { appPath } from "@/pages/urls";

type FormValues = {
  name: string;
  file: RcFile & { url: string };
};

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const users = useAppSelector((state) => state.users.data);
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const [isOpen, setIsOpen] = useState(!activeUser);

  if (activeUser) return <Navigate to={appPath} />;

  const onFinish = async (values: FormValues) => {
    let fileData: Record<string, string> | undefined = undefined;

    if (values.file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      fileData = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_PROJECT
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      setIsLoading(false);
    }

    if (users.find((user) => user.name === values.name)) {
      message.error("User with this name already exist.");
      return;
    }

    const user: IUser = {
      name: values.name,
      avatar: fileData?.url,
      online: true,
      created: new Date(),
    };

    dispatch(signIn(user));
    stateToServiceWorker({
      data: user,
      type: "log-in",
      shouldBePosted: true,
    });

    message.success("User was successfully created");
    setIsOpen(false);

    navigate(appPath);
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
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              validator(_rule, value: string) {
                // @ts-ignore
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
          <Input disabled={isLoading} />
        </Form.Item>
        <Form.Item label="Avatar" name="file">
          <UploadAvatar disabled={isLoading} />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
