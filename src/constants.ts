import type { ApiKey } from "./types"
import usage from '../src/assets/usage.svg'
import key from '../src/assets/key.svg'
import billing from '../src/assets/billing.svg'
import playground from '../src/assets/playground.svg'
import models from '../src/assets/models.svg'

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
    items: [{ label: 'Node rewards', icon: playground, key: 'node-rewards' }],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: playground, key: 'settings' },
      { label: 'Docs', icon: playground, key: 'docs' },
      { label: 'Chat', icon: playground, key: 'chat' },
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
