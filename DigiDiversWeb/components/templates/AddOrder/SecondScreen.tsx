import React from 'react';
import styles from '/styles/modules/AddOrder.module.scss';
import { AddOrderFormData, COST_PER_LABEL, SOL_TO_USD, addOrderFormState } from '../../../context';
import { useRecoilState } from 'recoil';
import FileInput from './FileInput';



const SecondScreen: React.FC<{ onBack: () => void; onSubmit: (data: any) => void; }> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useRecoilState<AddOrderFormData>(addOrderFormState);
    const [loading, setLoading] = React.useState(false);

    const placeholder = "Is this an image of a dog?";
    const handleInputChange = (event: React.ChangeEvent<any>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageDataChange = (file: File) => {
        setFormData({
            ...formData,
            imageData: file,
        });
    };

    const handleLabelledMappingChange = (file: File) => {
        setFormData({
            ...formData,
            labelledMapping: file,
        });
    };

    const handleUploadClick = async () => {
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);

    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Help guide your annotators!</div>
            <div className={styles.subtitle}>
                We require instructions and a few pieces of labeled data from your data set to
                provide you with the most accurate data, in a cost efficient manner.
                We will parse your csv file to determine what the options provided to the user are.
            </div>
            <form autoComplete="off" className={styles.formB}>

                <div className={styles.instructions}>
                    <div className={styles.textInput}>
                        <label>Instructions</label>
                        <input
                            placeholder={placeholder}
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className={styles.leftCol}>
                    <FileInput
                        updateFormFileData={handleImageDataChange}
                        label="Images zip"
                        defaultFile={formData.imageData}
                    />
                </div>
                <div className={styles.rightCol}>
                    <FileInput
                        allowedExtensions={["text/csv"]}
                        updateFormFileData={handleLabelledMappingChange}
                        defaultFile={formData.labelledMapping}
                        label="Labeled mapping"
                    />
                </div>
                <div className={styles.bottomBar}>
                    <button type="button" onClick={onBack}>
                        Back
                    </button>
                    <button type="button" onClick={handleUploadClick} disabled={loading}>
                        {loading ? "Loading..." : "Upload"}
                    </button>
                    <div >
                        {formData.dataCount !== null ? `${formData.dataCount * COST_PER_LABEL} SOL` : "Cost: n/a"}
                        <div style={{ marginLeft: '4px', fontSize: ".5rem" }}>
                            {formData.dataCount !== null ? `(${(formData.dataCount * COST_PER_LABEL * SOL_TO_USD).toFixed(3)} USD)` : ""}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SecondScreen;