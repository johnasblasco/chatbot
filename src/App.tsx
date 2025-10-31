import { BotMessageSquare, ChevronDown, User } from "lucide-react";
import ChatForm from "./components/ChatForm";
import { useState } from "react";

interface ChatMessageProps {
    role: "model" | "user";
    text: string;
}



const App = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([
        { role: "model", text: "Hello! How can I assist you today?" }
    ]);


    const generateBotResponse = async (history: any) => {
        const updateHistory = (botMessage: string) => {
            setChatHistory(prev => [
                ...prev.filter(msg => msg.text !== "Thinking..."),
                { role: "model", text: botMessage }
            ]);
        };

        history = history.map((msg: any) => ({ role: msg.role, parts: [{ text: msg.text }] }));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history })
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            console.log("API Response:", data);

            const botMessage =
                data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t understand that.";
            updateHistory(botMessage);
        } catch (error) {
            console.error("Error generating bot response:", error);
            updateHistory("Sorry, there was an error generating a response.");
        }
    };


    return (
        <>
            <div className="bg-background shadow-lg md:rounded-2xl w-screen h-screen flex flex-col overflow-hidden">
                <header className="bg-purple-500 flex justify-between items-center p-4 md:rounded-t-2xl">
                    <div className="left flex items-center gap-2">
                        <BotMessageSquare className="size-10 bg-background rounded-full p-2 text-purple-500" />
                        <h1 className="font-bold">Chatbot</h1>
                    </div>
                    <div className="right">
                        <ChevronDown className="bg-background size-5" />
                    </div>
                </header>

                <main className="p-6 space-y-4 flex-1 overflow-y-auto">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${message.role === "model"
                                ? "justify-start"  // Bot messages on the left
                                : "justify-end"   // User messages on the right
                                }`}
                        >
                            <div
                                className={`max-w-[80%] flex items-start gap-2 p-4 rounded-xl ${message.role === "model"
                                    ? "bg-purple-200 rounded-tl-none"    // Bot: left bubble
                                    : "bg-blue-200 rounded-tr-none"      // User: right bubble
                                    }`}
                            >
                                {message.role === "model" ? (
                                    <BotMessageSquare className="size-5 mt-0.5 flex-shrink-0" />
                                ) : (
                                    <User className="size-5 mt-0.5 flex-shrink-0" />
                                )}
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </main>

                <footer className="p-4 border-t">
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </footer>
            </div>
        </>
    );
};

export default App;