import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Briefcase, Sparkles } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Services</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Choose Your AI Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <MessageSquare size={48} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Chat with AI</h3>
                <p className="text-gray-600 mb-6">Engage in a conversation with our intelligent AI assistant. Get answers, insights, and more.</p>
                <Button asChild className="w-full">
                  <Link to="/chat">Start Chatting</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Briefcase size={48} className="text-green-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">AI Consultant</h3>
                <p className="text-gray-600 mb-6">Get AI-powered advice and take notes. Perfect for brainstorming and problem-solving.</p>
                <Button asChild className="w-full">
                  <Link to="/consult">Start Consulting</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}