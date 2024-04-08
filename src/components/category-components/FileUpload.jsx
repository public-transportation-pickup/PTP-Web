import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";


export default function FileUpload() {
  const [file,setFile]=useState([]);
  const [preview,setPreview]=useState();
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFile((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <div className="w-20 h-10 border-dashed border-4 bg-orange-200 hover:opacity-90">
        <div>
          <label className="" htmlFor="file">
          <HiOutlineCloudUpload />
          <input accept="image/*" type="file" name="file" onChange={(e)=>handleChange(e)} className="hidden" multiple={false}/>
          </label>
          {preview? (
                        <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                        {console.log("File map: ",preview)}
                                        <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
                                    </div>
                        ):(<>
                            <div className="rounded-full bg-purple-300 w-28 h-28 mx-auto"></div>
                        </>)}
        </div>
      </div>
    </div>
  )
}
