import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import PropTypes from 'prop-types'



export default function DragDropImage({setFileDrag}) {
    const [file, setFile] = useState(null);
    const fileTypes = ["JPG", "PNG", "GIF","JFIF"];
    console.log("File drag and drop",file);
    const handleChange = (file) => {
      setFile(file);
      setFileDrag(file);
    };
    return (
        <div className="">
            <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>

        </div>
    );
}

DragDropImage.propTypes={
    setFileDrag:PropTypes.func
}
