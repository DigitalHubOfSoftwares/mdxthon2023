'use client'
import { useState, useEffect } from "react";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [isCoach, setIsCoach] = useState(false);
    const [fullName, setFullName] = useState('');
    const triggerNextForm = props.triggerNextForm;
    const updateRegisteredUser = props.updateRegisteredUser;
    const triggerCoachForm = props.triggerCoachForm;

    useEffect(() => {
        setErrors({});
    }, []);

    async function registerIndividual() {

        if (password !== confirmPassword) return false;
        console.log('test');
        const credentials = {
            fullName: fullName,
            username: email,
            password: password,
            isCoach: isCoach
        }

        const registrationResponsePromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register` , {
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(credentials),
            method: "POST"
        });

        const registrationResponse = await registrationResponsePromise.json();
        if (registrationResponse['success']) {
            updateRegisteredUser(registrationResponse['user']);
            if (isCoach) {
                triggerCoachForm();
            } else {
                triggerNextForm();
            }
        }
    }

    const handleRegistrationSubmission = async (event) => {
        console.log('Registration submission');
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            registerIndividual();
        }
    }

    const validate = () => {
        const errors = {};
        // Password validation
        if (!password) {
            errors.password = 'Password is required';
          } else if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&+=]).*$/.test(password)) {
            errors.password = 'Please enter a more secure password';
          }
          
          
        // Confirm password validation
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
          } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address (e.g. johndoe@example.com)';
        }
        setErrors(errors);
        return errors;
    };


    return (
        <>
            <form>
            <div className="mb-6">
                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="fullName" id="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John Doe" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@email.com" required/>
                    {errors.email && <label className="u-label" style={{"color": "red"}}>{errors.email}</label>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                    {errors.password && <label className="u-label" style={{"color": "red"}}>{errors.password}</label>}
                </div>
                <div className="mb-6">
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="repeat-password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                    {errors.confirmPassword && <label className="u-label" style={{"color": "red"}}>{errors.confirmPassword}</label>}
                </div>
                <div class="flex items-center">
                    <input id="checked-checkbox" type="checkbox" value={isCoach} onChange={(e)=>setIsCoach(e.target.checked)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I&apos;m applying to be a coach</label>
                </div>
                <br></br>
                <button type="button" onClick={handleRegistrationSubmission} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register and Continue</button>
            </form>
        </>
    )
}

export default Register;