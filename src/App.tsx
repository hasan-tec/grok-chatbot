import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Sparkles, Trash2, ArrowLeft } from 'lucide-react'
import { ChatMessage } from './components/ChatMessage'
import { ChatInput } from './components/ChatInput'
import { ApiKeyForm } from './components/ApiKeyForm'
import { useChat } from './hooks/useChat'
import LandingPage from './components/LandingPage'
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"

function App() {
  const { messages, isLoading, error, apiKey, sendMessage, setApiKey, clearChat } = useChat()
  const chatContainerRef = React.useRef<HTMLDivElement>(null)
  const [notes, setNotes] = React.useState('')

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ApiKeyForm apiKey={apiKey} onSubmit={setApiKey} />
        </div>
      </div>
    )
  }

  const Header = ({ title, showClear = false, showBack = false }) => (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        {showClear && (
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
            <Trash2 size={18} />
          </Button>
        )}
      </div>
    </header>
  )

  const ChatComponent = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Grok Chat" showClear showBack />
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

  const ConsultComponent = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="AI Consultant" showBack />
      <main className="flex-1 max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-8 p-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Synthflow AI</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              id="audio_iframe"
              src="https://widget.synthflow.ai/widget/v2/1730975475902x279681980959339840/1730975475821x961340320830973700"
              allow="microphone"
              width="100%"
              height="600px"
              style={{ border: 'none' }}
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Notes</h2>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Take your notes here..."
            className="min-h-[600px]"
          />
        </div>
      </main>
    </div>
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/consult" element={<ConsultComponent />} />
      </Routes>
    </Router>
  )
}

export default App