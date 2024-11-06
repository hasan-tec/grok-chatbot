import { useState, useEffect } from 'react';
import type { ChatState, Message, ApiResponse } from '../types/chat';

const STORAGE_KEY = 'chat-state';
const API_URL = 'https://api.x.ai/v1/chat/completions';

export function useChat() {
  const [state, setState] = useState<ChatState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      messages: [],
      isLoading: false,
      error: null,
      apiKey: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const sendMessage = async (content: string) => {
    if (!state.apiKey) {
      setState(s => ({ ...s, error: 'Please enter an API key first' }));
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setState(s => ({
      ...s,
      messages: [...s.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.apiKey}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy.'
            },
            ...state.messages.map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content }
          ],
          model: 'grok-beta',
          stream: false,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      const botMessage: Message = {
        id: data.id,
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now()
      };

      setState(s => ({
        ...s,
        messages: [...s.messages, botMessage],
        isLoading: false
      }));
    } catch (error) {
      setState(s => ({
        ...s,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
    }
  };

  const setApiKey = (apiKey: string) => {
    setState(s => ({ ...s, apiKey, error: null }));
  };

  const clearChat = () => {
    setState(s => ({ ...s, messages: [], error: null }));
  };

  return {
    ...state,
    sendMessage,
    setApiKey,
    clearChat
  };
}