import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ApiKeyForm } from './components/ApiKeyForm';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, apiKey, sendMessage, setApiKey, clearChat } = useChat();
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ApiKeyForm apiKey={apiKey} onSubmit={setApiKey} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-900">Grok Chat</h1>
          </div>
          <button
            onClick={clearChat}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-2 overflow-y-auto py-4 px-4 scroll-smooth"
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
  );
}

export default App;