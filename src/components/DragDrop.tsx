import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function DragDrop() {
    const [file, setFile] = useState<File | null>(null);
    const handleChange = (file: File) => {
        console.log(file);
        setFile(file);
    };
    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
}

