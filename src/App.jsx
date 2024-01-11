import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routers from './routes'
import AppProvider from './provider/AppProvider'
function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </AppProvider>
    )
}

export default App
