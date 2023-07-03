import { useEffect, useState } from "react";
import { Button } from 'flowbite-react';
import { useRouter } from "next/router";
import { GiWaterBottle } from 'react-icons/gi';
import { IoBed } from 'react-icons/io5';

const Goals = (props) => {
    const registeredUser = props.registeredUser;
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSeletedGoal] = useState(null);
    const [waterIntake, setWaterIntake] = useState(0);
    const [sleep, setSleep] = useState(0);
    const router = useRouter();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchGoals = async () => {
            const goalsPromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/goals/all`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const goals = await goalsPromise.json();
            setGoals(goals);
            console.log(goals);
        }
        setErrors({});
        fetchGoals();
    }, [])

    const saveGoals = async () => {
        const goalsData = {
            selectedGoal: selectedGoal,
            waterIntake: waterIntake,
            sleep: sleep
        }

        const saveGoalsDataPromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save/goals/${registeredUser['id']}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goalsData)
        });

        const saveGoalsData = await saveGoalsDataPromise.json();
        if (saveGoalsData.success) router.push('/login');
    }

    const handleSaveGoals = async (event) => {
        console.log('Registration submission');
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            saveGoals();
        }
    }

    const validate = () => {
        const errors = {};
        // Password validation
        if (!selectedGoal) {
            errors.selectedGoal = 'Selected goal is required';
        }


        // Confirm password validation
        if (!waterIntake) {
            errors.waterIntake = 'Water Intake is required';
        }


        // Email validation
        if (!sleep) {
            errors.sleep = 'Sleep is required';
        }

        setErrors(errors);
        return errors;
    };

    return (
        <>
            <form>
                <div className="mb-6">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your goal</label>
                    <ul className="inline-flex gap-1">
                        {
                            goals.map((goal) => {
                                return (
                                    <li key={goal.name}>
                                        <input type="radio" id={goal.name} name="gender" value={goal.name} className="hidden peer" onChange={(e) => setSeletedGoal(e.target.value)} />
                                        <label htmlFor={goal.name} className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div>
                                                <div className="text-lg font-semibold">{goal.title}</div>
                                            </div>
                                        </label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {errors.selectedGoal && <label className="u-label" style={{ "color": "red" }}>{errors.selectedGoal}</label>}
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <label htmlFor="water" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Water Intake (lts)</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <GiWaterBottle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} min={0} type="number" id="water" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="water" />
                        </div>
                        {errors.waterIntake && <label className="u-label" style={{ "color": "red" }}>{errors.waterIntake}</label>}
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sleep (hours)</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <IoBed className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input value={sleep} onChange={(e) => setSleep(e.target.value)} type="number" min={0} id="height" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="sleep" />
                        </div>
                        {errors.sleep && <label className="u-label" style={{ "color": "red" }}>{errors.sleep}</label>}
                    </div>
                </div>
                <button onClick={handleSaveGoals} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Complete</button>
            </form>
        </>
    )
}

export default Goals;