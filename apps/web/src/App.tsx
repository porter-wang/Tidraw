import { Tldraw } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'

function App() {
  // For now, use the demo sync - we'll replace this with our own backend later
  const store = useSyncDemo({ 
    roomId: 'dev-room-' + Math.random().toString(36).substring(7) 
  })

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw store={store} />
    </div>
  )
}

export default App