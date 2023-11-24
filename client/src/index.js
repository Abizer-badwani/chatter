
import ReactDomClient from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ContextProvider } from './context/Context'
import App from './App'

const root = ReactDomClient.createRoot(document.getElementById('root'))

root.render(
        <QueryClientProvider client={new QueryClient()}>
            <ContextProvider>
                <App />
            </ContextProvider>
            <Toaster position='bottom-right' />
        </QueryClientProvider>
)