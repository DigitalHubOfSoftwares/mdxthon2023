import React, {useEffect, useState}  from 'react';
import LoginForm from '../../components/Login/login';
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"

export default function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('Email:' + email);
		console.log('Password:' + password);
		console.log('Logging In');

		const response = await signIn(`credentials`, {
			redirect: true,
			email,
			password,
			callbackUrl : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/protected`
		});
	}

	return (
		<>
			{ !isLoggedIn && (<LoginForm onSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />)}
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions)
	if (session) {
		return {
		  redirect: {
			destination: '/protected',
			permanent: false,
		  },
		}
	}
	return {
		props: {
			session: session
		}
	}
}