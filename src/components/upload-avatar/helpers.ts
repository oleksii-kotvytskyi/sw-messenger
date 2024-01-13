import type { RcFile } from "antd/es/upload/interface";

export const getUrlFromFile = (file: RcFile & { url?: string }) => {
  return new Promise((resolve: (v: string) => void, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = function () {
      const arrayBufferView = new Uint8Array(reader.result as ArrayBuffer);
      const blob = new Blob([arrayBufferView], { type: file.type });
      const fileURL = URL.createObjectURL(blob);

      resolve(fileURL);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const imageValidation = (url: string) => {
  return new Promise((resolve: (v: boolean) => void, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = function () {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (width > 400 && height > 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    img.onerror = (error) => reject(error);
  });
};
