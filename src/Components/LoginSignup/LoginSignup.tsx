import email_icon from "../../assets/email_icon.png";
import key_icon from "../../assets/key_icon.png";
import user_name_icon from "../../assets/user_name_icon.png";
import InputField from "../InputField.tsx";
import {useState} from "react";

export default function LoginSignup() {

    const [onSignUp, setOnSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // Using a string for error message is better than a boolean for retry
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignUp = () => {
        console.log("Sign Up");
        console.log("Email:", email, "Username:", userName, "Password:", password, "-------");
        // API call to sign up
    }

    const handleLogin = () => {
        console.log("Login");
        console.log("Username:", userName, "Password:", password, "-------");
        // API call to login
    }


    const validateAndSubmit = (): boolean => {
        let error = null;

        if (onSignUp) {
            if (!email || !userName || !password) {
                error = "Please fill in all fields to sign up.";
            }
        } else {
            if (!userName || !password) {
                error = "Please fill in username and password to log in.";
            }
        }

        if (error) {
            setErrorMessage(error);
            setTimeout(() => setErrorMessage(null), 4000);
            return false; // Validation failed
        }

        // Validation succeeded, execute submission
        setErrorMessage(null);
        if (onSignUp) {
            handleSignUp();
        } else {
            handleLogin();
        }
        return true; // Submission successful (or started)
    }

    // Unified Submission/Toggle Handler
    const handleAction = (isPrimaryButton: boolean) => {
        if (isPrimaryButton) { // Clicked 'Sign Up' button
            if (!onSignUp) {
                // Currently on Login view -> TOGGLE to Sign Up view
                setOnSignUp(true);
            } else {
                // Currently on Sign Up view -> SUBMIT
                validateAndSubmit();
            }
        } else { // Clicked 'Login' button
            if (onSignUp) {
                // Currently on Sign Up view -> TOGGLE to Login view
                setOnSignUp(false);
            } else {
                // Currently on Login view -> SUBMIT
                validateAndSubmit();
            }
        }
    }

    return (
        <>
            <div className="container mb-3 p-4 bg-gray-300 rounded-lg shadow-lg w-3/4 max-w-md">
                <div className="header text-center">
                    <div className="text text-3xl font-bold m-2 p-2">{onSignUp ? "Sign Up" : "Login"}</div>
                    <div className={`underline h-1 ${errorMessage? `bg-red-500 w-24` : `bg-blue-500 w-16`} mx-auto transition-all duration-300`}/>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-center text-sm font-medium mt-4 p-2 bg-red-100 rounded-lg transition-all duration-300">
                        {errorMessage}
                    </div>
                )}

                <div className="inputs flex flex-col gap-4 mt-8">
                    <div className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${onSignUp ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        <InputField
                            src={email_icon}
                            alt="email"
                            type="email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            onEnterPress = {validateAndSubmit}
                        />
                    </div>

                    <InputField
                        src={user_name_icon}
                        alt={"username"}
                        type={"text"}
                        value = {userName}
                        onChange = {(e) => setUserName(e.target.value)}
                        onEnterPress = {validateAndSubmit}
                    />
                    <InputField
                        src={key_icon}
                        alt={"password"}
                        type={"password"}
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        onEnterPress = {validateAndSubmit}
                    />
                </div>

                {onSignUp || <div className="flex justify-center text-md text-gray-600 hover:text-blue-500 cursor-pointer mt-4">Reset Password</div>}

                <div className="submit-container flex gap-4 mt-6 justify-center">
                    <button type="button" className={`submit rounded-lg ${onSignUp? `bg-blue-500 hover:bg-blue-600` : `bg-gray-500 hover:bg-gray-600`} text-white px-6 py-2 transition-colors`} onClick={() => handleAction(true)}>
                        Sign Up
                    </button>
                    <button type="button" className={`submit rounded-lg ${!onSignUp? `bg-blue-500 hover:bg-blue-600` : `bg-gray-500 hover:bg-gray-600`} text-white px-6 py-2 transition-colors`} onClick={() => handleAction(false)}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}
