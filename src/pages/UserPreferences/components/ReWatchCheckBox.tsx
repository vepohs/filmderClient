import React, {useState} from "react";

interface CheckboxProps {
    label: string;
}

const ReWatchCheckBox: React.FC<CheckboxProps> = ({label}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

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
