import { BotMessageSquare, User } from "lucide-react"

interface ChatMessageProps {
    role: "model" | "user";
    text: string;
}

const ChatMessage = ({ role, text }: ChatMessageProps) => {
    return (
        <div className={`flex w-full ${role === "model" ? "justify-start" : "justify-end"
            }`}>
            <div className={`max-w-[80%] flex items-start gap-2 p-4 rounded-xl ${role === "model"
                    ? "bg-purple-200 rounded-tl-none"
                    : "bg-blue-200 rounded-tr-none"
                }`}>
                {role === "model" ? (
                    <BotMessageSquare className="size-5 mt-0.5 flex-shrink-0" />
                ) : (
                    <User className="size-5 mt-0.5 flex-shrink-0" />
                )}
                <p>{text}</p>
            </div>
        </div>
    )
}

export default ChatMessage