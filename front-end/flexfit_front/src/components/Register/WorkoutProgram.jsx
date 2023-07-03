import { useEffect, useState } from "react"
import { Dropdown } from "flowbite-react";
import { Button } from 'flowbite-react';

const WorkoutProgram = (props) => {
    const registeredUser = props.registeredUser;
    const triggerNextForm = props.triggerNextForm;
    const [fitnessStyles, setFitnessStyles] = useState([]);
    const [selectedFitnessStyles, setSelectedFitnessStyles] = useState({});
    const [selectedNumberOfDays, setSelectedNumberOfDays] = useState(0);
    const days = Array.from({ length: 7 }, (_, index) => index);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchFitnessStyles = async () => {
            const fitnessStylesPromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fitnesstyles/all`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const fitnessStyles = await fitnessStylesPromise.json();
            setFitnessStyles(fitnessStyles);
        }
        fetchFitnessStyles();
    }, [])

    const updateSelectedFitnessStyles = (e) => {
        setSelectedFitnessStyles((selectedFitnessStyles) => {
            let tempSelectedFitnessStyles = selectedFitnessStyles;
            console.log(tempSelectedFitnessStyles);
            tempSelectedFitnessStyles[e.target.value] = e.target.checked;
            return tempSelectedFitnessStyles;
        })
    }

    const saveWorkoutPlan = async () => {
        const workoutPlan = {
            days: selectedNumberOfDays,
            fitnessStyles: selectedFitnessStyles
        }

        const saveWorkoutPlanPromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save/workoutplan/${registeredUser['id']}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(workoutPlan)
        })

        const response = await saveWorkoutPlanPromise.json();
        if (response.success) triggerNextForm();
    }

    const handleSaveWorkoutPlan = async (event) => {
        console.log(selectedNumberOfDays);
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            saveWorkoutPlan();
        }
    }

    const validate = () => {
        const errors = {};
        // selectedNumberOfDays validation
        if (!selectedNumberOfDays) {
            errors.days = 'Number of workout days is required';
        }


        // selectedFitnessStyles validation
        if (Object.keys(selectedFitnessStyles).length === 0) {
            errors.selectedFitnessStyles = 'Workout Program is required';
        }

        setErrors(errors);
        return errors;
    };

    return (
        <>
            <form>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-dark-900 dark:text-white">Choose your workout program</label>
                    <ul className="text-sm p-1 font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {
                            fitnessStyles.map((fitnessStyle, index) => {
                                return (
                                    <label key={index} className="relative inline-flex items-center border border-gray-500 rounded-lg mr-5 cursor-pointer" style={{ 'padding': '1px' }}>
                                        <input type="checkbox" value={fitnessStyle.name} className="sr-only peer" onChange={(e) => updateSelectedFitnessStyles(e)} />
                                        <div className={`w-11 h-6 bg-grey-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#cbf72b]`}></div>
                                        <span className="ml-2 mr-2 text-sm font-medium text-grey-900 dark:text-gray-300">{fitnessStyle.title}</span>
                                    </label>
                                )
                            })
                        }
                    </ul>
                    {errors.selectedFitnessStyles && <label className="u-label" style={{ "color": "red" }}>{errors.selectedFitnessStyles}</label>}
                </div>
                <div className="mb-6">
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Number of Workout Days per Week</label>
                    <select id="countries" placeholder="Select the number of workout days per week" onChange={(e) => setSelectedNumberOfDays(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {days.map((day) => (
                            <option key={day} value={day}>{day} workout day(s) per week</option>
                        ))}
                    </select>
                    {errors.days && <label className="u-label" style={{ "color": "red" }}>{errors.days}</label>}
                </div>
                <Button onClick={handleSaveWorkoutPlan} color="purple">Save and Continue</Button>
            </form>

        </>
    )
}

export default WorkoutProgram;