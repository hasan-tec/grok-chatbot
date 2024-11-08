import { useState } from 'react'
import { Header } from './Header'
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Save, Download, Trash2, Sparkles } from 'lucide-react'

export function ConsultComponent() {
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState<string[]>([])

  const saveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes])
      setNotes('')
    }
  }

  const deleteNote = (index: number) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index)
    setSavedNotes(updatedNotes)
  }

  const downloadNotes = () => {
    const notesText = savedNotes.join('\n\n---\n\n')
    const blob = new Blob([notesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai_consultation_notes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="AI Consultant" showBack />
      <main className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-8 p-4 sm:p-6 md:p-8">
        <Card className="flex-1">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Synthflow AI</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
              <iframe
                id="audio_iframe"
                src="https://widget.synthflow.ai/widget/v2/1730975475902x279681980959339840/1730975475821x961340320830973700"
                allow="microphone"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Notes</h2>
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Note</TabsTrigger>
                <TabsTrigger value="saved">Saved Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="space-y-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take your notes here..."
                  className="min-h-[300px]"
                />
                <div className="flex justify-end space-x-2">
                  <Button onClick={saveNote} disabled={!notes.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="saved" className="space-y-4">
                {savedNotes.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4" />
                    <p>No saved notes yet. Start taking notes to see them here!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {savedNotes.map((note, index) => (
                        <Card key={index} className="p-4">
                          <p className="text-sm text-gray-800">{note}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(index)}
                            className="mt-2"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </Card>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={downloadNotes} disabled={savedNotes.length === 0}>
                        <Download className="w-4 h-4 mr-2" />
                        Download All Notes
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}