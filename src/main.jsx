import { AuthProvider } from './store/AuthContext'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BookProvider } from './store/BookContext.jsx';
import { IssueProvider } from './store/IssueBookContext.jsx';
import  StudentProvider from './store/StudentContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BookProvider>
            <IssueProvider>
                <StudentProvider>
                    <App />
                </StudentProvider>
            </IssueProvider>
        </BookProvider>
    </AuthProvider>
)
