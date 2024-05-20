import { useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { convertFileToUrl } from "@/lib/utils";

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(convertFileToUrl(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "/icons/profile.png"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:base-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

ProfileUploader.propTypes = {
  fieldChange: PropTypes.func.isRequired,
  mediaUrl: PropTypes.string,
};

export default ProfileUploader;
