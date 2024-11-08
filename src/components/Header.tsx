import { Link } from 'react-router-dom'
import { Sparkles, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from "./ui/button"

interface HeaderProps {
  title: string;
  showClear?: boolean;
  showBack?: boolean;
  onClear?: () => void;
}

export function Header({ title, showClear = false, showBack = false, onClear }: HeaderProps) {
  return (
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
          <Button variant="ghost" size="icon" onClick={onClear} title="Clear chat">
            <Trash2 size={18} />
          </Button>
        )}
      </div>
    </header>
  )
}