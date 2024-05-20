import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { CameraIcon } from "@heroicons/react/24/solid";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [files, setFiles] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(mediaUrl);

  FileUploader.propTypes = {
    fieldChange: PropTypes.func.isRequired,
    mediaUrl: PropTypes.string,
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Update state with the dropped files
      setFiles(acceptedFiles);
      // Call the fieldChange function to pass the dropped files to the parent component
      fieldChange(acceptedFiles);
      // Read the uploaded image and set its URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImageUrl(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`border border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer ${
        isDragActive ? "bg-gray-100" : ""
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {files.length === 0 && !mediaUrl && (
        <>
          <CameraIcon className="mx-auto w-12 h-12 text-gray-500 mb-2" />
          <p className="text-gray-500">
            Drag &amp; Drop your photo here, or click to select one.
          </p>
        </>
      )}
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Uploaded"
          className="mx-auto max-w-full h-auto mb-2 rounded-md"
        />
      )}
      {files.length > 0 && (
        <div>
          {files.map((file) => (
            <p key={file.name} className="text-gray-500">
              Selected: {file.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
