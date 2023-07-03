// components/UnderMaintenance.tsx

import React, {useState, useEffect} from 'react';
import Image from 'next/image';

type UnderMaintenanceProps = {
  message?: string;
  maintenanceEnd: Date;
};

const UnderMaintenance: React.FC<UnderMaintenanceProps> = ({ message = 'We are currently under maintenance.', maintenanceEnd }) => {
	const [timeLeft, setTimeLeft] = useState(maintenanceEnd.getTime() - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
		  setTimeLeft(maintenanceEnd.getTime() - new Date().getTime());
		}, 1000);
		return () => clearInterval(interval);
	  }, [maintenanceEnd]);
	
	  const formatTimeLeft = (time: number) => {
		const hours = Math.floor(time / (1000 * 60 * 60));
		const minutes = Math.floor((time / (1000 * 60)) % 60);
		const seconds = Math.floor((time / 1000) % 60);
	
		const hoursString = hours > 0 ? `${hours}h ` : '';
		const minutesString = minutes > 0 ? `${minutes}m ` : '';
		const secondsString = `${seconds}s`;
	
		return `${hoursString}${minutesString}${secondsString}`;
	  };
	return (
		<section className="bg-white dark:bg-gray-900">
			<video autoPlay muted loop className="absolute w-full h-full object-cover z-0 blur-sm">
					<source src={"/assets/videos/maintenance.mp4"} type="video/mp4" />
			</video>
			<div className="absolute flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 z-10">
				<div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto">
					{/* {apiData && JSON.stringify(apiData)} */}
					<Image className='rounded-2xl' src={'/assets/images/logo.png'} width={100} height={100} alt='SystemAliens'></Image>
					<h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">Website Coming Soon...in {formatTimeLeft(timeLeft)}</h1>
					<p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Attention earthlings! We, the Puddle Pirates, are currently conducting some essential maintenance on our systems.</p>
					<p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Please check back in {formatTimeLeft(timeLeft)}, as we&apos;ll be back online and ready to take on any digital challenge the universe can throw our way.</p>
					<p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">We apologize for any inconvenience caused, but rest assured that our team of intergalactic technicians is working tirelessly to get everything back up and running smoothly.</p>
					<p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Thank you for your patience and understanding!</p>
				</div>
			</div>
		</section>
	);
};

export default UnderMaintenance;
