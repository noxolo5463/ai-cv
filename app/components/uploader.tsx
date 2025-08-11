import { on } from "events";
import type { JSX } from "react";
import React, {use, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
};

const FileUploader: ({onFileSelect}: FileUploaderProps) => JSX.Element = ({ onFileSelect }) => {
    
    const [file, setFile] = useState<File | null>(null);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0];
        onFileSelect?.(file);
    }, [onFileSelect]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="w-full gradient-border">
            <input {...getInputProps()} />
            <div className="space-y-4 cursor-pointer">
                <div className="mx-auto w-16 h-16 flex items-center justify-center">
                    <img src="/icons/info.svg" alt="upload" className="size-20" />
                </div>

                {
                    file ? (<></>):(<div>
                        <p className="text-lg text-gray-500">
                            <span className="form-semibold">
                                click to upload 

                            </span> or drag and drop your resume here
                        </p>
                        <p className="text-lg text-gray-500">
                            PDF (20MB max)
                        </p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FileUploader;