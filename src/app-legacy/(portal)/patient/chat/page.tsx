'use client'

import { useState } from 'react'
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { MessageSquare, Send } from 'lucide-react'

export default function PatientChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Smith', text: 'Hello! How are you feeling after your last Gazelle Chair session?', isStaff: true, time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'I feel great, noticing some improvement already.', isStaff: false, time: '10:15 AM' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setMessages([...messages, {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      isStaff: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setNewMessage('')
  }

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Secure Chat</h1>
        <p className="text-muted-foreground font-body text-lg">Communicate directly with your clinical team.</p>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md flex-1 flex flex-col overflow-hidden">
        <SiteCardContent className="border-b-2 border-brand-teal/10 pb-4">
          <div className="font-heading flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-brand-teal" />
            Conversation with Dr. Smith
          </div>
        </SiteCardContent>
        
        <SiteCardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isStaff ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] rounded-lg p-3 ${msg.isStaff ? 'bg-brand-sand/50 text-brand-ink' : 'bg-brand-teal text-white'}`}>
                  <div className="text-xs font-bold mb-1 opacity-75">{msg.sender} • {msg.time}</div>
                  <div className="font-body">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t-2 border-brand-teal/10 bg-brand-teal/10/30">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border-2 border-brand-teal/20 rounded-md font-body focus:outline-none focus:border-brand-teal"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <SiteButton type="submit" className="font-heading border-2 border-brand-teal bg-brand-teal text-white hover:bg-dark hover:border-brand-teal/20 transition-colors">
                <Send className="h-4 w-4 mr-2" /> Send
              </SiteButton>
            </form>
          </div>
        </SiteCardContent>
      </SiteCard>
    </div>
  )
}
