import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FaChartLine, 
  FaShoppingCart, 
  FaStar,
  FaHome,
  FaChartBar,
  FaUsers,
  FaTasks,
  FaCog,
  FaInfoCircle,
  FaCommentDots,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaSearch,
  FaCalendarAlt,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { DashboardTab, ReviewsTab, OrdersTab } from 'components/admin';

const AdminPanel = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalReviews: 0,
    monthlyRevenue: 0,
    pendingOrders: 0
  });
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarLinks = [
    { label: 'Home', icon: FaHome },
    { label: 'Analytics', icon: FaChartBar },
    { label: 'Clients', icon: FaUsers },
    { label: 'Tasks', icon: FaTasks },
    { label: 'Settings', icon: FaCog },
    { label: 'About', icon: FaInfoCircle },
    { label: 'Feedback', icon: FaCommentDots },
  ];

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?redirect=/admin');
        return;
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          name: payload.name,
          email: payload.email
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        router.push('/login?redirect=/admin');
        return;
      }
      setAuthLoading(false);
    };
    
    checkAuth();
    fetchDashboardData();
  }, [router]);

  // Remove sample data arrays
  const revenueData = [];
  const productSalesData = [];
  const COLORS = [];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch reviews
      const reviewsResponse = await fetch('http://localhost:5000/api/admin/reviews');
      const reviewsData = await reviewsResponse.json();
      
      // Fetch orders
      const ordersResponse = await fetch('http://localhost:5000/api/admin/orders');
      const ordersData = await ordersResponse.json();
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5000/api/admin/stats');
      const statsData = await statsResponse.json();

      setReviews(reviewsData.reviews || []);
      setOrders(ordersData.orders || []);
      setStats(statsData.stats || {
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalReviews: 0,
        monthlyRevenue: 0,
        pendingOrders: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/reviews/${reviewId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setReviews(reviews.filter(review => review._id !== reviewId));
          setStats(prev => ({ ...prev, totalReviews: prev.totalReviews - 1 }));
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status } : order
        ));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading Admin Panel...</div>
      </div>
    );
  }

  // Show unauthorized message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Please log in to access the admin panel.</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#070D2A] via-[#133B5C] to-[#0FAFCA] w-full h-full" />
      <div className="flex min-h-screen pt-24 bg-transparent">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 left-0 h-screen z-20">
          <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
            <span className="text-lg font-bold text-gray-900">Sitemark-web</span>
            <span className="text-xs text-gray-500 ml-2">Web app</span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {sidebarLinks.map((link, idx) => (
              <button key={link.label} className={`flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition ${idx === 0 ? 'bg-gray-100 font-semibold' : ''}`}> <link.icon className="mr-3 h-5 w-5" /> {link.label} </button>
            ))}
          </nav>
          <div className="mt-auto px-4 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <FaUserCircle className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 text-sm">Riley Carter</div>
                <div className="text-xs text-gray-500">riley@email.com</div>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen bg-transparent">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaChevronLeft className="h-4 w-4" />
              <span>Dashboard</span>
              <span className="mx-1">/</span>
              <span className="text-gray-900 font-semibold">Home</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search..." className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm"><FaCalendarAlt className="h-4 w-4" /> Apr 17, 2023</button>
              <button className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FaSun className="h-5 w-5 text-yellow-400" /></button>
            </div>
          </header>
          {/* Overview Cards */}
          <section className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
              <div className="text-xs text-gray-500">Users</div>
              <div className="text-2xl font-bold text-gray-900">14k <span className="text-green-500 text-sm font-semibold ml-2">+25%</span></div>
              <div className="text-xs text-gray-400">Last 30 days</div>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
              <div className="text-xs text-gray-500">Conversions</div>
              <div className="text-2xl font-bold text-gray-900">325 <span className="text-red-500 text-sm font-semibold ml-2">-25%</span></div>
              <div className="text-xs text-gray-400">Last 30 days</div>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
              <div className="text-xs text-gray-500">Event count</div>
              <div className="text-2xl font-bold text-gray-900">200k <span className="text-gray-500 text-sm font-semibold ml-2">+5%</span></div>
              <div className="text-xs text-gray-400">Last 30 days</div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow p-5 flex flex-col gap-2 border border-dashed border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Explore your data</div>
              <div className="text-xs text-gray-500 mb-2">Uncover performance and visitor insights with our data wizardry.</div>
              <button className="bg-black text-white rounded-lg px-3 py-2 text-xs font-semibold w-fit">Get insights</button>
            </div>
          </section>
          {/* Charts */}
          <section className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-900">Sessions</div>
                <div className="text-green-600 text-xs font-semibold">+35%</div>
              </div>
              <div className="text-xs text-gray-500 mb-2">Sessions per day for the last 30 days</div>
              {/* TODO: Insert line chart here */}
              <div className="h-48 flex items-center justify-center text-gray-300">[Line Chart]</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-900">Page views and downloads</div>
                <div className="text-red-600 text-xs font-semibold">-8%</div>
              </div>
              <div className="text-xs text-gray-500 mb-2">Page views and downloads for the last 6 months</div>
              {/* TODO: Insert bar chart here */}
              <div className="h-48 flex items-center justify-center text-gray-300">[Bar Chart]</div>
            </div>
          </section>
          {/* Details/Secondary Nav (Orders, Reviews) */}
          <section className="px-6 py-6">
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 font-medium text-sm border-b-2 ${activeTab === 'orders' ? 'border-blue-500 text-blue-600' : 'border-transparent text-white hover:text-blue-400'}`}>Orders</button>
              <button onClick={() => setActiveTab('reviews')} className={`py-2 px-4 font-medium text-sm border-b-2 ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-white hover:text-blue-400'}`}>Reviews</button>
            </div>
            <div>
              {activeTab === 'orders' ? (
                <OrdersTab orders={orders} onUpdateOrderStatus={updateOrderStatus} />
              ) : (
                <ReviewsTab reviews={reviews} onDeleteReview={deleteReview} />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel; 