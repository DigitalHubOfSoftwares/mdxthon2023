import { useEffect, useState } from "react";
import Register from "./Register";
import AboutMe from "./AboutMe";
import TestForm from "./Goals";
import WorkoutProgram from "./WorkoutProgram";
import CoachExpertise from "./CoachExpertise";
import Tab from "./Tab/Tab";
import { FaLock } from 'react-icons/fa';

const RegisterStepping = () => {

    const [steppingForms, setSteppingForms] = useState([
        'register',
        'aboutme',
        'workoutprogram',
        'goals',
        'coachexpertise'
    ]);
    const [registeredUser, setRegisteredUser] = useState({});
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    const [currentFormName, setCurrentFormName] = useState(steppingForms[currentFormIndex]);
    const range = Array.from({ length: steppingForms.length }, (_, index) => index);

    useEffect(() => {
        setCurrentFormName(steppingForms[currentFormIndex]);
    }, [currentFormIndex])

    const triggerNextForm = () => {
        return setCurrentFormIndex(currentFormIndex => currentFormIndex + 1);
    }

    const triggerCoachForm = () => {
        return setCurrentFormIndex(4);
    }

    return (
        <>
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Register Page</h2>
                    <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Join the FlexFit: Register for a Healthy Lifestyle Journey Today!</p>
                    <ol className="flex items-center w-full mb-4 sm:mb-5">
                        {
                            range.map((number, index) => {
                                console.log(number);
                                if (number === currentFormIndex) {
                                    if (number === 3) {
                                        return (
                                            <li className="flex items-center w-full" key={index}>
                                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={index} className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </li>
                                        )

                                    }
                                } else {
                                    if (number == 3) {
                                        return (
                                            <li key={index} className="flex items-center w-full">
                                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={index} className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })
                        }
                    </ol>
                    {
                        {
                            'register': <Register triggerNextForm={triggerNextForm} updateRegisteredUser={setRegisteredUser} triggerCoachForm={triggerCoachForm} />,
                            'aboutme': <AboutMe triggerNextForm={triggerNextForm} registeredUser={registeredUser} />,
                            'workoutprogram': <WorkoutProgram triggerNextForm={triggerNextForm} registeredUser={registeredUser} />,
                            'goals': <TestForm registeredUser={registeredUser} />,
                            'coachexpertise': <CoachExpertise registeredUser={registeredUser} />
                        }[currentFormName]
                    }
                </div>
            </section>
        </>
    )
}

export default RegisterStepping;