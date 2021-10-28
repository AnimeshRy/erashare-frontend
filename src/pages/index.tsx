import DownloadFile from "@components/DownloadFile";
import DropzoneComponent from "@components/DropzoneComponent";
import EmailForm from "@components/EmailForm";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import { useState } from 'react';

export default function Home() {

    const [file, setFile] = useState(null);
    const [id, setId] = useState(null);
    const [downloadPageLink, setDownloadPageLink] = useState(null);
    const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

    const handleUpload = async () => {
        if (uploadState === "Uploading") return;
        setUploadState("Uploading")

        const formData = new FormData()
        formData.append("myFile", file)
        try {
            const { data } = await axios({
                method: "post",
                data: formData,
                url: "api/files/upload",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setDownloadPageLink(data.downloadPageLink)
            setId(data.id);
        } catch (error) {
            // console.log(error.response.data);
            setUploadState("Upload Failed")
        }
    }

    const resetComponent = () => {
        setFile(null)
        setDownloadPageLink(null)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl">Got a file? Share it with me</h1>
            <div className="flex flex-col items-center bg-gray-800 w-96 shadow-xl rounded-xl justify-center">
                {
                    !downloadPageLink &&
                    <DropzoneComponent setFile={setFile} />
                }
                {file &&
                    <RenderFile file={{
                        format: file.type.split("/")[1],
                        name: file.name,
                        sizeInBytes: file.size,
                    }} />
                }
                {!downloadPageLink && file && (
                    <button className="button" onClick={handleUpload}>{uploadState}</button>)
                }
                {
                    downloadPageLink && (
                        <div className="p-2 text-center">
                            <DownloadFile downloadPageLink={downloadPageLink} />
                            <EmailForm id={id} />
                            <button className="button"
                                onClick={resetComponent}
                            >Upload New File
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}
