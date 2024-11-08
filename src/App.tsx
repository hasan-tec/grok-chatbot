import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApiKeyForm } from './components/ApiKeyForm'
import { useChat } from './hooks/useChat'
import LandingPage from './components/LandingPage'
import { ChatComponent } from './components/ChatComponent'
import { ConsultComponent } from './components/ConsultComponent'

function App() {
  const { messages, isLoading, error, apiKey, sendMessage, setApiKey, clearChat } = useChat()

  useEffect(() => {
    const chatContainer = document.querySelector('.scroll-smooth')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/chat" 
          element={
            <ChatComponent 
              messages={messages}
              isLoading={isLoading}
              error={error}
              sendMessage={sendMessage}
              clearChat={clearChat}
            />
          } 
        />
        <Route path="/consult" element={<ConsultComponent />} />
      </Routes>
    </Router>
  )
}

export default App