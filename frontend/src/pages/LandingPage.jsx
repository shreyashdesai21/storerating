import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Search,
  MapPin,
  Building2,
  ShoppingBag,
  Tv,
  Utensils,
  Wrench,
  ArrowRight,
  Sparkles,
  Store,
  Quote,
  CheckCircle2,
  Users,
  ChevronRight,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Stores', icon: Store },
  { id: 'Grocery', name: 'Grocery', icon: ShoppingBag },
  { id: 'Electronics', name: 'Electronics', icon: Tv },
  { id: 'Fashion', name: 'Fashion', icon: Building2 },
  { id: 'Restaurants', name: 'Restaurants', icon: Utensils },
  { id: 'Services', name: 'Services', icon: Wrench },
];

const INITIAL_STORES = [
  {
    id: 's1',
    name: 'Green Grocery',
    location: 'Kolhapur, Maharashtra',
    category: 'Grocery',
    rating: 4.8,
    ratingCount: 142,
    address: '12 Retail Market, Kolhapur',
    badge: 'Popular',
    imageBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 's2',
    name: 'Tech Hub Electronics',
    location: 'Pune, Maharashtra',
    category: 'Electronics',
    rating: 4.6,
    ratingCount: 98,
    address: '500 Innovation Way, Pune',
    badge: 'Top Tech',
    imageBg: 'bg-indigo-50 text-indigo-700',
  },
  {
    id: 's3',
    name: 'Fashion Forward',
    location: 'Mumbai, Maharashtra',
    category: 'Fashion',
    rating: 4.3,
    ratingCount: 76,
    address: '88 Design Galleria, Mumbai',
    badge: 'Trending',
    imageBg: 'bg-violet-50 text-violet-700',
  },
  {
    id: 's4',
    name: 'Urban Coffee Roasters',
    location: 'Austin, Texas',
    category: 'Restaurants',
    rating: 4.9,
    ratingCount: 215,
    address: '12 Main Street, Austin',
    badge: 'Featured',
    imageBg: 'bg-[#EEF2FF] text-indigo-700',
  },
  {
    id: 's5',
    name: 'Fresh Organic Market',
    location: 'Portland, Oregon',
    category: 'Grocery',
    rating: 4.7,
    ratingCount: 180,
    address: '88 Green Valley Rd, Portland',
    badge: 'Eco Choice',
    imageBg: 'bg-teal-50 text-teal-700',
  },
  {
    id: 's6',
    name: 'Metro Care Services',
    location: 'Delhi, NCR',
    category: 'Services',
    rating: 4.5,
    ratingCount: 64,
    address: '45 Business Park, Delhi',
    badge: 'Verified',
    imageBg: 'bg-blue-50 text-blue-700',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Kolhapur',
    store: 'Green Grocery',
    rating: 5,
    avatar: 'PS',
    avatarBg: 'bg-indigo-600 text-white',
    review:
      'Hands down the freshest organic produce in Kolhapur! The customer ratings gave me full confidence to switch my weekly grocery runs here.',
  },
  {
    name: 'Rahul Verma',
    location: 'Pune',
    store: 'Tech Hub Electronics',
    rating: 5,
    avatar: 'RV',
    avatarBg: 'bg-slate-900 text-white',
    review:
      'Found honest customer reviews before buying my mirrorless camera. Super smooth transaction, authentic warranty, and top-notch guidance.',
  },
  {
    name: 'Ananya Patel',
    location: 'Mumbai',
    store: 'Fashion Forward',
    rating: 4.5,
    avatar: 'AP',
    avatarBg: 'bg-indigo-700 text-white',
    review:
      'StoreRating made it so easy to discover hidden boutique clothing stores in Mumbai. Highly recommend checking ratings before shopping!',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStores = useMemo(() => {
    return INITIAL_STORES.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || store.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const storesSection = document.getElementById('stores-section');
    if (storesSection) {
      storesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePopularTagClick = (tag) => {
    setSelectedCategory(tag);
    setSearchQuery('');
    const storesSection = document.getElementById('stores-section');
    if (storesSection) {
      storesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Store<span className="text-indigo-600">Rating</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#discover"
              className="hover:text-indigo-600 transition-colors"
            >
              Discover
            </a>
            <a
              href="#stores-section"
              className="hover:text-indigo-600 transition-colors"
            >
              Stores
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#store-owners"
              className="hover:text-indigo-600 transition-colors"
            >
              For Store Owners
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="discover" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-slate-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DISCOVER • RATE • TRUST</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                Find stores <br className="hidden sm:inline" />
                <span className="text-indigo-600 relative">
                  worth talking about.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Explore customer ratings, discover new stores, and share your experience with the community.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#stores-section"
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 text-base group"
                >
                  <span>Explore Stores</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  to="/login"
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-all text-base flex items-center gap-2"
                >
                  <span>Rate a Store</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>100% Verified Ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>10,000+ Community Buyers</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Composition of Overlapping Store Rating Cards */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
                {/* Decorative Ambient Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none" />

                {/* Card 1: Green Grocery */}
                <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 z-20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                        🌱
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          Green Grocery
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-indigo-600" />
                          <span>Kolhapur, Maharashtra</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                      Grocery
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        4.8
                      </span>
                      <span className="text-xs text-slate-500">
                        (142 ratings)
                      </span>
                    </div>

                    {/* Customer Avatars */}
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        PS
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        AK
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-900 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        +24
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Tech Hub Electronics (Overlapping Right) */}
                <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 transform sm:translate-x-6 sm:-translate-y-3 z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                        ⚡
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          Tech Hub Electronics
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-indigo-600" />
                          <span>Pune, Maharashtra</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                      Electronics
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        4.6
                      </span>
                      <span className="text-xs text-slate-500">
                        (98 ratings)
                      </span>
                    </div>

                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        RV
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        SK
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-700 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        +18
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Fashion Forward (Overlapping Bottom Left) */}
                <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 transform sm:-translate-x-4 sm:-translate-y-4 z-30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                        👕
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          Fashion Forward
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-indigo-600" />
                          <span>Mumbai, Maharashtra</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                      Fashion
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <Star className="w-4 h-4 text-slate-300" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        4.3
                      </span>
                      <span className="text-xs text-slate-500">
                        (76 ratings)
                      </span>
                    </div>

                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        AP
                      </div>
                      <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        KP
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white">
                        +12
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Experience Section */}
      <section className="relative -mt-6 lg:-mt-10 z-30 mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl p-3 sm:p-4 border border-indigo-100">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="relative w-full flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stores by name or address..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 rounded-2xl text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 text-base shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Popular Search Tags */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center flex-wrap gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Popular:</span>
              {['Grocery', 'Electronics', 'Fashion', 'Restaurants'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handlePopularTagClick(tag)}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all font-medium border border-indigo-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Store Categories Chips */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Explore Categories
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Filter stores by industry category
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all shadow-xs border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Stores Section */}
      <section id="stores-section" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-100">
                Curated Directory
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Stores
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Top-rated local stores verified by our buyer community
              </p>
            </div>

            <Link
              to="/login"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group self-start md:self-auto"
            >
              <span>View All Registered Stores</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stores Grid */}
          {filteredStores.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-md mx-auto">
              <Store className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-900">No stores match your search</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Try searching for another keyword or clear your category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl text-xs hover:bg-indigo-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center text-lg ${store.imageBg}`}
                      >
                        <Store className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                        {store.badge}
                      </span>
                    </div>

                    {/* Store Title & Location */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{store.address}</span>
                    </p>

                    {/* Rating Stats */}
                    <div className="mt-5 flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(store.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200 fill-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm ml-1">
                        {store.rating}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({store.ratingCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      to="/login"
                      className="w-full bg-slate-50 text-indigo-600 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition-all text-center flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Store</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Section: "Real people. Real experiences." */}
      <section id="how-it-works" className="py-16 bg-slate-50/70 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
              Community Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real people. Real experiences.
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Transparent feedback from shoppers who rate stores based on real customer service, product quality, and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 relative flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <Quote className="w-8 h-8 text-indigo-600/15 absolute top-6 right-6" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-slate-800 leading-relaxed italic mb-6">
                    "{item.review}"
                  </p>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center shadow-xs ${item.avatarBg}`}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Reviewed <span className="font-semibold text-indigo-600">{item.store}</span> ({item.location})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Owner CTA Section */}
      <section id="store-owners" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F5F7FF] via-indigo-50/70 to-slate-100 text-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-indigo-100 shadow-lg">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-purple-200/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200">
                Merchant Portal
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                Own a store?
              </h2>
              <p className="text-xl font-semibold text-indigo-900 mb-3">
                Understand how customers experience your business.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xl">
                Claim your store profile, respond to customer feedback, analyze rating trends, and grow customer loyalty with real insights.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all text-base group"
              >
                <span>Store Owner Login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30">
            <Star className="w-7 h-7 text-white fill-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Start discovering better stores today.
          </h2>

          <p className="text-base text-indigo-100 max-w-lg mx-auto mb-8 leading-relaxed">
            Join thousands of smart buyers sharing authentic ratings and finding top-quality local store experiences.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 font-extrabold px-8 py-4 rounded-2xl text-lg hover:bg-slate-50 shadow-xl transition-all group"
          >
            <span>Explore StoreRating</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                StoreRating
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#discover" className="hover:text-white transition-colors">
                Discover
              </a>
              <a href="#stores-section" className="hover:text-white transition-colors">
                Stores
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} StoreRating Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
