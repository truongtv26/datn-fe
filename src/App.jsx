import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routers from './routes'
import AppProvider from './provider/AppProvider'
function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routers />
            </AppProvider>
        </BrowserRouter>
    )
}

export default App
