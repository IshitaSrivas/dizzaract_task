import type { ApiKey, ModelOption } from "./types"
import usage from '../src/assets/usage.svg'
import key from '../src/assets/key.svg'
import billing from '../src/assets/billing.svg'
import playground from '../src/assets/playground.svg'
import models from '../src/assets/models.svg'
import settings from '../src/assets/settings.svg'
import docs from '../src/assets/docs.svg'
import chat from '../src/assets/rewards.svg'
import code from '../src/assets/code.svg'
import best from '../src/assets/Best.svg'
import creative from '../src/assets/creative.svg'
import fastest from '../src/assets/fastest.svg'
import manual from '../src/assets/manual.svg'

export const MOBILE_BREAKPOINT = 768

export const navItems = [
  { label: 'Models', icon: models, key: 'models' },
  { label: 'API keys', icon: key, key: 'api' },
  { label: 'Usage', icon: usage, key: 'usage' },
  { label: 'Billing', icon: billing, key: 'billing', badge: 8 },
  { label: 'Account', icon: playground, key: 'account' },
]

export const sidebarSections = [
  {
    title: 'Platform',
    items: [
      { label: 'Models', icon: models, key: 'models' },
      { label: 'API keys', icon: key, key: 'api' },
      { label: 'Usage', icon: usage, key: 'usage' },
      { label: 'Billing', icon: billing, key: 'billing' },
      { label: 'Playground', icon: playground, key: 'playground' },
    ],
  },
  {
    title: 'Node',
    items: [{ label: 'Node rewards', icon: chat, key: 'node-rewards' }],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: settings, key: 'settings' },
      { label: 'Docs', icon: docs, key: 'docs' },
      { label: 'Chat', icon: chat, key: 'chat' },
    ],
  },
]


export const initialKeys: ApiKey[] = [
  {
    id: '1',
    name: 'ai_inference_key',
    key: 'a1b2c3d4e5f6x9yz',
    status: 'Active',
    expires: '2026-05-15',
    createdAt: '2026-04-03',
    lastUsed: 'Never',
  },
  {
    id: '2',
    name: 'model_training_key',
    key: 'c3d4e5f6g7w8vu',
    status: 'Active',
    expires: '2026-06-20',
    createdAt: '2026-03-31',
    lastUsed: '7 hours ago',
  },
  {
    id: '3',
    name: 'vision_model_key',
    key: 'e5f6g7h8t7rs',
    status: 'Expired',
    expires: '2026-04-20',
    createdAt: '2026-03-25',
    lastUsed: '2 days ago',
  },
  {
    id: '4',
    name: 'vision_model_key_v1',
    key: 'g7h8i9j0q6po',
    status: 'Expired',
    expires: '2026-04-01',
    createdAt: '2026-03-05',
    lastUsed: '13 days ago',
  },
]

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'best',
    name: 'Best',
    description: 'Synthesizes the best answer from multiple models',
    icon: best,
    colors: ['#818cf8', '#a78bfa', '#c084fc'],
  },
  {
    id: 'fastest',
    name: 'Fastest',
    description: 'Lowest latency, high speed',
    icon: fastest,
    colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'High temperature, imaginative',
    icon: creative,
    colors: ['#f472b6', '#ec4899', '#fb7185'],
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Optimized for logic & syntax',
    icon: code,
    colors: ['#22d3ee', '#38bdf8', '#67e8f9'],
  },
  {
    id: 'manual',
    name: 'Manual',
    description: 'Select specific model manually',
    icon:manual,
    colors: ['#94a3b8', '#cbd5e1', '#e2e8f0'],
  },
]


export const GRID_COLS = 6
export const GRID_ROWS = 3
export const CENTER_ROW = 1


export const DUMMY_RESPONSES = [
  "Here's a strong passphrase: correct-horse-battery-staple#9 — easy to remember and very hard to crack. For maximum security, use a password manager to generate truly random strings like xK#9mP@2qL$5nR!.",
  'A strong password should be 16+ characters mixing uppercase, lowercase, numbers, and symbols. Example: F7$kQw!9mZ@3xL#p — store it in Bitwarden or 1Password.',
  "Consider a diceware passphrase: four random words joined by symbols. E.g. maple$tower!river#frost — entropy of ~50 bits, very strong and memorable.",
]
