import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('user not found')
                    break
                default:
                    console.log(error);
            }
            
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithPopup();
        await createUserDocumentFromAuth(user);
    };

    return (<div className="sign-in-container">
        <h2>I already have an account </h2>
        <span >Sign in with email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
            <div className="buttons-container">
            <Button type="submit" >SIGN IN</Button>
            <Button type="button" buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
            </div>
        </form>
    </div>)
}
export default SignInForm