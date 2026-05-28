import { useState, useRef, useEffect } from 'react'
import '../styles/Chat.scss'

// ── Model definitions ──
type ModelOption = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  // Three pixel-cell colors: [nth-child(3n), nth-child(3n+1), nth-child(3n+2)]
  colors: [string, string, string]
}

const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'best',
    name: 'Best',
    description: 'Synthesizes the best answer from multiple models',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L10 14.2l-4.8 2.6.9-5.3L2.2 7.7l5.4-.8L10 2z" strokeLinejoin="round" />
      </svg>
    ),
    colors: ['#818cf8', '#a78bfa', '#c084fc'],
  },
  {
    id: 'fastest',
    name: 'Fastest',
    description: 'Lowest latency, high speed',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M11 3L5 11h6l-2 6 8-10h-6l2-4z" strokeLinejoin="round" />
      </svg>
    ),
    colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'High temperature, imaginative',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M15.5 3.5a2.121 2.121 0 010 3L7 15l-4 1 1-4 8.5-8.5a2.121 2.121 0 013 0z" strokeLinejoin="round" />
      </svg>
    ),
    colors: ['#f472b6', '#ec4899', '#fb7185'],
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Optimized for logic & syntax',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M6 7l-4 3 4 3M14 7l4 3-4 3M11 5l-2 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    colors: ['#22d3ee', '#38bdf8', '#67e8f9'],
  },
  {
    id: 'manual',
    name: 'Manual',
    description: 'Select specific model manually',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
        <path d="M3 5h14M3 10h10M3 15h6" strokeLinecap="round" />
        <circle cx="16" cy="13" r="2.5" />
        <path d="M16 10.5V11M16 15v.5" strokeLinecap="round" />
      </svg>
    ),
    colors: ['#94a3b8', '#cbd5e1', '#e2e8f0'],
  },
]

// ── Pixel grid ──
const GRID_COLS = 9
const GRID_ROWS = 3
const CENTER_ROW = 1

function PixelGrid({ active, colors }: { active: boolean; colors: [string, string, string] }) {
  const total = GRID_COLS * GRID_ROWS
  return (
    <div className="pixel-grid" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / GRID_COLS)
        const col = i % GRID_COLS
        // rightward wave; center row leads outer rows by 2 col-steps (130 ms each)
        const delay = col * 65 + Math.abs(row - CENTER_ROW) * 130
        const color = colors[i % 3]
        return (
          <div
            key={i}
            className="pixel-grid__cell"
            style={{
              animationDelay: `${delay}ms`,
              animationPlayState: active ? 'running' : 'paused',
              opacity: active ? undefined : 0.14,
              '--cell-lit': color,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}

// ── Model dropdown ──
function ModelDropdown({
  options,
  selected,
  onSelect,
  onClose,
}: {
  options: ModelOption[]
  selected: string
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="model-dropdown" ref={ref}>
      {options.map((opt) => (
        <button
          key={opt.id}
          className={`model-dropdown__item${selected === opt.id ? ' model-dropdown__item--active' : ''}`}
          onClick={() => { onSelect(opt.id); onClose() }}
        >
          <span className="model-dropdown__icon">{opt.icon}</span>
          <span className="model-dropdown__text">
            <span className="model-dropdown__name">{opt.name}</span>
            <span className="model-dropdown__desc">{opt.description}</span>
          </span>
          {selected === opt.id && (
            <svg className="model-dropdown__check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Animated "Thinking…" indicator ──
function ThinkingIndicator() {
  return (
    <div className="thinking-indicator">
      <span>Thinking</span>
      <span className="thinking-indicator__dots">...</span>
    </div>
  )
}

// ── Types ──
type Message = {
  id: number
  role: 'user' | 'ai'
  text: string
}

// ── Dummy responses simulating API ──
const DUMMY_RESPONSES = [
  "Here's a strong passphrase: correct-horse-battery-staple#9 — easy to remember and very hard to crack. For maximum security, use a password manager to generate truly random strings like xK#9mP@2qL$5nR!.",
  'A strong password should be 16+ characters mixing uppercase, lowercase, numbers, and symbols. Example: F7$kQw!9mZ@3xL#p — store it in Bitwarden or 1Password.',
  "Consider a diceware passphrase: four random words joined by symbols. E.g. maple$tower!river#frost — entropy of ~50 bits, very strong and memorable.",
]

// ── Fake "thinking" delay (simulates an API call) ──
function fakeChatApi(userMsg: string): Promise<string> {
  void userMsg
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)]),
      2800,
    ),
  )
}

// ── Main component ──
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

  // Simulate initial AI response on mount
  useEffect(() => {
    fakeChatApi(messages[0].text).then((reply) => {
      setIsThinking(false)
      setMessages((prev) => [...prev, { id: Date.now(), role: 'ai', text: reply }])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll to bottom when messages change
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
      {/* ── Top bar ── */}
      <div className="chat-screen__topbar">
        <div className="chat-screen__stats">
          <span className="chat-screen__speed">1 000 t/s</span>
          {isThinking && <PixelGrid active colors={selectedModel.colors} />}
          <span className="chat-screen__status-badge chat-screen__status-badge--faster">
            ↑ 20% faster
          </span>
        </div>

        <button className="chat-screen__share" title="Share conversation">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
            <path d="M4 10V16a1 1 0 001 1h10a1 1 0 001-1V10M10 3v9M7 6l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="chat-screen__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-screen__row chat-screen__row--${msg.role}`}>
            <div className={`chat-screen__bubble chat-screen__bubble--${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-screen__row chat-screen__row--thinking">
            <ThinkingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input footer ── */}
      <div className="chat-screen__footer">
        <input
          className="chat-screen__input"
          placeholder="What's on your mind?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isThinking}
        />

        {/* Model selector */}
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
            <span className="model-selector__icon">{selectedModel.icon}</span>
            <span className="model-selector__name">{selectedModel.name}</span>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10">
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
