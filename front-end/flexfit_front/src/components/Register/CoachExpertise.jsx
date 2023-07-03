import { useRouter } from "next/router";
import { useState, useEffect
 } from "react";
const CoachExpertise = (props) => {
    const [fitnessStyles, setFitnessStyles] = useState([]);
    const [selectedFitnessStyles, setSelectedFitnessStyles] = useState({});
    const registeredUser = props.registeredUser;
    const router = useRouter();

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
            days: 0,
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
        if (response.success) router.push('/');
    }

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-dark-900 dark:text-white">Choose your field of expertise</label>
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
            <button type="button" onClick={saveWorkoutPlan} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Complete</button>
        
        </>
    )
}

export default CoachExpertise;