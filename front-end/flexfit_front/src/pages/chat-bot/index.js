import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
const API_KEY = process.env.NEXT_PUBLIC_GPT_KEY;
import ChatBot from '../../components/ChatBot/ChatBot';

const ChatBotPage = () => {
    return(
        <>
            <ChatBot />
        </>
    )
}

export default ChatBotPage;
