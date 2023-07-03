import Link from "next/link";
import React from "react";
import Image from "next/image";
import { HeroSectionType } from "@/types/CustomTypes";
import { Carousel, CustomFlowbiteTheme } from 'flowbite-react';

interface HeroSectionProps {
	type?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({type = HeroSectionType}) => {

	const CustomCarouselTheme: CustomFlowbiteTheme['carousel'] = {
		"root": {
		  "base": "relative h-full w-full",
		  "leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
		  "rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
		},
		"indicators": {
		  "active": {
			"off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
			"on": "bg-white dark:bg-gray-800"
		  },
		  "base": "h-3 w-3 rounded-full",
		  "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
		},
		"item": {
		  "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
		  "wrapper": "w-full flex-shrink-0 transform cursor-grab snap-center"
		},
		"control": {
		  "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
		  "icon": "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
		},
		"scrollContainer": {
		  "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
		  "snap": "snap-x"
		}
	  }
	return (
		<section className="relative overflow-hidden w-full">
			{ type == HeroSectionType.STATIC ?
				(
					<>
						<video autoPlay muted loop className="absolute w-full object-cover z-0 blur-sm">
								<source src={process.env.NEXT_PUBLIC_PREFIX_URL + "/assets/videos/banner.mp4"} type="video/mp4" />
						</video>
						<div className=" relative flex flex-col items-center justify-center z-20 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
							<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Predict your future, one dream at a time with Puddle Pirates.</h1>
							<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Are you having dreams and wish to understand how it could affect you? Meet Puddle Pirates our AI which decodes your dreams and predicts your future!</p>
							<Link href="/onirix" className="text-white w-48 h-15 font-bold text-3xl rounded-lg px-6 transition-all ease-in-out delay-50 bg-[#81007f] hover:bg-[#BF13E3]/[.6] hover:rounded-3xl focus:ring-4 focus:ring-primary-300 py-3.5 lg:py-2.5 mr-2 focus:outline-none duration-300">Try Puddle Pirates</Link>

						</div>
					</>
					
				) :
				(
					<Carousel theme={CustomCarouselTheme}>
						<video autoPlay muted loop className="absolute w-full object-cover z-0">
							<source src={"/assets/banner/banner1.mp4"} type="video/mp4" />
						</video>				
						<Image width={2000} height={2000} quality={80} className="w-full"
							alt="..."
							src="/assets/banner/banner2New.jpg"
						/>
						<Image width={2000} height={2000} quality={80} className="w-full"
							alt="..."
							src="/assets/banner/banner3.png"
						/>
						<Image width={2000} height={2000} quality={80} className="w-full"
							alt="..."
							src="/assets/banner/banner4.jpg"
						/>
					</Carousel>
				)
			}
		</section>
	);
}

export default HeroSection;