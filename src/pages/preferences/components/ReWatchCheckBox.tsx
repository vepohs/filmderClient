import React from "react";

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReWatchCheckBox: React.FC<CheckboxProps> = ({label, isChecked, setIsChecked}) => {
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{marginRight: "8px"}}
            />
            {label}
        </label>
    );
};

export default ReWatchCheckBox;
