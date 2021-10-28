import React, { Dispatch, useCallback, FunctionComponent } from 'react'
import { useDropzone } from 'react-dropzone'

const DropzoneComponent: FunctionComponent<{ setFile: Dispatch<any> }> = ({ setFile }) => {

    const onDrop = useCallback(
        (acceptedFiles) => {
            // console.log(acceptedFiles);
            setFile(acceptedFiles[0]) // Get the first Value
        },
        [],
    )

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone(
        {
            onDrop,
            multiple: false,
            accept: "image/jpeg,image/png,audio/mpeg",
        }
    )

    return (
        <div className="p-4 w-full">
            <div {...getRootProps()} className="w-full h-80 rounded-md cursor-pointer focus:outline-none">
                <input {...getInputProps()} />
                <div className={"flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl h-full space-y-3 "
                    + (isDragReject === true ? "border-red-500" : "")
                    + (isDragAccept === true ? "border-green-500" : "")
                }>
                    <img src="folder.png" alt="folder" className="h-16 w-16" />
                    {
                        isDragReject ? (<p> Sorry, this apply only supports images and mpeg </p>) :
                            (<>
                                <p>Drag and Drop Files Here</p>
                                <p className="mt-2 text-base text-gray-300">Only jpeg, png and mp3 files supported</p>
                            </>
                            )}
                </div>
            </div>
        </div>
    )
}

export default DropzoneComponent
