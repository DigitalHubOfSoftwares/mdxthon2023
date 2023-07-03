import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import LineChart from "./LineChart/LineChart";
import withAuthProtection from "../../components/withAuthProtection/withAuthProtection";
import Link from "next/link";

const MyTracker = () => {
    const [mealItems, setMealItems] = useState();
    const [currentCalorie, setCurrentCalorie] = useState(0);
    const [allUserCalories, setAllUserCalories] = useState([]);
    const [graphCaloriesData, setGraphCaloriesData] = useState(false);
    const [isSavedCalories, setIsSavedCalories] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);


    useEffect(() => {
        const fetchAllMealItems = async () => {
            const allMealItemsPromise = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mealitem/all`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const allMealItems = await allMealItemsPromise.json();
            setMealItems(allMealItems);
        };

        const getTodayCurrentCalorie = async () => {
            //to account for users later
            const todayCurrentCaloriePromise = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/currentcalorie/1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const todayCurrentCalorie = await todayCurrentCaloriePromise.json();
            setCurrentCalorie(todayCurrentCalorie["calorieIntake"]);
        };

        fetchAllMealItems();
        getTodayCurrentCalorie();
    }, []);

    const handleButtonClick = () => {
        // Perform the desired action when the button is clicked
        console.log('Button clicked!');
    };

    useEffect(() => {
        const getAllUserCalories = async () => {
            //to account for user
            const allUserCaloriesPromise = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calorie/all/1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const allUserCalories = await allUserCaloriesPromise.json();
            const graphCaloriesData = formatCalorieDataForGraph(allUserCalories);
            setGraphCaloriesData(graphCaloriesData);
        };

        getAllUserCalories();
    }, [isSavedCalories]);

    const formatCalorieDataForGraph = (allUserCalories) => {
        let graphCalorieData = {};
        let values = [];
        let labels = [];

        allUserCalories.forEach((userCalorie) => {
            console.log(userCalorie);
            values.push(userCalorie.calorieIntake);
            const date = new Date(userCalorie.date.timestamp * 1000);
            const options = { day: "numeric", month: "numeric" };
            const formattedDate = date.toLocaleDateString("en-GB", options);
            labels.push(formattedDate);
        });
        graphCalorieData.values = values;
        graphCalorieData.labels = labels;
        graphCalorieData.graphTitle = "Calorie Intake Per Day";
        graphCalorieData.lineTitle = "Calorie";

        return graphCalorieData;
    };

    const saveCalorieForTheDay = async () => {
        // to account for users later
        const savedCaloriePromise = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/savecalorie/today/1`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ calorieIntake: currentCalorie }),
            }
        );

        const savedCalories = await savedCaloriePromise.json();
        console.log("savedddd");
        setIsSavedCalories(!isSavedCalories);
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <div className="w-full dark:hidden">
                        {graphCaloriesData && (
                            <LineChart className="w-full dark:hidden" data={graphCaloriesData} />
                        )}
                    </div>
                    <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Calorie Intake
                    </h2>
                    <div className="w-full flex justify-center">
                        <h1>Current Calorie Intake Today: </h1>
                        <div className="font-bold">{currentCalorie}</div>
                    </div>

                    <div className="h-[50vh] overflow-y-auto border-2 rounded-lg shadow-lg p-10">

                        {
                            mealItems && mealItems.map((mealItem, index) => {
                                return (
                                    <div key={index} className="border-2 rounded-full flex justify-around items-center my-3">
                                        <Button className='bg-[#100507] rounded-full' onClick={(e)=>{setCurrentCalorie(currentCalorie + mealItem.calorieCount)}}>ADD</Button><br></br>
                                        <div className="flex flex-col justify-center items-center">
                                            <div>{mealItem.name}</div>
                                            <div>{mealItem.calorieCount}</div> 
                                        </div>                                       
                                        <Button className='bg-[#e0003e] rounded-full' onClick={(e)=>{setCurrentCalorie(currentCalorie - mealItem.calorieCount)}}>REMOVE</Button>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    <Button onClick={saveCalorieForTheDay} className="bg-[#e3003e] mt-6 w-full">Save</Button>
                    <Link href={'/'} className="bg-[#e3003e] mt-6 w-full text-white p-2 rounded">Back to Home Page</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default withAuthProtection(MyTracker, '/login');
