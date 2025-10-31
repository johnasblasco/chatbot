import { ChevronUp } from "lucide-react"
import { useRef, useState } from "react"

interface ChatFormProps {
    setChatHistory: any;
    chatHistory: any;
    generateBotResponse: any;
}

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }: ChatFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (e: any) => {
        e.preventDefault();

        const userMessage = inputRef.current?.value.trim();
        if (!userMessage) return;

        // Add user message
        setChatHistory((history: any) => [
            ...history,
            { role: 'user', text: userMessage }
        ]);

        // Add bot thinking message
        setTimeout(() => {
            setChatHistory((history: any) => [
                ...history,
                {
                    role: 'model',
                    text: `Thinking...`
                }
            ]);
        }, 1000);

        // Clear input and reset state
        inputRef.current!.value = "";
        setInputValue("");

        // Generate bot response
        generateBotResponse([...chatHistory, { role: 'user', text: userMessage }]);
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    return (
        <form onSubmit={handleFormSubmit} className="flex border-4 p-2 w-full mx-4 rounded-full">
            <input
                ref={inputRef}
                className="w-full focus:outline-0 ml-4"
                type="text"
                placeholder="Message..."
                onChange={handleInputChange}
                required
            />
            {inputValue.trim() && (
                <button type="submit">
                    <ChevronUp className="hover:scale-105 hover:cursor-pointer size-10 p-2 text-white bg-purple-500 rounded-full" />
                </button>
            )}
        </form>
    )
}

export default ChatForm