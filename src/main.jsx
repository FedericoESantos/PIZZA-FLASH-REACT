import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./components/firebase/config.jsx"

createRoot(document.getElementById('root')).render(<App />)