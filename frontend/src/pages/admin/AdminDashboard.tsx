import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Mail, Calendar, RefreshCw } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    const token = localStorage.getItem('adminToken');
    setDeletingId(id);
    
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete');
      
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (err) {
      alert('Error deleting message');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-wider">Admin</span>
            <span className="text-gray-500 text-sm hidden sm:inline-block">/ Dashboard</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline-block">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Messages</h1>
            <p className="text-gray-500 text-sm">Manage submissions from your portfolio contact form.</p>
          </div>
          
          <button 
            onClick={fetchMessages}
            disabled={loading}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mb-8">
            {error}
          </div>
        )}

        {loading && messages.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 animate-pulse h-32" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-6">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">No messages yet</h3>
            <p className="text-gray-500">When someone contacts you through the portfolio, their messages will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Left Column - Metadata */}
                  <div className="md:w-1/3 space-y-4 pr-6 md:border-r border-white/5">
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-1">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-blue-400 text-sm hover:underline hover:text-blue-300 transition-colors">
                        {msg.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      {formatDate(msg.createdAt)}
                    </div>
                  </div>

                  {/* Right Column - Message */}
                  <div className="md:w-2/3 flex flex-col">
                    <h4 className="font-medium text-white mb-3 text-lg">{msg.subject}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap flex-grow">
                      {msg.message}
                    </p>
                    
                    <div className="flex justify-end mt-6 pt-4 border-t border-white/5">
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        {deletingId === msg.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
