import { useState, useRef, useEffect } from 'react'
import '../styles/Chat.scss'
import { MODEL_OPTIONS } from '../constants'
import type { Message } from '../types'
import { fakeChatApi } from '../api/keys'
import ModelDropdown from '../components/ModelDropdown'
import PixelGrid from '../components/PixelGrid'
import ThinkingIndicator from './ThinkingPad'

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'user', text: 'Come up with strong password that will protect my data' },
  ])
  const [isThinking, setIsThinking] = useState(true)
  const [input, setInput] = useState('')
  const [selectedModelId, setSelectedModelId] = useState('best')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const selectedModel = MODEL_OPTIONS.find((m) => m.id === selectedModelId) ?? MODEL_OPTIONS[0]

  useEffect(() => {
    fakeChatApi(messages[0].text).then((reply) => {
      setIsThinking(false)
      setMessages((prev) => [...prev, { id: Date.now(), role: 'ai', text: reply }])
    })
  }, [])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isThinking) return

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setIsThinking(true)

    const reply = await fakeChatApi(text)
    setIsThinking(false)
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: reply }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-screen">
      <div className="chat-screen__topbar">
        <div className="chat-screen__stats">
          <span className="chat-screen__speed">1 000 t/s</span>
          {isThinking && <PixelGrid active colors={selectedModel.colors} />}
          <span className="chat-screen__status-badge chat-screen__status-badge--faster">
            ↑ 20% faster
          </span>
        </div>

        <button className="chat-screen__share" title="Share conversation">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            width="18"
            height="18"
          >
            <path
              d="M4 10V16a1 1 0 001 1h10a1 1 0 001-1V10M10 3v9M7 6l3-3 3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="chat-screen__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-screen__row chat-screen__row--${msg.role}`}>
            <div className={`chat-screen__bubble chat-screen__bubble--${msg.role}`}>{msg.text}</div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-screen__row chat-screen__row--thinking">
            <ThinkingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-screen__footer">
        <input
          className="chat-screen__input"
          placeholder="What's on your mind?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isThinking}
        />

        <div className="model-selector-wrap">
          {dropdownOpen && (
            <ModelDropdown
              options={MODEL_OPTIONS}
              selected={selectedModelId}
              onSelect={setSelectedModelId}
              onClose={() => setDropdownOpen(false)}
            />
          )}
          <button
            className="model-selector"
            onClick={() => setDropdownOpen((o) => !o)}
            title="Select model"
          >
            <span className="model-selector__icon">
              <img src={selectedModel.icon} alt={selectedModel.name} width={18} height={18} />
            </span>
            <span className="model-selector__name">{selectedModel.name}</span>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="10"
              height="10"
            >
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <button
          className="chat-screen__send"
          onClick={sendMessage}
          disabled={!input.trim() || isThinking}
          title="Send"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
            <path d="M10 3l-6 8h4v6h4v-6h4l-6-8z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
