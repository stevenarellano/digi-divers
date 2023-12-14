import React, { useState } from 'react';
import styles from '/styles/modules/AddOrder.module.scss';
import { Zip } from '../../../public';


interface FileInputProps { label: string; updateFormFileData: any; allowedExtensions?: string[]; defaultFile?: File | null; }

const FileInput: React.FC<FileInputProps> = ({ label, updateFormFileData, allowedExtensions = ['application/zip'], defaultFile = null }) => {
    const [file, setFile] = useState<File | null>(defaultFile);

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            updateFormFileData(event.target.files[0]);
        }
    };

    return (
        <div className={styles.fileInput}>
            <label>{label}</label>
            <div className={styles.fileInputContainer}>
                <label htmlFor="fileInput" className={styles.fileInputLabel}>
                    <Zip />
                    {file ? (
                        <span>{file.name}</span>
                    ) : (
                        <span>Drag your data here</span>
                    )}
                </label>
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleFilesChange}
                    className={styles.fileInputBox}
                    accept={allowedExtensions.join(', ')} />
            </div>
        </div>
    );
};


export default FileInput;