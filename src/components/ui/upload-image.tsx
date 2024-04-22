import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { getImageURL } from "@/lib/utils";

interface IProfileUpload {
  fieldChange: (files: File) => void;
  mediaURL: string;
}

export const ProfileUpload = ({ fieldChange, mediaURL }: IProfileUpload) => {
  const [fileUrl, setFileUrl] = useState(getImageURL(mediaURL, "avatar"));

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      fieldChange(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fileUrl],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: onDrop,
    onDropRejected: () => {
      //   form.setError("image", {
      //     message: "This photo is too large. Please try another one.",
      //   });
    },
    accept: {
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    maxSize: 1024 * 1024 * 10,
    multiple: false,
    onError: (error) => {
      //   form.setError("image", {
      //     message: error.message,
      //   });
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex-center cursor-pointer gap-6">
        <img
          src={fileUrl || '/images/DefaultAvatar/Empty_Group_Image.png'}
          alt="image"
          className="size-24 rounded-full object-cover object-top"
        />
        <Button type="button" className="small-regular md:base-semibold">
          Change profile photo
        </Button>
      </div>
    </div>
  );
};