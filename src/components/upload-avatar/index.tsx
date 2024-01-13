import { Modal, Upload, message } from "antd";
import { useState } from "react";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
// import s from "./style.module.scss";
import { getUrlFromFile, imageValidation } from "./helpers";

export const UploadAvatar = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onRemove = () => {
    setFileList([]);
  };

  const beforeUpload = async (file: RcFile & { url?: string }) => {
    const fileUrl = await getUrlFromFile(file);
    const isImageValid = await imageValidation(fileUrl);

    if (!isImageValid) {
      message.error("Please provide IMG bigger 400px/400px");
      return Upload.LIST_IGNORE;
    }

    file.url = fileUrl;
    setFileList([file]);

    return true;
  };

  const handleCancel = () => setIsPreviewOpen(false);

  return (
    <>
      <Upload
        listType="picture-card"
        name="file"
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        customRequest={({ onSuccess }) => {
          //  we don't have real API, therefore, the workaround will be to fire a "dummy" fn
          if (onSuccess) onSuccess("ok");
        }}
        accept="image/png, image/jpeg, image/svg+xml"
        multiple={false}
        maxCount={1}
        onPreview={() => {
          setIsPreviewOpen(true);
        }}
      >
        Upload
      </Upload>
      {fileList.length > 0 && (
        <Modal
          open={isPreviewOpen}
          title={fileList[0].name}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={fileList[0].url} />
        </Modal>
      )}
    </>
  );
};
