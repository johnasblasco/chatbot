import { Send, Paperclip, Mic } from "lucide-react";
import { useState } from "react";

interface ChatFormProps {
    chatHistory: any[];
    setChatHistory: (history: any) => void;
    generateBotResponse: (history: any) => void;
}

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }: ChatFormProps) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        const thinkingMessage = { role: "model", text: "Thinking..." };

        const newHistory = [...chatHistory, userMessage, thinkingMessage];
        setChatHistory(newHistory);
        setInput("");

        generateBotResponse([...chatHistory, userMessage]);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/95 shadow-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Paperclip className="size-4" />
                    </button>
                    <button
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Mic className="size-4" />
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
                <Send className="size-5" />
            </button>
        </form>
    );
};

export default ChatForm;