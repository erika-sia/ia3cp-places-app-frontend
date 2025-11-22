import React, { useRef, useState, useEffect } from "react";
import Button from "../UI/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let userFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      userFile = event.target.files[0];
      setFile(userFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, userFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Uploaded File Preview" />}
          {!previewUrl && <p>Please choose an image.</p>}
          {!isValid && props.errorText && <p className="error-text">{props.errorText}</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Choose an Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
