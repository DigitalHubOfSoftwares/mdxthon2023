import React, { useState } from 'react';
import Link from 'next/link';
import MenuItem from './MenuItem';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession, signOut } from 'next-auth/react';

const SideBar = dynamic(
    () => import('../SideBar/SideBar'),
    { ssr: false }
);

const SideBarContactUsForm = dynamic(
	() => import('../SideBarContactUsForm/SideBarContactUsForm'),
	{ ssr: false }
);

const ContactUsForm = dynamic(
	() => import('../ContactUsForm/ContactUsForm'),
	{ssr:false}
)

interface headerProps {
	app_name: string | undefined;
	logOut?: any;
	IsLoggedIn?: boolean;
	menuData: any;
}

const MainHeader: React.FC<headerProps> = ({ app_name = 'DHS', logOut, IsLoggedIn, menuData }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [ isMenuHidden, setIsMenuHidden ] = useState(false);
	const [isDrawerOpenContact, setIsDrawerOpenContact] = useState(false);
	const [ isContactHidden, setIsContactHidden ] = useState(false);

	const session: any = useSession();

	const showSide = () => {
        setIsDrawerOpen(true);
    }

    const closeSide = () => {
        setIsDrawerOpen(false);
    }
	const showSideContact = () => {
        setIsDrawerOpenContact(true);
    }

    const closeSideContact = () => {
        setIsDrawerOpenContact(false);
    }
	
	return (
		<header className='sticky top-0 z-50 w-full'>
			<nav className="bg-[#100507]/[.6] backdrop-blur font-bold border-gray-200 px-1 lg:px-1 py-6">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Link href="/" className="flex items-center">
						<Image src={'/assets/images/logo.png'} width={40} height={40} className="mr-3 h-6 sm:h-9 rounded" alt="Flowbite Logo" />
						<span className="self-center text-xl font-semibold whitespace-nowrap text-black hidden">{app_name}</span>
					</Link>
					<div className="flex items-center lg:order-2">
						{ session.status == 'unauthenticated' ?
							(
								<>
									<Link href="/login" className="text-white transition-all font-bold hover:bg-[#69093A] focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</Link>
								</>
							)
							:
							(
								<>
									<button className="text-white transition-all font-bold hover:bg-[#69093A] focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none " onClick={() => signOut()}>Log Out</button>					
									
								</>
							)
						}
						<button onClick={showSide} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden">
							<span className="sr-only">Open main menu</span>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
							<svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</button>
						<button onClick={() => showSideContact()} type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
							Contact Us
						</button>
					</div>
					
					<SideBar showSide={showSide} closeSide={closeSide} isDrawerOpen={isDrawerOpen} title='Main Menu'>
						<div className={`flex justify-between items-center text-black w-full`} id="mobile-menu-2">
							<ul className="flex flex-col w-full mt-4 items-center font-bold">
								{menuData.map((menuItem:any, index: number) => (
									<li className='w-full text-3xl' key={index}>
										<MenuItem key={menuItem.title} textColor='text-black' route={menuData.route} {...menuItem} />
									</li>
								))}
							</ul>
						</div>							
					</SideBar>

					<div className={`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
						<ul className="flex flex-col mt-4 font-bold lg:flex-row lg:space-x-8 lg:mt-0">
							{menuData.map((menuItem: any, index: number) => (
								<li key={index} className='hover: text-black'>
									<MenuItem key={menuItem.title} route={menuData.route} {...menuItem} />
								</li>
							))}
						</ul>
					</div>

					<SideBar showSide={showSideContact} closeSide={closeSideContact} isDrawerOpen={isDrawerOpenContact} title='Contact Us'>
						<ContactUsForm/>
					</SideBar>
				</div>
			</nav>
		</header>
	);
}

export default MainHeader;