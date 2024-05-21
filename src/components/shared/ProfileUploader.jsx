import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      fieldChange("file", acceptedFiles);
      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer flex-center gap-4">
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex items-center gap-4">
        <img
          src={fileUrl || "/icons/profile.png"}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:base-semibold text-gray-700">
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
