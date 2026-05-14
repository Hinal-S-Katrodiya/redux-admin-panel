import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Import the Provider from react-redux
import { Provider } from 'react-redux'

// 2. Import your configured store 
// (Assuming your store file is inside the 'store' folder as seen in your sidebar)
import { store } from './store/store.js' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Wrap App with Provider and pass the store as a prop */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)