import React from 'react';
import { Key, Sparkles } from 'lucide-react';

interface ApiKeyFormProps {
  apiKey: string;
  onSubmit: (key: string) => void;
}

export function ApiKeyForm({ apiKey, onSubmit }: ApiKeyFormProps) {
  const [key, setKey] = React.useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(key);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-md w-full">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-900">
          <Sparkles size={20} className="text-blue-600" />
          <h2 className="text-xl font-semibold">Welcome to Grok</h2>
        </div>
        <p className="text-sm text-gray-600">Enter your xAI API key to start chatting</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
        >
          Connect
        </button>
      </div>
    </form>
  );
}