import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface footerProps {
	app_name: string | undefined;
	IsLoggedIn?: boolean;
}

const MainFooter: React.FC<footerProps> = ({ app_name = 'DHS', IsLoggedIn}) => {
	return (
		<footer className="p-4 bg-[#ffffff]/[.3] backdrop-blur sm:p-6">
			<div className="mx-auto max-w-screen-xl">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<Link href="" className="flex items-center">
							<Image src={'/assets/images/logo.png'} width={40} height={40} className="mr-3 h-8 rounded" alt="FlowBite Logo" />
							<span className="self-center text-2xl hidden font-bold whitespace-nowrap">{ app_name }</span>
						</Link>
						<span className="text-sm text-black sm:text-center">© 2023 <Link href="" className="hover:underline">Puddle Pirates™</Link>. All Rights Reserved.
						</span>
					</div>
					<div>
						<h2 className="mb-3 text-sm font-bold text-black uppercase">Quick Links</h2>
						<ul>
							<li>
								<Link href="/chat-bot" className="hover:underline">Fit Bot</Link>
							</li>
							<li>
								<Link href="/shop" className="hover:underline">Shop</Link>
							</li>
							<li>
								<Link href="/my-tracker" className="hover:underline">MyTracker</Link>
							</li>
							<li>
								<Link href="/gallery" className="hover:underline">Workouts</Link>
							</li>
						</ul>
					</div>
					<div className="grid grid-cols-2 gap-8 mt-4 sm:gap-6 sm:grid-cols-3">
						<div>
							<h2 className="mb-3 text-sm font-bold text-black uppercase">Other Links</h2>
							<ul className="text-black">
								<li>
									<Link href="/" className="hover:underline">Home</Link>
								</li>
								<li>
									<Link href="/mycoach" className="hover:underline">MyCoach</Link>
								</li>
								<li>
									<Link href="/aboutus" className="hover:underline">View Journal</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-3 border-gray-200 sm:mx-auto lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between">
					
					<div className='flex flex-col items-center justify-center'>
						<span className="text-sm font-bold text-black uppercase">Disclamer</span>
						<span className='text-[12px] text-center'>Puddle Pirates</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default MainFooter;