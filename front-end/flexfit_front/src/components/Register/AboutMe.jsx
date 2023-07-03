import { useState, useEffect } from "react";
import DatePicker from "./DatePicker/DatePicker";
import { FaWeight } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';

const AboutMe = (props) => {
    const triggerNextForm = props.triggerNextForm;
    const registeredUser = props.registeredUser;
    const [errors, setErrors] = useState({});

    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        setErrors({});
    }, []);

    const submitAboutMe = async () => {
        const aboutMeInfo = {
            gender: gender,
            dateOfBirth: dateOfBirth,
            height, height,
            weight: weight
        }
        const saveAboutMePromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save/aboutme/${registeredUser['id']}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aboutMeInfo)
        })

        const response = await saveAboutMePromise.json();

        if (response['success']) {
            triggerNextForm();
        }
    }

    const handleSubmitAboutMe = async (event) => {
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            submitAboutMe();
        }
    }

    const validate = () => {
        const errors = {};
        // Password validation
        if (!gender) {
            errors.gender = 'Gender is required';
          } 

        // Email validation
        if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }

        setErrors(errors);
        return errors;
    };


    return (
        <>
            <form>
                <h1 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">About Me</h1>
                <div className="mb-6">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <ul className="inline-flex gap-1">
                        <li>
                            <input type="radio" id="male" name="gender" value="male" className="hidden peer" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="male" className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div>
                                    <div className="text-lg font-semibold">Male</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="female" name="gender" value="female" className="hidden peer" onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="female" className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div>
                                    <div className="text-lg font-semibold">Female</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <br/>
                    {errors.gender && <label className="u-label" style={{"color": "red"}}>{errors.gender}</label>}
                </div>
                <div className="mb-6">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
                    <DatePicker updateDate={setDateOfBirth} />
                    {errors.dateOfBirth && <label className="u-label" style={{"color": "red"}}>{errors.dateOfBirth}</label>}
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (kg)</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaWeight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" min={0} id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="weight" />
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (cm)</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <GiBodyHeight  className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input value={height} onChange={(e) => setHeight(e.target.value)} min={0} type="number" id="height" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="height" />
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmitAboutMe} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save and Continue</button>
            </form>


        </>
    )
}

export default AboutMe;