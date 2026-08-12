import React, { useState, useEffect, useRef } from 'react';
import GradientWaves from './components/GradientWaves';
import ElasticMesh from './components/ElasticMesh';
import BorderGlow from './components/BorderGlow';
import WarpText from './components/WarpText';
import BlurText from './components/BlurText';
import GlassSurface from './components/GlassSurface';
import SpotlightCard from './components/SpotlightCard';
import ClickSpark from './components/ClickSpark';
import CountUp from './components/CountUp';
import DecryptedText from './components/DecryptedText';
import GlassTorus3D from './components/GlassTorus3D';
import {
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  CreditCard,
  Lock,
  Mail,
  ChevronDown,
  ChevronRight,
  Globe,
  Layers,
  Users,
  Building2,
  Menu,
  X,
  Star
} from 'lucide-react';

const BRANDS = [
  { name: 'Vireon', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" /></svg> },
  { name: 'Linkora', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h5l6 16H10L4 4zm11 0h5l-6 16h-5l6-16z" /></svg> },
  { name: 'Converra', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" /></svg> },
  { name: 'Nexora', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 5l5 5-5 5-5-5 5-5z" /></svg> },
  { name: 'Syncell', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 12.5L9 19 21.5 6.5l-3-3L9 13l-3.5-3.5z" /></svg> },
  { name: 'Socium', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h9v9H2V2zm11 0h9v9h-9V2zm0 11h9v9h-9v-9zm-11 0h9v9H2v-9z" /></svg> },
  { name: 'Bridgr', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20L16 4h5L8 20H3z" /></svg> },
  { name: 'Netsync', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h11v11H2V2zm9 9h11v11H11V11z" /></svg> },
  { name: 'Vortexa', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 20H2L12 2zm0 6l-5 10h10l-5-10z" /></svg> },
  { name: 'Pulse', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h4l3-9 4 18 3-9h4v-2h-5l-2.5 7.5L10 3.5 7.5 13H3z" /></svg> },
  { name: 'Kinetix', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h5l6 10-6 10H4l6-10L4 2zm11 0h5l-6 10 6 10h-5l-6-10 6-10z" /></svg> },
  { name: 'Luminary', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" /></svg> },
  { name: 'Stratum', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h20v4H2V4zm0 6h20v4H2v-4zm0 6h20v4H2v-4z" /></svg> },
  { name: 'Hyperion', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 4l6 3v6l-6 3-6-3V9l6-3z" /></svg> },
  { name: 'Omnia', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6z" /></svg> },
  { name: 'Spectra', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 18h20v4H2v-4zm4-7h12v4H6v-4zm4-7h4v4h-4V4z" /></svg> },
  { name: 'Aura', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="4" fill="none" /></svg> },
  { name: 'Zenith', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v4L9 16h12v4H3v-4l12-8H3V4z" /></svg> },
  { name: 'Apex', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 5l6.5 11.5h-13L12 7z" /></svg> },
  { name: 'Novus', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h5l6 13V2h5v20h-5L9 9v13H4V2z" /></svg> },
  { name: 'Element', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v4H8v4h11v4H8v4h13v4H3V3z" /></svg> },
  { name: 'Prism', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 6l4.5 9h-9L12 8z" /></svg> },
  { name: 'Quantum', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 5a5 5 0 1 1-5 5 5 5 0 0 1 5-5z" /></svg> },
  { name: 'Cipher', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-10 10h4a6 6 0 1 1 6 6v4a10 10 0 0 0 0-20z" /></svg> },
  { name: 'Velocity', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h6l4 16H7L3 4zm8 0h6l4 16h-6l-4-16z" /></svg> },
  { name: 'Synthetix', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 4l6 3.6v4.8L12 18l-6-3.6V9.6L12 6z" /></svg> },
  { name: 'Orbit', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="3" fill="none" transform="rotate(-30 12 12)" /></svg> },
  { name: 'Axis', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" /></svg> },
  { name: 'Helix', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2c5 0 10 5 10 10s-5 10-10 10h4c5 0 10-5 10-10S13 2 8 2H4z" /></svg> },
  { name: 'Matrix', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h5l5 10 5-10h5v20h-4V8l-6 11-6-11v14H2V2z" /></svg> },
  { name: 'Nexus', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.5L18.5 9 12 12.5 5.5 9 12 5.5z" /></svg> },
  { name: 'Vector', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 6l4 8H8l4-8z" /></svg> },
  { name: 'Paradigm', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v4H8v4h12v4H8v4h12v4H4V4z" /></svg> },
  { name: 'Fortress', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22V6l5-4 5 4 5-4 5 4v16H2zm4-4h4v-4H6v4zm8 0h4v-4h-4v4z" /></svg> },
  { name: 'Catalyst', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 4a6 6 0 0 1 6 6h-6V6z" /></svg> },
  { name: 'Aether', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 22h4l4-10 4 10h4L12 2z" /></svg> },
  { name: 'Solstice', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" fill="currentColor" /><path d="M12 0v4m0 16v4M0 12h4m16 0h4" stroke="currentColor" strokeWidth="3" /></svg> },
  { name: 'Titan', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v5h-7v15H9V7H2V2z" /></svg> },
  { name: 'Centric', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" /><circle cx="12" cy="12" r="4" fill="currentColor" /></svg> },
  { name: 'Forge', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h16v4H4V2zm2 6h12v4H6V8zm-4 6h20v8H2v-8z" /></svg> },
  { name: 'Flux', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v4H9v4h10v4H9v6H3V3z" /></svg> },
  { name: 'Meridian', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 0 14V5z" /></svg> },
  { name: 'Beacon', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l4 8h-8l4-8zm-6 10h12l2 10H4l2-10z" /></svg> },
  { name: 'Core', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" /></svg> },
  { name: 'Pulsewave', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12h4l3-8 4 16 3-8h6" stroke="currentColor" strokeWidth="3" fill="none" /></svg> },
  { name: 'Elysium', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l7 3.5v7L12 19l-7-3.5v-7L12 5z" /></svg> },
  { name: 'Cobalt', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /></svg> },
  { name: 'Vanguard', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h6l4-8 4 8h6L12 2z" /></svg> },
  { name: 'Infini', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8a4 4 0 0 0-4 4 4 4 0 0 1-4 4 4 4 0 1 1 0-8 4 4 0 0 1 4 4 4 4 0 0 0 4 4 4 4 0 1 0 0-8z" /></svg> },
  { name: 'Monolith', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="2" width="12" height="20" rx="2" fill="currentColor" /></svg> },
  { name: 'Synergy', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 7 10-7-10-7zm0 11L2 16l10 7 10-7-10-7z" /></svg> },
  { name: 'Aero', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3L3 10.5l7 3.5 3.5 7L21 3z" /></svg> }
];

const TESTIMONIALS_COL1 = [
  {
    stars: 5,
    quote: "Quanta has transformed how we manage our analytics and sales. The unified dashboard is a game-changer!",
    name: "Sarah Johnson",
    role: "Co-founder of Monday",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "Quanta's CRM integration makes managing customer data effortless. It's incredibly user-friendly.",
    name: "Chris Wright",
    role: "CEO of Wednesday",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "We reduced our monthly closing cycle from 12 days to under 4 hours. Absolute essential software.",
    name: "Elena Rostova",
    role: "VP Finance at Solaris",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "The real-time cashflow predictions prevented a major liquidity pinch last quarter. Worth 10x the price.",
    name: "David Chen",
    role: "Head of Ops at Nexa",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  }
];

const TESTIMONIALS_COL2 = [
  {
    stars: 5,
    quote: "Seamless and efficient. Automated reports save us so much time every single week!",
    name: "Jonathan Day",
    role: "Co-founder of Monday",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "Real-time notifications ensure we're always on top of our sales activities. Highly recommend!",
    name: "Melissa Reid",
    role: "Founder of Tuesday",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "Integration with our existing tools was seamless. Quanta fits perfectly into our workflow.",
    name: "Marcus Vance",
    role: "CFO at Kinetix",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "The automated reconciliation feature eliminated hours of manual spreadsheet entries.",
    name: "Sophia Patel",
    role: "Director at Apex Global",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80"
  }
];

const TESTIMONIALS_COL3 = [
  {
    stars: 5,
    quote: "The advanced analytics feature helped us identify key trends and boost our sales strategy.",
    name: "Mark Thompson",
    role: "Founder of Tuesday",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "The customizable dashboards allow us to focus on what matters most to our business.",
    name: "Terri Williams",
    role: "Founder of Thursday",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "Bank-grade encryption gave our compliance team peace of mind from day one.",
    name: "Alex Rivers",
    role: "CTO at Hyperion",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80"
  },
  {
    stars: 5,
    quote: "Scaling our global multi-currency operations was painless thanks to Quanta's FX engine.",
    name: "Hannah Abbott",
    role: "COO at Luminary",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
  }
];

export default function App() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [monthlyVolume, setMonthlyVolume] = useState(50000);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribeEmail.trim() && subscribeEmail.includes('@')) {
      setSubscribedSuccess(true);
    }
  };

  // Custom floating scrollbar — zero layout impact, appears only on scroll
  useEffect(() => {
    const html = document.documentElement;

    // Create scrollbar track + thumb elements
    const track = document.createElement('div');
    track.id = 'custom-scrollbar';
    const thumb = document.createElement('div');
    thumb.id = 'custom-scrollbar-thumb';
    track.appendChild(thumb);
    document.body.appendChild(track);

    let hideTimer;
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewHeight = window.innerHeight;

      // 1. Custom scrollbar thumb calculation
      const docHeight = document.documentElement.scrollHeight - viewHeight;
      const thumbHeight = Math.max(40, (viewHeight / (docHeight + viewHeight)) * viewHeight);
      const thumbTop = docHeight > 0 ? (scrollY / docHeight) * (viewHeight - thumbHeight) : 0;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${thumbTop}px`;

      // 2. Hero Exit Breathing Parallax (headline, subtext & preview sink back smoothly)
      const heroSection = document.querySelector('.hero-section');
      const heroContent = document.querySelector('.hero-content');
      const heroAppCard = document.querySelector('.hero-app-card');

      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (scrollY <= heroHeight * 1.2) {
          const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
          // Slower upward translation (35% rate) & soft opacity fade (1.0 -> 0.55)
          const contentTY = scrollY * 0.35;
          const contentOpacity = 1 - progress * 0.45;
          const appTY = scrollY * 0.18;

          if (heroContent) {
            heroContent.style.transform = `translate3d(0, ${contentTY}px, 0)`;
            heroContent.style.opacity = contentOpacity.toFixed(3);
          }
          if (heroAppCard) {
            heroAppCard.style.transform = `translate3d(0, ${appTY}px, 0)`;
          }
        }
      }

      // 3. Next Section Entry Breathing (Scale-up 0.96 -> 1, Fade-in 0.15 -> 1, 24px ease-up)
      const enterElements = document.querySelectorAll('.scroll-breathing-enter');
      enterElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const triggerPoint = viewHeight * 0.88;
        const fullyEntered = viewHeight * 0.25;

        if (rect.top <= triggerPoint && rect.bottom >= 0) {
          const rawProgress = (triggerPoint - rect.top) / (triggerPoint - fullyEntered);
          const progress = Math.min(1, Math.max(0, rawProgress));
          // Smooth cubic-bezier(0.16, 1, 0.3, 1) ease-out curve
          const eased = 1 - Math.pow(1 - progress, 3);

          const scale = (0.96 + 0.04 * eased).toFixed(3);
          const opacity = (0.15 + 0.85 * eased).toFixed(3);
          const translateY = ((1 - eased) * 24).toFixed(2);

          el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          el.style.opacity = opacity;
        } else if (rect.top > triggerPoint) {
          el.style.transform = `translate3d(0, 24px, 0) scale(0.96)`;
          el.style.opacity = '0.15';
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      html.classList.add('is-scrolling');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => html.classList.remove('is-scrolling'), 900);

      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    updateScrollEffects();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(hideTimer);
      html.classList.remove('is-scrolling');
      if (track.parentNode) track.parentNode.removeChild(track);
    };
  }, []);

  // Calculated ROI savings based on slider
  const hoursSaved = Math.round((monthlyVolume / 50000) * 18);
  const moneySaved = Math.round((monthlyVolume * 0.012));

  const faqs = [
    {
      q: "How does Quanta integrate with our existing financial stack?",
      a: "Quanta connects seamlessly via 100+ native banking integrations, Stripe, Plaid, QuickBooks, Xero, and customizable Webhook APIs. Syncing takes under 5 minutes with zero code required."
    },
    {
      q: "Is our financial data secure on Quanta?",
      a: "Security is our highest priority. Quanta uses SOC2 Type II certified infrastructure, AES-256 bit encryption at rest, end-to-end TLS 1.3 in transit, and bank-grade OAuth 2.0 authorization."
    },
    {
      q: "Can I manage multiple business entities or currencies?",
      a: "Yes! Quanta supports unlimited multi-entity management with real-time foreign exchange FX conversion across 140+ global currencies, allowing consolidated reporting at any instant."
    },
    {
      q: "How long does the 14-day free trial last and what's included?",
      a: "You get full access to all Professional features for 14 days without entering a credit card. You can invite your team, connect live bank feeds, and test automated reports immediately."
    }
  ];


  return (
    <ClickSpark
      sparkColor="#a892ee"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={10}
      duration={450}
      extraScale={1.2}
    >
      <div className="app-container">
        {/* HERO SECTION — Nexio Frame Design */}
        <section id="hero" className="hero-section">
          <div className="hero-frame">
            {/* Navigation Bar inside top of hero frame */}
            <div className="navbar-container">
              <nav className="navbar">
                <a href="#" className="nav-brand">
                  <div className="nav-logo-icon">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 19.5C5 15.5 5.7 8.5 10 4.5C12 8.5 11.3 15.5 7.5 19.5Z" fill="#ffffff" />
                      <path d="M13.5 19.5C11 15.5 11.7 8.5 16 4.5C18 8.5 17.3 15.5 13.5 19.5Z" fill="#ffffff" />
                    </svg>
                  </div>
                  <span>Quanta</span>
                </a>

                <ul className="nav-links desktop-only">
                  <li><a href="#hero" className="nav-link active">Home</a></li>
                  <li><a href="#features" className="nav-link">Features</a></li>
                  <li><a href="#pricing" className="nav-link">Pricing</a></li>
                  <li><a href="#workflow" className="nav-link">Contact</a></li>
                  <li
                    className="nav-item-dropdown"
                    onMouseEnter={() => setPagesDropdownOpen(true)}
                    onMouseLeave={() => setPagesDropdownOpen(false)}
                  >
                    <a
                      href="#pages"
                      className="nav-link"
                      onClick={(e) => { e.preventDefault(); setPagesDropdownOpen(!pagesDropdownOpen); }}
                    >
                      Pages <ChevronDown size={14} className={`chevron-icon ${pagesDropdownOpen ? 'open' : ''}`} />
                    </a>
                    {pagesDropdownOpen && (
                      <div className="nav-dropdown-menu">
                        <a href="#hero" className="dropdown-item">Overview</a>
                        <a href="#workflow" className="dropdown-item">Workflow</a>
                        <a href="#features" className="dropdown-item">Analytics</a>
                        <a href="#pricing" className="dropdown-item">Pricing Plans</a>
                        <a href="#faq" className="dropdown-item">FAQ</a>
                      </div>
                    )}
                  </li>
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <a href="#pricing" className="btn-nav-cta desktop-only">
                    Free Trial
                  </a>
                  <button
                    className="mobile-menu-btn desktop-hide"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </nav>

              {/* Mobile Navigation Dropdown */}
              {mobileMenuOpen && (
                <div style={{
                  marginTop: '8px',
                  background: 'rgba(12, 10, 20, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <a href="#hero" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
                  <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
                  <a href="#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                  <a href="#workflow" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                  <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pages</a>
                  <a href="#pricing" className="btn-nav-cta" style={{ textAlign: 'center', marginTop: '8px' }} onClick={() => setMobileMenuOpen(false)}>Free Trial</a>
                </div>
              )}
            </div>

            {/* Full-bleed WebGL waves inside the frame */}
            <div className="hero-waves-bg">
              <GradientWaves
                horizonColor="#120c24"
                waveColor="#4a3b77"
                crestColor="#a892ee"
                speed={0.35}
                amplitude={2.8}
                waveScale={0.6}
                waveRatio={0.9}
                swell={35}
                turbulence={22}
                tilt={1.11}
                zoom={1.0}
                height={5.5}
                fogDepth={16}
                detail="medium"
                brightness={1.0}
                opacity={0.9}
                mouseInteraction={true}
                parallaxStrength={1.4}
                grain={true}
                grainIntensity={0.04}
              />
            </div>

            {/* Side ambient purple blobs inside the frame */}
            <div className="hero-glow-left" />
            <div className="hero-glow-right" />

            {/* Hero text content */}
            <div className="hero-content">
              <div className="hero-badge-wrapper">
                <div className="badge-line left-line">
                  <span className="badge-dot" />
                </div>
                <div className="badge-pill" style={{ cursor: 'pointer' }}>
                  <DecryptedText
                    text="Simplify your financial workflow"
                    animateOn="hover"
                    sequential={true}
                    speed={75}
                    revealDirection="start"
                  />
                </div>
                <div className="badge-line right-line">
                  <span className="badge-dot" />
                </div>
              </div>

              <BlurText
                as="h1"
                text="Enhance your financial control with Quanta"
                className="hero-title"
                animateBy="words"
                delay={90}
                direction="bottom"
                stepDuration={0.3}
                style={{ justifyContent: 'center' }}
              />

              <p className="hero-subtitle">
                Streamline your business's financial management with our intuitive, scalable SaaS platform. Designed for modern enterprises.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#pricing" className="btn-primary">
                  Get started <ArrowRight size={16} />
                </a>
                <a href="#workflow" className="btn-secondary">
                  <Play size={14} fill="currentColor" /> See How It Works
                </a>
              </div>
            </div>

            {/* Screenshot — rounded top, flat bottom bleeds out of frame */}
            <div className="hero-app-wrapper">
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={28}
                borderWidth={0.08}
                brightness={60}
                opacity={0.85}
                blur={16}
                displace={5}
                distortionScale={-160}
                redOffset={5}
                greenOffset={15}
                blueOffset={25}
                mixBlendMode="screen"
                className="hero-app-card"
              >
                <img
                  src="/applay.png"
                  alt="Quanta Financial Dashboard Application Preview"
                  className="hero-app-img"
                />
              </GlassSurface>
            </div>
          </div>
        </section>

        {/* CLIENT LOGO MARQUEE */}
        <section className="logo-cloud-section scroll-breathing-enter">
          <p className="logo-cloud-label">You're in good company</p>
          <div className="logo-marquee-container">
            <div className="logo-marquee-track">
              <div className="logo-marquee-content">
                {BRANDS.map((b, i) => (
                  <div key={i} className="logo-item">
                    {b.icon}
                    <span>{b.name}</span>
                  </div>
                ))}
              </div>
              <div className="logo-marquee-content" aria-hidden="true">
                {BRANDS.map((b, i) => (
                  <div key={`dup-${i}`} className="logo-item">
                    {b.icon}
                    <span>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section id="workflow" className="workflow-section scroll-breathing-enter">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="badge-pill">
              <Zap size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Our workflow</span>
            </div>
            <BlurText
              as="h2"
              text="How our platform makes your workflow easier"
              className="section-title"
              animateBy="words"
              delay={80}
              direction="top"
              stepDuration={0.28}
              style={{ justifyContent: 'center' }}
            />
          </div>

          <div className="workflow-grid">
            {/* Main Large Card - Screenshot Focus */}
            <div className="workflow-card-main glass-panel">
              <div className="workflow-card-header">
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#a892ee', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Real-Time Control</span>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', marginTop: '4px' }}>Complete Overview in One Screen</h3>
                </div>
                <div className="workflow-card-tabs">
                  <button
                    onClick={() => setActiveTab('overview')}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      background: activeTab === 'overview' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.06)',
                      color: '#ffffff',
                      border: '1px solid ' + (activeTab === 'overview' ? 'transparent' : 'rgba(255,255,255,0.12)'),
                      fontSize: '0.85rem',
                      fontWeight: '650',
                      letterSpacing: '0.02em',
                      fontFamily: 'var(--font-main)',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'overview' ? '0 0 14px rgba(168, 85, 247, 0.45)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('income')}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      background: activeTab === 'income' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.06)',
                      color: activeTab === 'income' ? '#ffffff' : '#9ca3af',
                      border: '1px solid ' + (activeTab === 'income' ? 'transparent' : 'rgba(255,255,255,0.12)'),
                      fontSize: '0.85rem',
                      fontWeight: '650',
                      letterSpacing: '0.02em',
                      fontFamily: 'var(--font-main)',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'income' ? '0 0 14px rgba(168, 85, 247, 0.45)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Analytics
                  </button>
                </div>
              </div>

              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={16}
                borderWidth={0.08}
                brightness={55}
                opacity={0.9}
                blur={14}
                displace={3}
                distortionScale={-150}
                redOffset={5}
                greenOffset={12}
                blueOffset={22}
                mixBlendMode="difference"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <img
                  src="/applay.png"
                  alt="Quanta Workflow App Feature Detail"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
                />
              </GlassSurface>
            </div>

            {/* Side Card - Link Your Accounts */}
            <div className="workflow-card-side glass-panel">
              <div>
                <span style={{ fontSize: '0.82rem', color: '#a892ee', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Seamless Sync</span>
                <h3 style={{ color: '#fff', fontSize: '1.55rem', fontWeight: '700', marginTop: '6px', marginBottom: '10px' }}>
                  Link Your Accounts
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.55' }}>
                  Connect 100+ global banking feeds and enterprise ERPs in minutes with zero-code OAuth 2.0 authorization.
                </p>
              </div>

              {/* Connected Institutions Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(168, 146, 238, 0.12)', border: '1px solid rgba(168, 146, 238, 0.25)', padding: '4px 10px', borderRadius: '20px', color: '#fff', fontSize: '0.75rem', fontWeight: '600' }}>
                  <span className="security-pulse-dot" /> Stripe API
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '4px 10px', borderRadius: '20px', color: '#d1d5db', fontSize: '0.75rem' }}>
                  Plaid Feed
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '4px 10px', borderRadius: '20px', color: '#d1d5db', fontSize: '0.75rem' }}>
                  QuickBooks
                </div>
              </div>

              <div style={{ background: 'rgba(10, 8, 18, 0.85)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.82rem', fontWeight: '500' }}>Consolidated Treasury</span>
                  <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '700', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '2px 8px', borderRadius: '10px' }}>+14.2% YoY</span>
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                  $14,090,090.00
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(123, 99, 191, 0.25)', border: '1px solid rgba(168, 146, 238, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={16} color="#a892ee" />
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '600' }}>Primary Operating Vault</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.74rem' }}>SVB Chase Primary</div>
                      </div>
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '700' }}>$12,980,000</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.18)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={16} color="#34d399" />
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: '600' }}>Stripe Revenue Stream</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.74rem' }}>Auto-Synced Live</div>
                      </div>
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '700' }}>$1,110,090</span>
                  </div>
                </div>
              </div>

              <a href="#pricing" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', gap: '8px', padding: '13px 28px', fontWeight: '600' }}>
                Connect Accounts Now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 3D GLASS INTEGRATION SHOWCASE SECTION */}
        <section className="scroll-breathing-enter integration-showcase-wrapper">
          <div className="integration-ambient-glow" />

          <div className="glass-3d-integration-container">
            {/* Left Column: Interactive WebGL 3D Glass Torus Object with Orbiting Floating Chips */}
            <div className="glass-3d-model-wrapper">
              {/* Floating Metric Badge 1 */}
              <div className="hero-float-chip float-chip-1" style={{ pointerEvents: 'none', background: 'rgba(18, 14, 30, 0.88)', border: '1px solid rgba(168, 146, 238, 0.3)' }}>
                <Zap size={14} style={{ color: '#a892ee' }} />
                <span>&lt; 2ms API Latency</span>
              </div>

              {/* Floating Metric Badge 2 */}
              <div className="hero-float-chip float-chip-2" style={{ pointerEvents: 'none', background: 'rgba(18, 14, 30, 0.88)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                <ShieldCheck size={14} style={{ color: '#34d399' }} />
                <span>99.99% SLA Uptime</span>
              </div>

              {/* 3D WebGL Torus */}
              <GlassTorus3D height="480px" />
            </div>

            {/* Right Column: Content */}
            <div>
              <div className="badge-pill" style={{ marginBottom: '16px' }}>
                <Layers size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
                <span>Seamless API Integration</span>
              </div>

              <BlurText
                as="h2"
                text="Easily integrate our services into your product"
                animateBy="words"
                delay={80}
                direction="top"
                stepDuration={0.28}
                style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '18px' }}
              />

              <p style={{ color: '#9ca3af', fontSize: '1.05rem', lineHeight: '1.65', marginBottom: '28px' }}>
                Connect your financial infrastructure in under 5 minutes. Sync revenue data, automated FX settlement, and multi-entity ledgers with 100+ native banking connectors, webhooks, and REST APIs.
              </p>

              <div className="integration-cta-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
                <a href="#pricing" className="btn-primary" style={{ padding: '13px 30px', fontSize: '0.98rem' }}>
                  Get Started <ArrowRight size={17} />
                </a>
                <a href="#features" className="btn-secondary" style={{ padding: '13px 26px', fontSize: '0.98rem' }}>
                  Explore API Specs
                </a>
              </div>

              {/* Mini Glass Feature Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div className="integration-mini-card">
                  <Globe size={16} style={{ color: '#a892ee', marginBottom: '6px' }} />
                  <div style={{ color: '#fff', fontSize: '0.84rem', fontWeight: '700' }}>100+ Banks</div>
                  <div style={{ color: '#6b7280', fontSize: '0.74rem' }}>Global Sync</div>
                </div>
                <div className="integration-mini-card">
                  <Zap size={16} style={{ color: '#c084fc', marginBottom: '6px' }} />
                  <div style={{ color: '#fff', fontSize: '0.84rem', fontWeight: '700' }}>Webhooks</div>
                  <div style={{ color: '#6b7280', fontSize: '0.74rem' }}>Real-time Events</div>
                </div>
                <div className="integration-mini-card">
                  <ShieldCheck size={16} style={{ color: '#34d399', marginBottom: '6px' }} />
                  <div style={{ color: '#fff', fontSize: '0.84rem', fontWeight: '700' }}>ISO 27001</div>
                  <div style={{ color: '#6b7280', fontSize: '0.74rem' }}>Bank Grade</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section id="features" className="features-section scroll-breathing-enter">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="badge-pill">
              <Layers size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Enterprise Features</span>
            </div>
            <BlurText
              as="h2"
              text="Built for speed, clarity, and total financial precision"
              className="section-title"
              animateBy="words"
              delay={70}
              direction="top"
              stepDuration={0.28}
              style={{ justifyContent: 'center' }}
            />
          </div>

          <div className="features-grid">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad1" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#7b63bf" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="13" width="4" height="8" rx="1.5" fill="url(#iconGrad1)" opacity="0.6" />
                  <rect x="10" y="8" width="4" height="13" rx="1.5" fill="url(#iconGrad1)" opacity="0.85" />
                  <rect x="17" y="3" width="4" height="18" rx="1.5" fill="url(#iconGrad1)" />
                  <path d="M4 11L10 6L18 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Instant Cashflow Analytics</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Monitor incoming revenue, expenses, and burn rate with live interactive charts and intelligent forecasting models.
              </p>
            </BorderGlow>

            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad2" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#7b63bf" />
                    </linearGradient>
                  </defs>
                  <path d="M12 3L4 6.5v5.5c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6.5L12 3z" fill="url(#iconGrad2)" fillOpacity="0.22" stroke="url(#iconGrad2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11.5l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Bank-Grade Encryption</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                SOC2 Type II certified security with multi-factor authentication, hardware security keys, and automated access logs.
              </p>
            </BorderGlow>

            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad3" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#7b63bf" />
                    </linearGradient>
                  </defs>
                  <path d="M20 11A8 8 0 0 0 5.6 6.8L3 9.5M4 13a8 8 0 0 0 14.4 4.2L21 14.5" stroke="url(#iconGrad3)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 5.2v4.3h4.3M21 18.8v-4.3h-4.3" stroke="url(#iconGrad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="4.5" fill="url(#iconGrad3)" fillOpacity="0.25" stroke="url(#iconGrad3)" strokeWidth="1.2" />
                  <path d="M10.2 12l1.3 1.3 2.5-2.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Automated Reconciliations</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Eliminate hours of manual data entry with self-learning AI algorithms that match invoices to transactions instantly.
              </p>
            </BorderGlow>

            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad4" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="9" stroke="url(#iconGrad4)" strokeWidth="1.8" fill="url(#iconGrad4)" fillOpacity="0.15" />
                  <path d="M3.6 9h16.8M3.6 15h16.8" stroke="#a892ee" strokeWidth="1.5" strokeLinecap="round" />
                  <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Multi-Currency FX Support</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Seamlessly handle international wires, currency exchange, and multi-subsidiary consolidation across 140+ countries.
              </p>
            </BorderGlow>

            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad5" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#7b63bf" />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="9" stroke="url(#iconGrad5)" strokeWidth="1.8" fill="url(#iconGrad5)" fillOpacity="0.15" />
                  <circle cx="12" cy="12" r="4.5" stroke="url(#iconGrad5)" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M12 7v10M7 12h10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="1.8" fill="#ffffff" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>AI-Powered Fraud Prevention</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Prevent unauthorized charges and anomaly transfers with real-time ML risk scoring and automated transaction holds.
              </p>
            </BorderGlow>

            <BorderGlow
              edgeSensitivity={30}
              glowColor="265 80 75"
              backgroundColor="#0d0a17"
              borderRadius={22}
              glowRadius={35}
              glowIntensity={1.0}
              coneSpread={25}
              fillOpacity={0.15}
              colors={['#7b63bf', '#a892ee', '#4a3b77']}
            >
              <div className="feature-icon-box">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="iconGrad6" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a892ee" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="url(#iconGrad6)" fillOpacity="0.2" stroke="url(#iconGrad6)" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M14 2v6h6" stroke="url(#iconGrad6)" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M8 13h8M8 17h5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Smart Audit & Compliance</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Maintain continuous SOC2 & ISO 27001 readiness with immutable event logs, automated tax mapping, and instant export.
              </p>
            </BorderGlow>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR & LIVE GRAPH SECTION */}
        <section className="roi-section">
          {(() => {
            const maxSavings = Math.max(moneySaved * 1.2, 5000);
            const sliderFillPercent = Math.min(Math.max(((monthlyVolume - 10000) / (500000 - 10000)) * 100, 0), 100);
            const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
            const graphPoints = months.map((month, idx) => {
              const fraction = (idx + 1) / 6;
              const currentVal = Math.round(moneySaved * Math.pow(fraction, 1.25));
              const manualCost = Math.round(moneySaved * 0.35 * fraction);
              const x = 50 + (idx / 5) * 400;
              const yQuanta = 175 - (currentVal / maxSavings) * 130;
              const yManual = 175 - (manualCost / maxSavings) * 130;
              return { month, val: currentVal, manualCost, x, yQuanta, yManual };
            });

            const pathQuanta = graphPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yQuanta}`).join(' ');
            const areaQuanta = `${pathQuanta} L ${graphPoints[graphPoints.length - 1].x} 175 L ${graphPoints[0].x} 175 Z`;
            const pathManual = graphPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yManual}`).join(' ');

            return (
              <div className="roi-glass-container">
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <div className="badge-pill" style={{ marginBottom: '12px' }}>
                    <TrendingUp size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
                    <span>ROI Estimator</span>
                  </div>
                  <BlurText
                    as="h3"
                    text="Calculate Your Financial Efficiency Gain"
                    animateBy="words"
                    delay={80}
                    direction="top"
                    stepDuration={0.28}
                    style={{ color: '#fff', fontSize: '2rem', marginTop: '6px', justifyContent: 'center' }}
                  />
                  <p style={{ color: '#9ca3af', marginTop: '8px', fontSize: '0.95rem' }}>
                    Drag the volume slider or click presets to view real-time reconciliation savings and projected ROI trajectory.
                  </p>
                </div>

                <div className="roi-estimator-grid">
                  {/* Left Controls & Metrics */}
                  <div>
                    <div style={{ marginBottom: '28px' }}>
                      <div className="roi-volume-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: '#fff', fontWeight: '600', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.95rem', color: '#e5e7eb' }}>Monthly Transaction Volume:</span>
                        <span style={{ color: '#c084fc', fontSize: '1.4rem', fontWeight: '800' }}>
                          ${monthlyVolume.toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '400' }}>/ mo</span>
                        </span>
                      </div>

                      <input
                        type="range"
                        className="roi-custom-slider"
                        min="10000"
                        max="500000"
                        step="5000"
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                        style={{
                          background: `linear-gradient(90deg, #6366f1 0%, #a855f7 ${sliderFillPercent}%, rgba(255, 255, 255, 0.08) ${sliderFillPercent}%)`
                        }}
                      />

                      {/* Volume Range Scale Markers */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '600' }}>
                        <span>$10k</span>
                        <span>$100k</span>
                        <span>$250k</span>
                        <span>$500k</span>
                      </div>

                      {/* Quick Presets */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.78rem', color: '#6b7280', marginRight: '4px' }}>Quick Presets:</span>
                        {[25000, 100000, 250000, 500000].map((preset) => (
                          <button
                            key={preset}
                            className={`roi-preset-btn ${monthlyVolume === preset ? 'active' : ''}`}
                            onClick={() => setMonthlyVolume(preset)}
                          >
                            ${preset >= 1000 ? `${preset / 1000}k` : preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="roi-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      <div className="roi-metric-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a892ee', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px' }}>
                          <Zap size={15} />
                          <span>Time Saved</span>
                        </div>
                        <div style={{ fontSize: '1.9rem', fontWeight: '800', color: '#ffffff' }}>
                          ~{hoursSaved} <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: '500' }}>hrs/mo</span>
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '4px' }}>Saved in Reconciliation</div>
                      </div>

                      <div className="roi-metric-card" style={{ borderColor: 'rgba(16, 185, 129, 0.35)', background: 'rgba(16, 185, 129, 0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px' }}>
                          <TrendingUp size={15} />
                          <span>Annual Savings</span>
                        </div>
                        <div style={{ fontSize: '1.9rem', fontWeight: '800', color: '#34d399' }}>
                          ${moneySaved.toLocaleString()}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '4px' }}>Estimated Annual ROI</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Graph Panel */}
                  <div className="roi-graph-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.88rem', color: '#f3f4f6', fontWeight: '600' }}>6-Month Cumulative Savings</span>
                      <div className="roi-graph-legend">
                        <div className="legend-item">
                          <span className="legend-dot-quanta" />
                          <span>With Quanta</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot-manual" />
                          <span>Manual</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic SVG Graph */}
                    <svg viewBox="0 0 490 210" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="roiGradArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a892ee" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#7b63bf" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      <line x1="45" y1="40" x2="455" y2="40" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
                      <line x1="45" y1="85" x2="455" y2="85" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
                      <line x1="45" y1="130" x2="455" y2="130" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
                      <line x1="45" y1="175" x2="455" y2="175" stroke="rgba(255, 255, 255, 0.12)" />

                      {/* Y-Axis Label */}
                      <text x="40" y="44" fill="#6b7280" fontSize="10" textAnchor="end">${Math.round(maxSavings / 1000)}k</text>
                      <text x="40" y="110" fill="#6b7280" fontSize="10" textAnchor="end">${Math.round((maxSavings / 2) / 1000)}k</text>
                      <text x="40" y="179" fill="#6b7280" fontSize="10" textAnchor="end">$0</text>

                      {/* Manual Cost Line (Grey Dashed) */}
                      <path d={pathManual} fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="4 4" />

                      {/* Quanta Savings Area & Line */}
                      <path d={areaQuanta} fill="url(#roiGradArea)" />
                      <path d={pathQuanta} fill="none" stroke="#a892ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Data Points */}
                      {graphPoints.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.yQuanta} r={i === 5 ? "6" : "4"} fill={i === 5 ? "#ffffff" : "#a892ee"} stroke="#7b63bf" strokeWidth="2" />
                          <text x={p.x} y="196" fill="#9ca3af" fontSize="10" textAnchor="middle">{p.month}</text>
                        </g>
                      ))}

                      {/* Pulse Ring on Last Data Point */}
                      <circle cx={graphPoints[5].x} cy={graphPoints[5].yQuanta} r="10" fill="none" stroke="#a892ee" strokeWidth="1.5" opacity="0.6" />

                      {/* Tooltip Tag over Last Data Point */}
                      <g transform={`translate(${graphPoints[5].x - 65}, ${Math.max(graphPoints[5].yQuanta - 32, 10)})`}>
                        <rect width="130" height="24" rx="12" fill="#7b63bf" fillOpacity="0.95" stroke="#a892ee" strokeWidth="1" />
                        <text x="65" y="16" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
                          +${moneySaved.toLocaleString()}/yr Saved
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* METRICS & STATS BAR */}
        <section className="stats-section">
          <div className="stats-grid">
            <div>
              <div className="stat-number">
                <CountUp from={0} to={45.6} decimals={1} prefix="$" suffix="B+" duration={2.2} />
              </div>
              <div className="stat-label">Total Volume Processed</div>
            </div>
            <div>
              <div className="stat-number">
                <CountUp from={0} to={99.99} decimals={2} suffix="%" duration={2.2} />
              </div>
              <div className="stat-label">Platform Service Uptime</div>
            </div>
            <div>
              <div className="stat-number">
                <CountUp from={0} to={150} decimals={0} suffix="k+" duration={2.0} />
              </div>
              <div className="stat-label">Active Finance Professionals</div>
            </div>
            <div>
              <div className="stat-number">
                <CountUp from={40} to={2} decimals={0} prefix="< " suffix="ms" duration={1.8} />
              </div>
              <div className="stat-label">Global API Execution Speed</div>
            </div>
          </div>
        </section>

        {/* CUSTOMER STORIES TESTIMONIALS */}
        <section className="testimonials-section scroll-breathing-enter">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="badge-pill">
              <Users size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Customer Stories</span>
            </div>
            <BlurText
              as="h2"
              text="Scale faster than ever."
              className="section-title"
              animateBy="words"
              delay={90}
              direction="top"
              stepDuration={0.3}
              style={{ justifyContent: 'center' }}
            />
            <p style={{ color: '#9ca3af', marginTop: '12px', fontSize: '1rem', maxWidth: '540px', margin: '12px auto 0 auto' }}>
              Scalable isn't another fancy piece of software. It's engineered to make a difference.
            </p>
          </div>

          <div className="testimonials-grid-container">
            {/* Column 1 - Scrolls Up */}
            <div className="testimonials-column col-up-1">
              <div className="testimonials-track">
                {TESTIMONIALS_COL1.concat(TESTIMONIALS_COL1).map((item, idx) => (
                  <BorderGlow
                    key={idx}
                    edgeSensitivity={30}
                    glowColor="265 80 75"
                    backgroundColor="#110d1c"
                    borderRadius={18}
                    glowRadius={30}
                    glowIntensity={1.0}
                    coneSpread={25}
                    fillOpacity={0.15}
                    colors={['#7b63bf', '#a892ee', '#4a3b77']}
                    className="testimonial-card-glow"
                  >
                    <div className="testimonial-stars">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-author">
                      <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name">{item.name}</div>
                        <div className="testimonial-role">{item.role}</div>
                      </div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </div>

            {/* Column 2 - Scrolls Down */}
            <div className="testimonials-column col-down">
              <div className="testimonials-track">
                {TESTIMONIALS_COL2.concat(TESTIMONIALS_COL2).map((item, idx) => (
                  <BorderGlow
                    key={idx}
                    edgeSensitivity={30}
                    glowColor="265 80 75"
                    backgroundColor="#110d1c"
                    borderRadius={18}
                    glowRadius={30}
                    glowIntensity={1.0}
                    coneSpread={25}
                    fillOpacity={0.15}
                    colors={['#7b63bf', '#a892ee', '#4a3b77']}
                    className="testimonial-card-glow"
                  >
                    <div className="testimonial-stars">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-author">
                      <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name">{item.name}</div>
                        <div className="testimonial-role">{item.role}</div>
                      </div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </div>

            {/* Column 3 - Scrolls Up */}
            <div className="testimonials-column col-up-2">
              <div className="testimonials-track">
                {TESTIMONIALS_COL3.concat(TESTIMONIALS_COL3).map((item, idx) => (
                  <BorderGlow
                    key={idx}
                    edgeSensitivity={30}
                    glowColor="265 80 75"
                    backgroundColor="#110d1c"
                    borderRadius={18}
                    glowRadius={30}
                    glowIntensity={1.0}
                    coneSpread={25}
                    fillOpacity={0.15}
                    colors={['#7b63bf', '#a892ee', '#4a3b77']}
                    className="testimonial-card-glow"
                  >
                    <div className="testimonial-stars">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-author">
                      <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name">{item.name}</div>
                        <div className="testimonial-role">{item.role}</div>
                      </div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="pricing-section">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="badge-pill">
              <CreditCard size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Flexible Pricing</span>
            </div>
            <BlurText
              as="h2"
              text="Simple plans tailored to your growth"
              className="section-title"
              animateBy="words"
              delay={80}
              direction="top"
              stepDuration={0.28}
              style={{ justifyContent: 'center' }}
            />
            <p style={{ color: '#9ca3af', marginTop: '12px', fontSize: '1.02rem' }}>
              Start with our 14-day free trial. No credit card required. Cancel anytime.
            </p>

            <div className="pricing-toggle-wrapper">
              <div className="pricing-toggle">
                <span
                  className={`toggle-option ${!isAnnual ? 'active' : ''}`}
                  onClick={() => setIsAnnual(false)}
                >
                  Monthly Billing
                </span>
                <span
                  className={`toggle-option ${isAnnual ? 'active' : ''}`}
                  onClick={() => setIsAnnual(true)}
                >
                  Annual Billing
                  <span className="save-badge">SAVE 20%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <SpotlightCard
              className="pricing-card-spotlight"
              spotlightColor="rgba(123, 99, 191, 0.22)"
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div className="pricing-header-box">
                    <h3 className="pricing-plan-title">Starter</h3>
                    <p className="pricing-plan-desc">Perfect for startups and small finance teams getting started.</p>
                  </div>

                  <div className="pricing-amount-box">
                    <span className="pricing-amount-val">${isAnnual ? '29' : '39'}</span>
                    <span className="pricing-amount-period">/ month</span>
                  </div>
                  <div className="pricing-annual-subtext">
                    {isAnnual ? 'Billed annually ($348/year)' : 'Billed monthly'}
                  </div>

                  <ul className="pricing-feature-list">
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>Up to 3 Bank Connections</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>Real-time Cashflow Dashboard</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>Standard CSV & PDF Exporting</span>
                    </li>
                    <li className="pricing-feature-item disabled">
                      <span className="feature-icon-circle disabled-icon">
                        <X size={14} />
                      </span>
                      <span>Multi-entity FX conversion</span>
                    </li>
                  </ul>
                </div>

                <a href="#" className="pricing-btn-secondary">
                  <span>Choose Starter</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </SpotlightCard>

            {/* Professional Plan - Featured (Bigger & Elevated) */}
            <SpotlightCard
              className="pricing-card-spotlight featured"
              spotlightColor="rgba(168, 146, 238, 0.4)"
            >
              <div className="featured-top-beam" />

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div className="popular-badge-header">
                    <Sparkles size={14} />
                    <span>MOST POPULAR</span>
                  </div>

                  <div className="pricing-header-box">
                    <h3 className="pricing-plan-title featured-title">Professional</h3>
                    <p className="pricing-plan-desc">Ideal for scaling enterprises & high-volume finance teams.</p>
                  </div>

                  <div className="pricing-amount-box">
                    <span className="pricing-amount-val gradient-text featured-amount">${isAnnual ? '79' : '99'}</span>
                    <span className="pricing-amount-period">/ month</span>
                  </div>
                  <div className="pricing-annual-subtext featured-subtext">
                    {isAnnual ? 'Billed annually ($948/year) • Save $240' : 'Billed monthly'}
                  </div>

                  <ul className="pricing-feature-list">
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle featured-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <strong style={{ color: '#ffffff' }}>Unlimited Bank Connections</strong>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle featured-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <span style={{ color: '#f3f4f6' }}>Automated Reconciliation Engine</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle featured-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <span style={{ color: '#f3f4f6' }}>140+ Multi-Currency FX Support</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle featured-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <span style={{ color: '#f3f4f6' }}>Role-Based Access & Audit Logs</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle featured-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <span style={{ color: '#f3f4f6' }}>Priority 24/7 Dedicated Support</span>
                    </li>
                  </ul>
                </div>

                <a href="#" className="pricing-btn-primary">
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight size={17} />
                </a>
              </div>
            </SpotlightCard>

            {/* Enterprise Plan */}
            <SpotlightCard
              className="pricing-card-spotlight"
              spotlightColor="rgba(99, 102, 241, 0.28)"
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div className="pricing-header-box">
                    <h3 className="pricing-plan-title">Enterprise</h3>
                    <p className="pricing-plan-desc">Custom infrastructure, SLA guarantees & dedicated support.</p>
                  </div>

                  <div className="pricing-amount-box">
                    <span className="pricing-amount-val">Custom</span>
                  </div>
                  <div className="pricing-annual-subtext">
                    Tailored deployment & billing
                  </div>

                  <ul className="pricing-feature-list">
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>Dedicated Solutions Engineer</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>Custom Webhook & API Rate Limits</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>99.99% Uptime SLA Guarantee</span>
                    </li>
                    <li className="pricing-feature-item">
                      <span className="feature-icon-circle">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>On-Premises & Hybrid Deployment</span>
                    </li>
                  </ul>
                </div>

                <a href="#" className="pricing-btn-secondary">
                  <span>Contact Sales</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="faq-section">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="badge-pill">
              <ShieldCheck size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Got Questions?</span>
            </div>
            <BlurText
              as="h2"
              text="Frequently Asked Questions"
              className="section-title"
              animateBy="words"
              delay={90}
              direction="top"
              stepDuration={0.3}
              style={{ justifyContent: 'center' }}
            />
          </div>

          <div style={{ marginTop: '32px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: '#7b63bf'
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM HERO CTA BANNER */}
        <div className="cta-banner">
          <div className="cta-top-beam" />
          <div className="cta-radial-glow" />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
            <div className="badge-pill" style={{ marginBottom: '18px' }}>
              <Sparkles size={14} style={{ color: '#a892ee', marginRight: '6px' }} />
              <span>Ready to scale smarter?</span>
            </div>

            <BlurText
              as="h2"
              text="Transform your financial management today"
              animateBy="words"
              delay={90}
              direction="bottom"
              stepDuration={0.3}
              style={{ fontSize: '2.6rem', color: '#ffffff', fontWeight: '800', marginBottom: '16px', justifyContent: 'center' }}
            />
            <p style={{ color: '#9ca3af', fontSize: '1.05rem', marginBottom: '32px', lineHeight: '1.6' }}>
              Join over 150,000 finance leaders using Quanta to automate revenue tracking, eliminate audit friction, and scale faster.
            </p>

            {/* Email Subscribe / Early Access Form */}
            {subscribedSuccess ? (
              <div className="cta-subscribe-success">
                <CheckCircle2 size={20} color="#10b981" />
                <span>You're in! Check your inbox for your 14-day instant trial access link.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="cta-subscribe-form">
                <div className="cta-input-wrapper">
                  <Mail size={18} className="cta-mail-icon" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    className="cta-email-input"
                  />
                </div>
                <button type="submit" className="cta-submit-btn">
                  <span>Start Free Trial</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}

            <div className="cta-footer-badges">
              <span><Lock size={13} style={{ verticalAlign: '-2px', color: '#a892ee', marginRight: '4px' }} /> 14-Day Free Trial</span>
              <span className="bullet-dot">•</span>
              <span>No Credit Card Required</span>
              <span className="bullet-dot">•</span>
              <span>Instant Setup</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand-block">
              <a href="#" className="nav-brand footer-brand-link">
                <div className="nav-logo-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 19.5C5 15.5 5.7 8.5 10 4.5C12 8.5 11.3 15.5 7.5 19.5Z" fill="#ffffff" />
                    <path d="M13.5 19.5C11 15.5 11.7 8.5 16 4.5C18 8.5 17.3 15.5 13.5 19.5Z" fill="#ffffff" />
                  </svg>
                </div>
                <span>Quanta</span>
              </a>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', maxWidth: '280px', marginTop: '12px' }}>
                The next-generation financial intelligence platform designed for fast-scaling enterprises.
              </p>
            </div>

            <div className="footer-col">
              <h5>Product</h5>
              <ul>
                <li><a href="#workflow">Workflow</a></li>
                <li><a href="#features">Analytics</a></li>
                <li><a href="#features">Reconciliation</a></li>
                <li><a href="#pricing">Pricing Plans</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Solutions</h5>
              <ul>
                <li><a href="#">SaaS & Tech</a></li>
                <li><a href="#">E-Commerce</a></li>
                <li><a href="#">Enterprise Banking</a></li>
                <li><a href="#">Global FX</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Security & Compliance</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Quanta Inc. All rights reserved.</div>
            <div className="status-indicator">
              <ShieldCheck size={16} style={{ color: '#34d399', flexShrink: 0, transform: 'translateY(-0.5px)', filter: 'drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))' }} />
              <DecryptedText
                text="All systems operational (99.99% Uptime)"
                animateOn="view"
                sequential={true}
                speed={85}
                revealDirection="start"
                className="status-decrypted-revealed"
                encryptedClassName="status-decrypted-encrypted"
              />
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
