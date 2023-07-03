import '@/styles/globals.css'
import '@/styles/uploadZone.css'
import type { AppProps } from 'next/app'
import UnderMaintenance from '@/components/UnderMaintenance/UnderMaintenance';
import { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import '../styles/chatbot.css'

export default function App({ Component, pageProps: {session, ...pageProps}}: AppProps) {
	const [isUnderMaintenance, setIsUnderMaintenance ] = useState(false);
	const maintenanceEnd = new Date("July 2, 2023 10:00:00"); // July 2nd, 2023 at 10:00:00 AM	

	useEffect(() => {
			/////////// CHECK FOR MAINTENANCE MODE BASED ON API //////////////
			// fetch(process.env.NEXT_PUBLIC_BACKEND_API_MAINTENANCE as string, {}).then(response => response.json())
			// .then(data => {
			// 	setIsUnderMaintenance(data)
			// });

			setIsUnderMaintenance(false);
	}, []);

	return (
		<div>
			{isUnderMaintenance ? (
			<UnderMaintenance message="We are currently under maintenance." maintenanceEnd={maintenanceEnd} />
			) : (
				<SessionProvider session={session} refetchInterval={5 * 60}>
					<Component {...pageProps} />
				</SessionProvider>
			)}
	  	</div>
	);
}
