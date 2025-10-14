import {useState, type ChangeEvent} from "react";
import hideicon from "../assets/hide.png";
import viewicon from "../assets/view.png";


interface InputFieldProps {
    src : string;
    alt : string;
    type : string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEnterPress?: () => void;
}



export default function InputField({ src, alt, type, value, onChange , onEnterPress}: InputFieldProps) {

    const[showpassword, setshowpassword] = useState(false);

    //creating readable placeholder text from alt
    const placeholderText = alt.replace('_', ' ').charAt(0).toUpperCase() + alt.replace('_', ' ').slice(1);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (onEnterPress) {
                onEnterPress();
            }
        }
    };

    return (
        <div className="input bg-blue-200 rounded-2xl flex items-center gap-2 px-4 py-2 shadow-inner">
            <img src={src} alt = {alt} />
            <input
                type = {( type === "password" && showpassword) ? "text" : type}
                value={value}
                onChange = {onChange}
                onKeyDown = {handleKeyDown}
                className="border-0 bg-transparent outline-none text-gray-900 font-semibold w-full"
                placeholder={placeholderText}
            />
            {(type === "password") &&
                <>
                    <img src={showpassword ? hideicon : viewicon} alt={"view status"} style={{ width: '24px', height: '24px' }} onClick={() => {
                        setshowpassword(!showpassword);
                    }}/>
                </>}
        </div>
    )
}