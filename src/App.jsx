import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routers from './routes'
import AppProvider from './provider/AppProvider'
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <BrowserRouter>
                    <Routers />
                </BrowserRouter>
            </AppProvider>
        </QueryClientProvider>
    )
}

export default App
