import { useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { Header } from './Header'
import { Message } from '../types/chat'

interface ChatComponentProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => void;
  clearChat: () => void;
}

export function ChatComponent({ messages, isLoading, error, sendMessage, clearChat }: ChatComponentProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Grok Chat" showClear showBack onClear={clearChat} />
      <main className="flex-1 max-w-5xl w-full mx-auto flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto py-8 px-4 scroll-smooth"
        >
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-pulse flex items-center gap-2 text-blue-600">
                <Sparkles size={16} />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  )
}