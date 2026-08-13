import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1e293b', color: '#f8fafc', borderRadius: '10px', fontSize: '14px' },
            success: { iconTheme: { primary: '#6366f1', secondary: '#f8fafc' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
