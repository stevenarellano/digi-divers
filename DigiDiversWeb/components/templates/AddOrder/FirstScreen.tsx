import React, { useEffect } from 'react';
import styles from '/styles/modules/AddOrder.module.scss';
import { AddOrderFormData, COST_PER_LABEL, SOL_TO_USD, addOrderFormState } from '../../../context';
import { useRecoilState } from 'recoil';
import FileInput from './FileInput';
import JSZip from 'jszip';


async function countFilesInZip(zipFile: File) {
    const zip = new JSZip();
    return zip.loadAsync(zipFile)
        .then(zip => {
            return Object.keys(zip.files).length; // IDK FOR SOME REASON IT RETUNRS 2X THE NUMBER OF FILES
        });
}

const FirstScreen: React.FC<{ onNext: (data?: any) => void; }> = ({ onNext }) => {
    const [formData, setFormData] = useRecoilState<AddOrderFormData>(addOrderFormState);

    useEffect(() => {
        if (formData.modelType === '') {
            setFormData({
                ...formData,
                modelType: 'imageClassification'
            });
        }
    }, [formData, formData.modelType, setFormData]);

    const handleInputChange = (event: React.ChangeEvent<any>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileInputChange = async (file: File) => {
        const imageCount = await countFilesInZip(file);
        setFormData({
            ...formData,
            imageFilesZip: file,
            dataCount: (imageCount === 0) ? null : imageCount
        });
        console.log(file);
        // console.log({
        //     ...formData,
        //     imageFilesZip: file,
        //     dataCount: (imageCount === 0) ? null : imageCount
        // });

        // calculate how many file there are in the zip

        // downloadFile(file);
    };

    const handleNextClick = () => {
        onNext();
    };


    return (
        <div className={styles.container}>
            <div className={styles.title}>Upload a new dataset to be annotated!</div>
            <div className={styles.subtitle}>
                We will send your data to our Digidivers game where we
                incentive millions of user to label data accurately while
                blocking malicious users from the system.
            </div>
            <form autoComplete="off" className={styles.formA}>
                <div className={styles.leftCol}>
                    <div className={styles.textInput}>
                        <label>Dataset name</label>
                        <input
                            placeholder="Dog binary classification"
                            type="text"
                            name="datasetName"
                            value={formData.datasetName}
                            onChange={handleInputChange} />
                    </div>
                    <div className={styles.selectInput}>
                        <label>Model Type</label>
                        <select name="modelType" value={formData.modelType} onChange={handleInputChange}>
                            <option value="imageClassification">Image Classification</option>
                            <option value="objectDetection">Object Detection</option>
                        </select>

                    </div>
                    {/* THE BELOW TO MAYBE BE IMPLMENTED */}
                    {/* <div className={styles.numberInput}> 
                        <label>Required Reviews</label>
                        <input type="number" name="requiredReviews" value={formData.requiredReviews} onChange={handleInputChange} />
                    </div> */}
                </div>
                <div className={styles.rightCol}>
                    <FileInput
                        updateFormFileData={handleFileInputChange}
                        label="Image zip"
                        defaultFile={formData.imageFilesZip}
                    />
                </div>
                <div className={styles.bottomBar}>
                    <div >
                        {formData.dataCount !== null ? `${formData.dataCount * COST_PER_LABEL} SOL TOTAL` : "Cost: n/a"}
                        <div style={{ marginLeft: '4px', fontSize: ".5rem" }}>
                            {formData.dataCount !== null ? `(${(COST_PER_LABEL * SOL_TO_USD).toFixed(3)} USD/Label)` : ""}
                        </div>
                    </div>
                    <button type="button" onClick={handleNextClick}>
                        Next page
                    </button>
                </div>
            </form>
        </div>

    );
};

export default FirstScreen;