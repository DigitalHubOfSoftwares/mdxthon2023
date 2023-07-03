import React from 'react';
import { GiPerson } from 'react-icons/gi';
import { BiChalkboard } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { IoFitness } from 'react-icons/io5';
import { MdMood } from 'react-icons/md';
import { BsHeartFill } from 'react-icons/bs';
import Layout from '@/components/Layout';
import { getMenuData } from '@/lib/functions'

const AboutUsPage = (props) => {
    return (
        <Layout title='About Us' menuData={props.menuData}>
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div class="max-w-screen-md mb-8 lg:mb-16">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">About Us</h2>
                        <p class="text-gray-500 sm:text-xl dark:text-gray-400">Empowering Your Fitness Journey: Discover the FlexFit Difference</p>
                    </div>
                    <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <GiPerson className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Personalized Approach</h3>
                            <p class="text-gray-500 dark:text-gray-400">At Flex Fit, we understand that everyone&apos;s fitness goals and needs are unique. We offer personalized workout plans and nutrition guidance tailored to your specific objectives.</p>
                        </div>
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <BiChalkboard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Expert Guidance</h3>
                            <p class="text-gray-500 dark:text-gray-400">Our team of experienced trainers and nutritionists are here to provide you with expert guidance and support throughout your fitness journey.</p>
                        </div>
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Inclusive Community</h3>
                            <p class="text-gray-500 dark:text-gray-400">Flex Fit is more than just a gym or an online platform. We are a supportive community of like-minded individuals who motivate and inspire each other.</p>
                        </div>
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <IoFitness className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Variety of Fitness Options</h3>
                            <p class="text-gray-500 dark:text-gray-400">From high-intensity interval training to yoga and Pilates, we offer a wide range of fitness classes and training options to keep you engaged and excited about your workouts.</p>
                        </div>
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <MdMood className="w-5 h-5 text-gray-500 dark:text-gray-400" /></div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Fun and Enjoyable</h3>
                            <p class="text-gray-500 dark:text-gray-400">We believe that fitness should be fun and enjoyable. That&apos;s why we organize regular fitness challenges, group activities, and social events to keep you motivated and connected.</p>
                        </div>
                        <div>
                            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <BsHeartFill className="w-5 h-5 text-gray-500 dark:text-gray-400" /></div>
                            <h3 class="mb-2 text-xl font-bold dark:text-white">Lifelong Commitment</h3>
                            <p class="text-gray-500 dark:text-gray-400">At Flex Fit, we are committed to helping you make fitness a lifelong commitment. Our goal is to transform your life for the better and support you in achieving long-term health and well-being.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const menuData = getMenuData();

    return {
		props: {
			menuData: menuData
		}
	}
}

export default AboutUsPage;