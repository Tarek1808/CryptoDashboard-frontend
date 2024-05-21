import { useState } from "react";

function SwitchButton() {
    const [isOn, setIsOn] = useState(false);
    
    const handleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <label className="switch">
            <input type="checkbox" 
            checked={isOn}
            onChange={handleSwitch}/>
            <span className="slider"></span>
        </label>
    );
}

export default SwitchButton;