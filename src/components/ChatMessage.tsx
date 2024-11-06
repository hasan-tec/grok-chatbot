import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={`flex gap-4 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg transition-all duration-200`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className={`text-xs font-medium ${isBot ? 'text-blue-600' : 'text-gray-900'} mb-1`}>
          {isBot ? 'Grok' : 'You'}
        </p>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}