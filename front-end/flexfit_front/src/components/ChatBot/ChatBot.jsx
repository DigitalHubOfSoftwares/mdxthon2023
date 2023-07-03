import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
const API_KEY = process.env.NEXT_PUBLIC_GPT_KEY;

const ChatBot = () => {
    let speechRecognition = null;

    const [isRecognition, setIsRecognition] = useState(true);
    const [isVolume, setIsVolume] = useState(true);
    const configuration = new Configuration({
        apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    useEffect(() => {
        // Check if window and SpeechRecognition are available on the client-side
        if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
            speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        }

        if (!speechRecognition) {
            alert("Web Speech API is not supported by this browser.");
        }
    }, []);


    const handleRecognitionResult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        displayMessage(transcript);
    };

    const displayMessage = (message) => {
        // Append the transcript to the chat-message user div
        const chatMessageUser = document.createElement('div');
        chatMessageUser.classList.add('chat-message', 'user');
        const text = document.createElement('p');
        text.classList.add('text');
        text.textContent = message;
        chatMessageUser.appendChild(text);
        const image = document.createElement('img');
        image.classList.add('programmer-image');
        image.src = '/assets/img/users/programmer.png';
        image.alt = 'Programmer Image';
        chatMessageUser.appendChild(image);
        document.querySelector('.chatbox-content').appendChild(chatMessageUser);

        extractResponse(message).then(returnString => {
            if (returnString !== undefined) {
                displayResponse(returnString);
            }
        });
    }

    const displayResponse = (response) => {
        const chatMessages = document.querySelector(".chatbox-content");
        // append the bot's response to the chat-message bot div
        const chatMessageBot = document.createElement("div");
        chatMessageBot.classList.add("chat-message", "bot");
        const image = document.createElement("img");
        image.classList.add("bot-image");
        image.src = "/assets/img/users/bot-image.png";
        image.alt = "Bot Image";
        chatMessageBot.appendChild(image);
        const text = document.createElement("p");
        text.classList.add("text");
        text.textContent = response;
        chatMessageBot.appendChild(text);
        chatMessages.appendChild(chatMessageBot);
        // scroll to the bottom of the div
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isVolume) {
            console.log(isVolume)
            const msg = new SpeechSynthesisUtterance();
            msg.text = response;
            msg.voice = speechSynthesis.getVoices()[0];
            // speak the text
            window.speechSynthesis.speak(msg);
        }
    }

    async function extractResponse(message) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a gym educator and your name is FitBot that gives answer only related to gym and does not know anything other than gym itself"
            }, {
                role: "user",
                content: "Answer to be well presented in around 50-100 words and simple so that a beginner can understand the answer."
            }, {
                role: "assistant",
                content: "Yes i shall answer in html tags"
            }, {
                role: "user",
                content: message
            }],
            temperature: 0,
            max_tokens: 1000,
        });
        return completion.data.choices[0].message.content;
    }

    const startRecognition = () => {
        setIsRecognition((prevRecognition) => !prevRecognition);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        var finishAudio = document.getElementById("finishAudio");
        const speechBtn = document.getElementById('speech-btn');
        const msgContainer = document.getElementById("msgContainer");
        if (isRecognition) {
            recognition.start();
            speechBtn.classList.add('active');
            msgContainer.style.display = "none";
            recognition.onresult = (event) => {
                handleRecognitionResult(event); // Pass the event to handleRecognitionResult
            };
        } else {
            recognition.stop();
            finishAudio.play();
            console.log("Speech recognition stopped");
            sendBtn.disabled = isRecognition;
            msgContainer.style.display = "flex";
            speechBtn.classList.remove('active');
        }

        // add an event listener for errors
        recognition.addEventListener("error", function (event) {
            setIsRecognition((prevRecognition) => !prevRecognition);
            alert("Speech recognition error:", event.error);
        });

        // add an event listener for the end of the recognition
        recognition.addEventListener("end", function () {
            if (isRecognition) {
                console.log("Speech recognition stop");
                finishAudio.play();
                msgContainer.style.display = "flex";
                speechBtn.classList.remove('active');
                recognition.onresult = (event) => {
                    handleRecognitionResult(event); // Pass the event to handleRecognitionResult
                };
                setIsRecognition((prevRecognition) => !prevRecognition);
            }
        });

    };

    const toggleVolume = () => {
        setIsVolume((prevVolume) => !prevVolume);
        console.log(isVolume);
        const volumeBtn = document.getElementById("volume-btn");
        if (volumeBtn.classList.contains("volume_off")) {
            volumeBtn.classList.remove("volume_off");
            volumeBtn.classList.add("volume_up");
            document.getElementById("volume-btn").innerHTML = "volume_up";
            document.getElementById("volume-btn").style.backgroundColor = "#E7FBBE";
            setIsVolume(false);
          } else {
            volumeBtn.classList.remove("volume_up");
            volumeBtn.classList.add("volume_off");
            document.getElementById("volume-btn").innerHTML = "volume_off";
            document.getElementById("volume-btn").style.backgroundColor = "#F2D7D9";
            setIsVolume(true);
          }
    };

    const sendBtn = () => {
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;
        messageInput.value = ''; // Clear the input field
        displayMessage(message);
    };

    const sendBtnKeyBoard = (event) => {
        if (event.key === 'Enter') {
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value;
            messageInput.value = ''; // Clear the input field
            displayMessage(message);
        }
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <Link href={'/'}>
                Go to Home
            </Link>
            <section>
                <div className="chatbox-container">
                    <div className="chatbox-header">FitBot</div>
                    <div className="chatbox-content">
                        <div className="chat-message bot">
                            <Image className="bot-image" src="/assets/img/users/bot-image.png" alt="Bot Image" width={100} height={100} />
                            <div className="text">
                                Welcome to FitBot.
                                How can I assist you?
                            </div>
                        </div>
                    </div>
                    
                    <div className="message-container " id="msgContainer">
                        <div className="input-container" id="inputContainer">
                            <input type="text" id="message-input" placeholder="Type your message here..." onKeyDown={sendBtnKeyBoard} />
                        </div>
                        <div className="send-icon">
                            <a>
                                <i type="submit" id="send-btn" className="material-icons" onClick={sendBtn}>send</i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <a>
                        <i id="volume-btn" onClick={toggleVolume} className="icon material-icons volume_off">volume_off</i>
                    </a>
                    <a>
                        <i id="speech-btn" className="icon material-icons" onClick={startRecognition}>keyboard_voice</i>
                        <audio id="finishAudio" src="/assets/sound/finished.mp3" type="audio/mpeg">
                        </audio>
                    </a>
                    <a>
                        <i id="info" className="icon material-icons">info</i>
                    </a>
                </div>
            </section>
        </>
    );
}

export default ChatBot;