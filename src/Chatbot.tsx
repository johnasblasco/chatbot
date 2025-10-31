import { BotMessageSquare, User, Maximize2, Minimize2, X, MessageCircle } from "lucide-react";
import ChatForm from "./components/ChatForm";
import { useState } from "react";

interface ChatMessageProps {
    role: "model" | "user";
    text: string;
}

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([
        { role: "model", text: "Hello! I'm your AI assistant. How can I help you today?" },
    ]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const generateBotResponse = async (history: any) => {
        const updateHistory = (botMessage: string) => {
            setChatHistory((prev) => [
                ...prev.filter((msg) => msg.text !== "Thinking..."),
                { role: "model", text: botMessage },
            ]);
        };

        history = history.map((msg: any) => ({ role: msg.role, parts: [{ text: msg.text }] }));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history }),
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            const botMessage =
                data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
            updateHistory(botMessage);
        } catch (error) {
            console.error("Error generating bot response:", error);
            updateHistory("Sorry, there was an error generating a response.");
        }
    };

    // Floating chat button when closed
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
            >
                <MessageCircle className="size-6" />
            </button>
        );
    }

    return (
        <div
            className={`fixed z-50 transition-all duration-300 ease-in-out 
        ${isExpanded
                    ? "inset-0 w-full h-full rounded-none"
                    : "bottom-6 right-6 w-[22rem] h-[500px] sm:w-[95vw] sm:h-[80vh] sm:bottom-4 sm:right-4"}`
            }
        >
            <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl w-full h-full flex flex-col border border-gray-200/50 overflow-hidden">

                {/* Header */}
                <header className="bg-gradient-to-r from-purple-500 to-blue-500 flex justify-between items-center p-4 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <BotMessageSquare className="size-8 bg-white rounded-full p-1.5 text-purple-500" />
                            <div className="absolute -bottom-1 -right-1 size-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg">AI Johnas</h1>
                            <p className="text-white/80 text-xs">Online • Ready to help</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
                            title={isExpanded ? "Shrink" : "Expand"}
                        >
                            {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
                            title="Close"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </header>

                {/* Chat Messages */}
                <main className="p-4 space-y-3 flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50/30">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${message.role === "model" ? "justify-start" : "justify-end"
                                }`}
                        >
                            <div
                                className={`max-w-[85%] flex items-start gap-3 p-3 rounded-2xl shadow-sm ${message.role === "model"
                                        ? "bg-white border border-gray-100 rounded-tl-none"
                                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none"
                                    }`}
                            >
                                <div
                                    className={`p-1.5 rounded-full ${message.role === "model"
                                            ? "bg-purple-100 text-purple-600"
                                            : "bg-white/20 text-white"
                                        }`}
                                >
                                    {message.role === "model" ? (
                                        <BotMessageSquare className="size-4" />
                                    ) : (
                                        <User className="size-4" />
                                    )}
                                </div>
                                <p className="flex-1 text-sm leading-relaxed break-words">{message.text}</p>
                            </div>
                        </div>
                    ))}
                </main>

                {/* Chat Input */}
                <footer className="p-4 border-t border-gray-200/50 bg-white/80">
                    <ChatForm
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        generateBotResponse={generateBotResponse}
                    />
                </footer>
            </div>
        </div>
    );
};

export default Chatbot;
