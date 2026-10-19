/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, type Variants } from 'motion/react';
import {
  Cloud,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Mail,
  Sparkles,
  ExternalLink,
  Lock,
  Layers,
  Server,
  FileText,
  AlertTriangle,
  Tag,
  Award,
  Database,
  Cpu,
  Wallet,
  TrendingUp,
  X,
  ZoomIn,
  Phone,
  Menu,
  GitBranch,
  Boxes,
  Users,
  ArrowDown,
  Globe,
  Share2,
  Send,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  Brain,
  Copy,
  Check,
} from 'lucide-react';
import portraitImg from './assets/images/emmanuel_portrait_1791562139488.png';
import simuLearnBadgeImg from './assets/images/aws_simulearn_ai_practitioner.png';
import { IamProjectDoc } from './components/IamProjectDoc.tsx';

const coreSkills = [
  {
    number: '01',
    title: 'AWS Cloud Computing',
    icon: Cloud,
    gradient: 'from-amber-500 to-orange-500',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/90',
    techs: ['EC2', 'S3', 'VPC', 'IAM'],
    description:
      'Designing and provisioning scalable cloud infrastructure, virtual networks (VPC), secure object storage (S3), compute clusters (EC2), and granular least-privilege IAM policies on AWS.',
  },
  {
    number: '02',
    title: 'Infrastructure as Code',
    icon: Layers,
    gradient: 'from-purple-500 to-indigo-600',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200/90',
    techs: ['Terraform'],
    description:
      'Writing declarative, reproducible infrastructure manifests, state management, modular architectures, and automated cloud resource provisioning via Terraform.',
  },
  {
    number: '03',
    title: 'CI/CD Automation',
    icon: GitBranch,
    gradient: 'from-sky-500 to-blue-600',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200/90',
    techs: ['GitHub Actions'],
    description:
      'Building automated workflows for linting, testing, Docker image packaging, and continuous deployment into staging and production cloud environments.',
  },
  {
    number: '04',
    title: 'Containerization & Orchestration',
    icon: Boxes,
    gradient: 'from-blue-600 to-cyan-500',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200/90',
    techs: ['Docker', 'Kubernetes'],
    description:
      'Containerizing multi-service applications with optimized Dockerfiles, managing container registries, and orchestrating resilient deployments with Kubernetes.',
  },
  {
    number: '05',
    title: 'Linux & Scripting',
    icon: Terminal,
    gradient: 'from-emerald-500 to-teal-600',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
    techs: ['Linux', 'Bash', 'Python'],
    description:
      'Linux server administration, system performance tuning, Bash scripting for automation tasks, and Python scripting for cloud APIs and DevOps workflows.',
  },
  {
    number: '06',
    title: 'Monitoring & Security',
    icon: ShieldCheck,
    gradient: 'from-rose-500 to-red-600',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200/90',
    techs: ['AWS CloudWatch', 'IAM'],
    description:
      'Observability and alerting with AWS CloudWatch metrics and alarms, access governance, audit logging, and principle-of-least-privilege IAM policy design.',
  },
  {
    number: '07',
    title: 'MLOps & Cloud AI Infrastructure',
    icon: Brain,
    gradient: 'from-violet-500 to-indigo-600',
    badgeClass: 'bg-violet-50 text-violet-800 border-violet-200/90',
    techs: ['Machine Learning', 'AWS SageMaker', 'MLOps Workflows', 'Generative AI', 'Python'],
    description:
      'Exploring cloud-based machine learning infrastructure, model deployment workflows, automation for ML systems, AWS SageMaker integration, and foundation model fine-tuning.',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-iam'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('project') === 'cloud-security-iam' ||
        window.location.hash === '#/project/cloud-security-iam'
      ) {
        return 'project-iam';
      }
    }
    return 'home';
  });

  const [selectedCertificate, setSelectedCertificate] = useState<'thrive' | 'alx' | null>(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'iam' | 's3' | 'serverless' | 'fullstack'>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isCornerNavOpen, setIsCornerNavOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
      return 'desktop';
    }
    return 'desktop';
  });

  const isMobile = screenType === 'mobile';
  const isTablet = screenType === 'tablet';

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setScreenType('mobile');
      else if (w < 1024) setScreenType('tablet');
      else setScreenType('desktop');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);

    const targetEmail = 'emmanuelaidoo2005@gmail.com';
    const emailSubject = contactForm.subject.trim() || `Portfolio Contact from ${contactForm.name.trim()}`;
    const emailBody = `Hello Emmanuel,\n\nName: ${contactForm.name.trim()}\nEmail: ${contactForm.email.trim()}\nSubject: ${contactForm.subject.trim()}\n\nMessage:\n${contactForm.message.trim()}\n\n---\nSent from Emmanuel Aidoo Cloud Portfolio`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Dispatch directly to user's mail client addressed to Emmanuel's email
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }, 500);
  };

  const copyEmailAndMessage = () => {
    const textToCopy = `To: emmanuelaidoo2005@gmail.com\nSubject: ${contactForm.subject || 'Portfolio Inquiry'}\nFrom: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 20);

      const diff = scrollY - lastScrollY;

      // When user scrolls down past 60px, collapse into the 3-line corner button
      // When scrolling up, KEEP the 3 lines (do not revert to the bar automatically on scroll up!)
      // Only if user returns completely to the very top of the page (scrollY <= 10px), return to the full bar
      if (Math.abs(diff) >= 5) {
        if (scrollY > 60 && diff > 0) {
          setIsHeaderHidden(true);
        } else if (scrollY <= 10) {
          setIsHeaderHidden(false);
          setIsCornerNavOpen(false);
        }
        lastScrollY = Math.max(0, scrollY);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('project') === 'cloud-security-iam' ||
        window.location.hash === '#/project/cloud-security-iam'
      ) {
        setCurrentView('project-iam');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const openIamProject = () => {
    window.location.href = '/cloud-security-with-aws-iam.html';
  };

  const openS3Project = () => {
    window.location.href = '/host-a-website-on-amazon-s3.html';
  };

  const openServerlessProject = () => {
    window.location.href = '/serverless-web-application-for-managing-employee-records.html';
  };

  const openExpenseFlowProject = () => {
    window.location.href = '/expenseflow.html';
  };

  const backToHome = () => {
    setCurrentView('home');
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'project-iam') {
    return <IamProjectDoc onBack={backToHome} />;
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      {/* Top Scrolling Progress Bar (Liquid Blue Gradient with Specular Sheen) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 z-[100] origin-left shadow-[0_0_12px_rgba(56,189,248,0.7)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Top Navbar: Centered Liquid Blue Glass Bar that smoothly morphs into 3-line button at the left corner on scroll */}
      <motion.header
        className={`navbar z-50 ${isScrolled ? 'navbar--scrolled' : ''} ${isHeaderHidden ? 'navbar--collapsed group' : ''}`}
        initial={false}
        animate={{
          left: isHeaderHidden ? (screenType === 'mobile' ? 12 : 20) : '50%',
          x: isHeaderHidden ? '0%' : '-50%',
          width: isHeaderHidden
            ? 52
            : screenType === 'mobile'
            ? 'calc(100vw - 20px)'
            : screenType === 'tablet'
            ? 'min(920px, calc(100vw - 32px))'
            : 'min(1280px, calc(100vw - 36px))',
          height: isHeaderHidden ? 52 : screenType === 'mobile' ? 54 : 62,
          borderRadius: isHeaderHidden ? 18 : 9999,
          paddingLeft: isHeaderHidden ? 0 : screenType === 'mobile' ? 12 : screenType === 'tablet' ? 16 : 28,
          paddingRight: isHeaderHidden ? 0 : screenType === 'mobile' ? 12 : screenType === 'tablet' ? 16 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
          mass: 0.85,
        }}
        onClick={() => {
          if (isHeaderHidden) {
            // When user hits the 3-line corner button, smoothly open the bar back!
            setIsHeaderHidden(false);
            setIsCornerNavOpen(false);
          }
        }}
        role={isHeaderHidden ? 'button' : 'banner'}
        aria-label={
          isHeaderHidden
            ? 'Open Navigation Bar'
            : 'Emmanuel Aidoo Portfolio Navigation'
        }
      >
        {/* Full Navbar Content (smooth cross-fade) */}
        <motion.div
          className="w-full h-full flex items-center justify-between"
          animate={{
            opacity: isHeaderHidden ? 0 : 1,
            scale: isHeaderHidden ? 0.85 : 1,
          }}
          transition={{
            duration: 0.22,
            ease: 'easeInOut',
          }}
          style={{
            pointerEvents: isHeaderHidden ? 'none' : 'auto',
          }}
        >
          {/* Logo */}
          <div className="flex items-center shrink-0 relative z-10">
            <a
              className="logo group flex items-center gap-2 sm:gap-2.5 md:gap-3 no-underline transition-transform hover:scale-[1.02]"
              href="/"
            >
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 text-white flex items-center justify-center shadow-xs border border-white/70 shrink-0 group-hover:shadow-md transition-all"
              >
                <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="font-extrabold tracking-tight text-slate-900 text-[13.5px] sm:text-[15px] md:text-[15.5px] lg:text-[16px] leading-tight whitespace-nowrap">
                  Emmanuel Aidoo
                </span>
                <span className="font-bold tracking-wider text-sky-600 uppercase text-[9px] sm:text-[9.5px] md:text-[10px] leading-none mt-0.5 whitespace-nowrap">
                  Cloud &amp; DevOps
                </span>
              </div>
            </a>
          </div>

          {/* Desktop & Tablet Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 md:gap-2 lg:gap-5 xl:gap-7 relative z-10">
            <a
              href="#about"
              className="nav-link text-xs md:text-[13px] lg:text-[14.5px] font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap px-1.5 py-1"
            >
              About
            </a>
            <a
              href="#certifications"
              className="nav-link text-xs md:text-[13px] lg:text-[14.5px] font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap px-1.5 py-1"
            >
              Certifications
            </a>
            <a
              href="#skills"
              className="nav-link text-xs md:text-[13px] lg:text-[14.5px] font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap px-1.5 py-1"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="nav-link text-xs md:text-[13px] lg:text-[14.5px] font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap px-1.5 py-1"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="nav-link text-xs md:text-[13px] lg:text-[14.5px] font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap px-1.5 py-1"
            >
              Contact
            </a>

            <div className="flex items-center gap-1.5 lg:gap-2 pl-2 lg:pl-3 border-l border-sky-300/40 shrink-0">
              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/emmanuel-aidoo-62031121a/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative inline-flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-full text-xs font-semibold text-slate-800 bg-white/80 hover:bg-white backdrop-blur-md border border-white/95 hover:border-sky-300 shadow-[0_2px_8px_rgba(2,132,199,0.1)] hover:shadow-[0_4px_16px_rgba(2,132,199,0.22)] transition-all duration-300 hover:-translate-y-0.5"
                title="Emmanuel Aidoo on LinkedIn"
              >
                <span className="w-4 h-4 rounded-full bg-[#0077b5] flex items-center justify-center text-white shrink-0 shadow-2xs group-hover/link:scale-110 transition-transform">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
                  </svg>
                </span>
                <span className="hidden xl:inline">LinkedIn</span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/destinyiop09"
                target="_blank"
                rel="noopener noreferrer"
                className="group/git relative inline-flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-full text-xs font-semibold text-slate-800 bg-white/80 hover:bg-slate-900 hover:text-white backdrop-blur-md border border-white/95 hover:border-slate-800 shadow-[0_2px_8px_rgba(15,23,42,0.08)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-0.5"
                title="Emmanuel Aidoo on GitHub"
              >
                <span className="w-4 h-4 rounded-full bg-slate-900 group-hover/git:bg-white group-hover/git:text-slate-900 flex items-center justify-center text-white shrink-0 shadow-2xs group-hover/git:scale-110 transition-transform">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                  </svg>
                </span>
                <span className="hidden xl:inline">GitHub</span>
              </a>
            </div>
          </nav>

          {/* Mobile Navbar Buttons */}
          <div className="flex md:hidden items-center gap-1.5 relative z-10">
            <a
              href="https://www.linkedin.com/in/emmanuel-aidoo-62031121a/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/85 text-[#0077b5] hover:bg-white border border-sky-200/80 shadow-2xs transition-all"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
              </svg>
            </a>
            <a
              href="https://github.com/destinyiop09"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/85 text-slate-900 hover:bg-white border border-slate-200/80 shadow-2xs transition-all"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 text-sky-700 border border-sky-300/60 shadow-2xs"
            >
              Hire
            </a>
          </div>
        </motion.div>

        {/* 3 Lines (Hamburger Icon) smoothly morphing into place inside the condensed header */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{
            opacity: isHeaderHidden ? 1 : 0,
            scale: isHeaderHidden ? 1 : 0.6,
          }}
          transition={{
            duration: 0.22,
            delay: isHeaderHidden ? 0.08 : 0,
            ease: 'easeOut',
          }}
        >
          <div className="relative w-5 h-3.5 flex flex-col justify-between items-center group-hover:scale-105 transition-transform duration-200">
            <span
              className="block h-[2px] w-5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out group-hover:bg-sky-600"
            />
            <span
              className="block h-[2px] w-3.5 bg-sky-500 rounded-full transition-all duration-300 ease-in-out group-hover:w-5 group-hover:bg-sky-600"
            />
            <span
              className="block h-[2px] w-5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out group-hover:bg-sky-600"
            />
          </div>
        </motion.div>
      </motion.header>

      {/* Floating Dropdown Menu when clicking the 3-line corner button */}
      <AnimatePresence>
        {isHeaderHidden && isCornerNavOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px]"
              onClick={() => setIsCornerNavOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[66px] left-4 z-50 w-60 rounded-2xl bg-white/95 backdrop-blur-2xl border border-sky-100/90 shadow-[0_20px_45px_-10px_rgba(14,116,244,0.3),0_8px_20px_rgba(15,23,42,0.08)] p-2.5 flex flex-col gap-1"
            >
              <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-sky-400 text-white flex items-center justify-center text-xs">
                  <Cloud className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Emmanuel Aidoo</div>
                  <div className="text-[9px] font-semibold text-sky-600 uppercase tracking-wider">Cloud &amp; DevOps</div>
                </div>
              </div>

              <a
                href="#about"
                onClick={() => setIsCornerNavOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 rounded-xl transition-colors"
              >
                <span>About</span>
              </a>
              <a
                href="#certifications"
                onClick={() => setIsCornerNavOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 rounded-xl transition-colors"
              >
                <span>Certifications</span>
              </a>
              <a
                href="#skills"
                onClick={() => setIsCornerNavOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 rounded-xl transition-colors"
              >
                <span>Core Skills</span>
              </a>
              <a
                href="#projects"
                onClick={() => setIsCornerNavOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 rounded-xl transition-colors"
              >
                <span>Projects</span>
              </a>
              <a
                href="#contact"
                onClick={() => setIsCornerNavOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 rounded-xl transition-colors"
              >
                <span>Contact</span>
              </a>

              <div className="pt-1.5 mt-1 border-t border-slate-100 flex items-center gap-1.5 px-1">
                <a
                  href="https://www.linkedin.com/in/emmanuel-aidoo-62031121a/?isSelfProfile=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#0077b5]/10 text-[#0077b5] text-[11px] font-semibold hover:bg-[#0077b5] hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/destinyiop09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold hover:bg-slate-900 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Top Hero Section Designed for Emmanuel Aidoo */}
        <section className="hero relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16 border-b border-slate-200/60 hero-grid-pattern">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7 text-left space-y-4 sm:space-y-5 md:space-y-6 pt-2">
              {/* Headline & Title */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="space-y-2"
              >
                <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 uppercase">
                  Cloud Engineer &amp; DevOps AWS
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight m-0">
                  Emmanuel Aidoo
                </h1>
              </motion.div>

              {/* Bio & Intro (User requested copy) */}
              <motion.p
                className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl m-0 font-normal"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                I’m an AWS Certified aspiring DevOps Engineer passionate about
                cloud architecture, automation, and building reliable, scalable
                infrastructure. I enjoy turning ideas into practical solutions
                through hands-on projects.
              </motion.p>

              {/* Cloud Skill Pills */}
              <motion.div
                className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                {[
                  'Amazon Web Services (AWS)',
                  'Machine Learning',
                  'AWS SageMaker',
                  'S3 & CloudFront',
                  'Terraform / IaC',
                  'CI/CD Pipelines',
                  'Docker',
                  'Linux & Bash',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-3"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <motion.a
                  className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-500 hover:via-sky-500 hover:to-blue-600 shadow-[0_10px_25px_-5px_rgba(2,132,199,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-sky-400/40 transition-all duration-300 hover:shadow-[0_14px_30px_-5px_rgba(2,132,199,0.55)] cursor-pointer"
                  href="#projects"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-white bg-white/85 hover:bg-slate-900 backdrop-blur-md border border-slate-300/80 hover:border-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.3)] transition-all duration-300 cursor-pointer"
                  href="https://github.com/destinyiop09"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                  </svg>
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-sky-950 bg-sky-50/80 hover:bg-white backdrop-blur-md border border-sky-200/90 hover:border-sky-300 shadow-[0_4px_16px_rgba(56,189,248,0.12)] hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.25)] transition-all duration-300 cursor-pointer"
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 text-sky-600 transition-transform duration-300 group-hover:scale-110" />
                  <span>Get In Touch</span>
                </motion.a>
              </motion.div>

              {/* Direct Reach Contact Bar */}
              <motion.div
                className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <a
                  href="mailto:emmanuelaidoo2005@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 hover:bg-white hover:text-blue-600 transition-colors shadow-2xs max-w-full truncate"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">emmanuelaidoo2005@gmail.com</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Emmanuel Aidoo Original Photo */}
            <motion.div
              className="md:col-span-5 relative flex justify-center mt-6 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Decorative Ambient Cloud Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/20 via-indigo-400/15 to-amber-400/20 rounded-3xl blur-2xl -z-10" />

              <div className="relative w-full max-w-sm group flex flex-col items-center">
                {/* Floating 3D Interactive Badge 1: AWS Certified */}
                <motion.div
                  className="absolute -top-2 left-0 sm:-left-4 md:-left-4 lg:-left-7 z-20 animate-float-slow max-w-[calc(100vw-2.5rem)]"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <a
                    href="https://www.credly.com/badges/9ed253cb-7fe8-488f-8651-5db7872c2f8c/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-200/90 shadow-[0_14px_30px_-8px_rgba(245,158,11,0.35),0_4px_12px_rgba(15,23,42,0.08)] text-left no-underline transition-shadow hover:shadow-[0_18px_36px_-6px_rgba(245,158,11,0.45)]"
                    title="Verify AWS Certification on Credly"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-white shadow-xs shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                        AWS Certified
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                      <div className="text-[8.5px] sm:text-[9px] font-mono text-amber-700 font-semibold">Cloud Practitioner</div>
                    </div>
                  </a>
                </motion.div>


                {/* Luminous Multi-Layer Circular Frame */}
                <div className="relative p-2 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 shadow-2xl shadow-blue-500/30 transition-all duration-500 group-hover:shadow-blue-500/50 group-hover:scale-[1.02]">
                  {/* Outer Orbiting Glass Rim */}
                  <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-sky-400/50 animate-[spin_24s_linear_infinite] pointer-events-none" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-300/40 via-blue-500/20 to-cyan-300/40 blur-xs pointer-events-none" />

                  {/* Inner Circular Card Container */}
                  <div className="relative p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-inner">
                    <div className="relative rounded-full overflow-hidden w-52 h-52 sm:w-64 sm:h-64 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-slate-100 shadow-lg">
                      <img
                        src={portraitImg}
                        alt="Emmanuel Aidoo - AWS Cloud & DevOps Engineer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Subtle Ambient Vignette Overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                      {/* In-Circle Floating Title at Bottom */}
                      <div className="absolute bottom-4 inset-x-0 text-center text-white pointer-events-none">
                        <p className="text-xs sm:text-sm font-bold m-0 drop-shadow-md flex items-center justify-center gap-1.5 text-white">
                          Emmanuel Aidoo
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        </p>
                        <p className="text-[11px] text-sky-200 m-0 drop-shadow-sm font-medium">
                          AWS Cloud &amp; DevOps
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating Liquid Scroll Down Indicator Animation */}
          <motion.div
            className="flex flex-col items-center justify-center pt-10 sm:pt-14 relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href="#about"
              className="group flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer no-underline"
              aria-label="Scroll to About Me section"
            >
              <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-slate-500 group-hover:text-blue-600 transition-colors">
                Scroll Down
              </span>
              <div className="w-5 h-9 rounded-full border-2 border-slate-300 group-hover:border-blue-500 p-1 flex justify-center transition-colors shadow-2xs">
                <motion.div
                  className="w-1.5 h-2 rounded-full bg-blue-500"
                  animate={{
                    y: [0, 12, 0],
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </a>
          </motion.div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white border-b border-slate-200/60 relative overflow-hidden">
          <div className="max-w-6xl w-full mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Background &amp; Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight m-0">
                About Me
              </h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
            </motion.div>

            {/* Stretched Bio Card with Exact User Content */}
            <motion.div
              className="w-full max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-full bg-slate-50/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-slate-200/90 shadow-sm space-y-6 sm:space-y-7 text-left">
                {/* Intro Paragraph 1 (First Half) */}
                <p className="text-slate-800 text-sm sm:text-lg lg:text-xl leading-relaxed m-0 font-normal">
                  I am an AWS Certified cloud enthusiast and aspiring DevOps Engineer passionate about cloud computing, infrastructure automation, CI/CD pipelines, and building reliable, scalable, and secure cloud environments.
                </p>

                {/* Intro Paragraph 2 (First Half) */}
                <p className="text-slate-700 text-sm sm:text-lg leading-relaxed m-0 font-normal">
                  My focus is on developing practical skills in AWS Cloud Services, Linux system administration, DevOps practices, and cloud infrastructure management through hands-on labs, technical projects, and continuous learning.
                </p>

                {/* Expandable Second Half with Smooth Height & Opacity Animation */}
                <AnimatePresence initial={false}>
                  {isAboutExpanded && (
                    <motion.div
                      key="about-extended"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="space-y-6 sm:space-y-7 overflow-hidden pt-1"
                    >
                      {/* Technical Skills & Areas of Focus Card */}
                      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-blue-100 shadow-xs space-y-3.5 sm:space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          <h3 className="text-sm sm:text-lg font-bold text-slate-900 m-0">
                            Technical Skills &amp; Areas of Focus:
                          </h3>
                        </div>

                        <div className="space-y-3 text-xs sm:text-base text-slate-700">
                          <div className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                            <p className="m-0 leading-relaxed">
                              <strong className="text-slate-900 font-semibold">Cloud Computing:</strong> Amazon Web Services (AWS), EC2, S3, IAM, Lambda, VPC, cloud infrastructure, and cloud architecture fundamentals.
                            </p>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                            <p className="m-0 leading-relaxed">
                              <strong className="text-slate-900 font-semibold">Linux &amp; System Administration:</strong> Linux command line, shell fundamentals, system configuration, and troubleshooting.
                            </p>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-600 mt-2 shrink-0" />
                            <p className="m-0 leading-relaxed">
                              <strong className="text-slate-900 font-semibold">DevOps &amp; Automation:</strong> CI/CD concepts, deployment automation, infrastructure reliability, version control, and workflow optimization.
                            </p>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                            <p className="m-0 leading-relaxed">
                              <strong className="text-slate-900 font-semibold">Cloud Infrastructure:</strong> Networking fundamentals, access management, security best practices, scalability, and high availability.
                            </p>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-600 mt-2 shrink-0" />
                            <p className="m-0 leading-relaxed">
                              <strong className="text-slate-900 font-semibold">MLOps and Cloud AI Infrastructure:</strong> Exploring cloud-based machine learning infrastructure, model deployment workflows, and automation for ML systems.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Practical Projects & Philosophy */}
                      <p className="text-slate-700 text-sm sm:text-lg leading-relaxed m-0 font-normal">
                        I enjoy transforming theoretical knowledge into practical solutions by building projects, experimenting with cloud technologies, troubleshooting infrastructure challenges, and continuously improving my technical capabilities.
                      </p>

                      {/* Team Contribution Goal */}
                      <p className="text-slate-700 text-sm sm:text-lg leading-relaxed m-0 font-normal">
                        My goal is to contribute to a forward-thinking team where I can grow as a DevOps or Cloud Engineer, support reliable infrastructure, automate repetitive tasks, and help deliver efficient, scalable technology solutions.
                      </p>

                      {/* Open Opportunities Callout Box */}
                      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/80 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                            Target Roles &amp; Collaboration:
                          </span>
                        </div>
                        <p className="text-xs sm:text-base text-slate-800 font-medium leading-relaxed m-0">
                          I am open to opportunities in <strong>Junior DevOps Engineering</strong>, <strong>Cloud Engineering</strong>, <strong>AWS Cloud Support</strong>, <strong>Cloud Infrastructure</strong>, and <strong>entry-level MLOps</strong>. Let's connect and explore opportunities to build, automate, and improve cloud infrastructure together!
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                          {[
                            'Junior DevOps Engineering',
                            'Cloud Engineering',
                            'AWS Cloud Support',
                            'Cloud Infrastructure',
                            'Entry-Level MLOps',
                          ].map((role) => (
                            <span
                              key={role}
                              className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-800 border border-blue-200 shadow-2xs"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Read More / Read Less Toggle Button */}
                <div className="pt-2 flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setIsAboutExpanded((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-blue-700 bg-white hover:bg-blue-50/80 border border-blue-200 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all duration-200 cursor-pointer group"
                    aria-expanded={isAboutExpanded}
                  >
                    <span>{isAboutExpanded ? 'Read Less' : 'Read More'}</span>
                    {isAboutExpanded ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 transition-transform group-hover:-translate-y-0.5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-600 transition-transform group-hover:translate-y-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section (Dark Navy Design System) */}
        <section id="certifications" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-slate-900 text-slate-100 border-b border-slate-800 relative overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-12 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center max-w-2xl mx-auto space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
                Professional Certifications
              </h2>
              <p className="text-slate-400 text-sm sm:text-base m-0 max-w-xl mx-auto">
                A testament to my commitment to continuous learning, cloud architecture excellence, and hands-on DevOps engineering.
              </p>
            </motion.div>

            {/* Single Credly Verified Certification Card matching screenshot */}
            <motion.div
              className="max-w-4xl w-full mx-auto rounded-2xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Side: White Background with Official AWS Cloud Practitioner Badge */}
              <a
                href="https://www.credly.com/badges/9ed253cb-7fe8-488f-8651-5db7872c2f8c/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white flex items-center justify-center p-6 sm:p-8 md:p-6 lg:p-10 md:w-72 lg:w-88 xl:w-96 shrink-0 border-b md:border-b-0 md:border-r border-slate-800 group relative hover:opacity-95 transition-opacity"
                title="Verify AWS Certified Cloud Practitioner on Credly"
              >
                <svg
                  viewBox="0 0 200 220"
                  className="w-44 sm:w-52 h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Slate/Gray Hexagon Border */}
                  <polygon
                    points="100,6 188,54 188,166 100,214 12,166 12,54"
                    fill="#232f3e"
                    stroke="#7c8a99"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                  
                  {/* Inner Hexagon Outline */}
                  <polygon
                    points="100,12 182,57 182,163 100,208 18,163 18,57"
                    fill="#232f3e"
                    stroke="#1b2430"
                    strokeWidth="2"
                  />

                  {/* AWS Logo + Orange Smile */}
                  <g transform="translate(62, 28)">
                    <text
                      x="22"
                      y="24"
                      fill="#ffffff"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="24"
                      fontWeight="900"
                      textAnchor="middle"
                      letterSpacing="-0.5"
                    >
                      aws
                    </text>
                    <path
                      d="M6,27 C16,33 32,33 42,28"
                      stroke="#ff9900"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M40,25 L45,28 L42,32 Z"
                      fill="#ff9900"
                    />
                    <rect x="47" y="10" width="16" height="16" rx="3.5" fill="#ff9900" />
                    <path
                      d="M51,18 L54.5,21.5 L60,14"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </g>

                  {/* "certified" text */}
                  <text
                    x="100"
                    y="70"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="13"
                    fontWeight="600"
                    textAnchor="middle"
                    letterSpacing="0.3"
                  >
                    certified
                  </text>

                  {/* Divider Line */}
                  <line
                    x1="40"
                    y1="82"
                    x2="160"
                    y2="82"
                    stroke="#7c8a99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Cloud Practitioner text */}
                  <text
                    x="100"
                    y="112"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="20"
                    fontWeight="800"
                    textAnchor="middle"
                    letterSpacing="0.2"
                  >
                    Cloud
                  </text>
                  <text
                    x="100"
                    y="136"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="20"
                    fontWeight="800"
                    textAnchor="middle"
                    letterSpacing="0.2"
                  >
                    Practitioner
                  </text>

                  {/* Thin line above Foundational */}
                  <line
                    x1="45"
                    y1="154"
                    x2="155"
                    y2="154"
                    stroke="#7c8a99"
                    strokeWidth="1"
                    opacity="0.8"
                  />

                  {/* FOUNDATIONAL banner */}
                  <text
                    x="100"
                    y="172"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="10"
                    fontWeight="800"
                    textAnchor="middle"
                    letterSpacing="2.6"
                  >
                    FOUNDATIONAL
                  </text>
                </svg>
              </a>

              {/* Right Side: Exact Text & Layout from User Screenshot */}
              <div className="bg-black p-5 sm:p-7 md:p-6 lg:p-10 flex-1 flex flex-col justify-center text-left space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
                  AWS Certified Cloud Practitioner was issued by ...
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-normal m-0">
                  Credly
                </p>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 m-0 pt-1">
                  AWS Certified Cloud Practitioner
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal m-0 pt-1">
                  Validates foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Skilled in core cloud infrastructure including ...
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="https://www.credly.com/badges/9ed253cb-7fe8-488f-8651-5db7872c2f8c/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    <span>Verify Credential on Credly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2: AWS SimuLearn - AI Practitioner - Training Badge (Amazon Web Services) */}
            <motion.div
              className="max-w-4xl w-full mx-auto rounded-2xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {/* Left Side: White Background with Official AWS SimuLearn AI Practitioner Badge */}
              <a
                href="https://www.credly.com/badges/06800444-cd7a-4c3b-9a63-2f4a9b271829/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white flex items-center justify-center p-5 sm:p-7 md:p-6 lg:p-8 md:w-72 lg:w-88 xl:w-96 shrink-0 border-b md:border-b-0 md:border-r border-slate-800 group relative hover:opacity-95 transition-opacity"
                title="Verify AWS SimuLearn - AI Practitioner on Credly"
              >
                <div className="relative w-full aspect-[4/3] bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={simuLearnBadgeImg}
                    alt="AWS SimuLearn - AI Practitioner - Training Badge"
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>
              </a>

              {/* Right Side: Exact Text & Layout requested by user */}
              <div className="bg-black p-5 sm:p-7 md:p-6 lg:p-10 flex-1 flex flex-col justify-center text-left space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
                  AWS SimuLearn - AI Practitioner was issued by ...
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm sm:text-base text-slate-400 font-normal m-0">
                    Amazon Web Services (AWS)
                  </p>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    AWS Official
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 m-0 pt-1">
                  AWS SimuLearn - AI Practitioner - Training Badge
                </h4>
                <p className="text-xs font-semibold text-amber-400 m-0">
                  Issued Oct 2026
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal m-0 pt-1">
                  Earners of this badge showcase proficiency in building generative AI solutions utilizing AWS AI services. Gained hands-on experience with prompt engineering, code generation, chatbot development, implementing content moderation systems, and fine-tuning models for enhanced performance.
                </p>

                {/* Skills: Machine Learning, AWS SageMaker */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Skills:</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Machine Learning
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    AWS SageMaker
                  </span>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="https://www.credly.com/badges/06800444-cd7a-4c3b-9a63-2f4a9b271829/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    <span>Verify Credential on Credly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Thrive Africa EduTech Certificate of Completion */}
            <motion.div
              className="max-w-4xl w-full mx-auto rounded-2xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Left Side: White Background with Thrive Certificate Preview */}
              <div
                onClick={() => setSelectedCertificate('thrive')}
                className="bg-white flex items-center justify-center p-5 sm:p-7 md:p-6 lg:p-8 md:w-72 lg:w-88 xl:w-96 shrink-0 border-b md:border-b-0 md:border-r border-slate-800 cursor-pointer group relative"
                title="Click to view full certificate"
              >
                {/* Certificate Preview Card */}
                <div className="relative w-full aspect-[4/3] bg-white rounded-lg p-3 sm:p-4 border border-rose-200 shadow-md flex flex-col justify-between text-center select-none overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Pink Corner Accents */}
                  <div className="absolute -top-7 -left-7 w-14 h-14 bg-rose-600 rotate-45 pointer-events-none" />
                  <div className="absolute -bottom-7 -right-7 w-14 h-14 bg-rose-600 rotate-45 pointer-events-none" />
                  {/* Dashed Inner Frame */}
                  <div className="absolute inset-2 border-2 border-dashed border-rose-300/80 pointer-events-none rounded" />

                  {/* Top: ID */}
                  <div className="relative z-10 flex justify-end">
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-800 bg-slate-50 px-1 py-0.5 rounded border border-slate-200">
                      ID: TA/CC/25/503
                    </span>
                  </div>

                  {/* Logo & Heading */}
                  <div className="relative z-10 space-y-0.5">
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight">thrive</span>
                      <span className="text-[8px] font-bold tracking-wider text-slate-800 uppercase">Thrive Africa EduTech</span>
                    </div>
                    <h4 className="text-[11px] sm:text-xs font-black text-rose-600 tracking-tight uppercase pt-0.5 m-0">
                      CERTIFICATE OF COMPLETION
                    </h4>
                    <p className="text-[7.5px] sm:text-[8px] text-amber-700 italic font-medium m-0">
                      This is to certify that
                    </p>
                  </div>

                  {/* Recipient */}
                  <div className="relative z-10">
                    <span className="inline-block text-xs sm:text-sm font-black text-slate-900 border-b-2 border-slate-900 pb-0.5 px-3">
                      Emmanuel Aidoo
                    </span>
                    <p className="text-[7.5px] sm:text-[8px] text-slate-600 max-w-[240px] mx-auto mt-0.5 leading-tight">
                      has successfully fulfilled the requirements and completed the{' '}
                      <strong className="text-slate-900">Cloud Computing Essentials ( AWS Certified ) Course</strong>
                    </p>
                  </div>

                  {/* Bottom: Signatures and Gold Seal */}
                  <div className="relative z-10 grid grid-cols-3 items-end pt-1">
                    <div className="text-left space-y-0.5">
                      <div className="text-[7px] font-serif italic text-slate-700 leading-none">Gad Ocran</div>
                      <div className="border-t border-dotted border-slate-400 pt-0.5">
                        <p className="text-[7.5px] font-bold text-rose-600 leading-none m-0">Gad Ocran</p>
                        <p className="text-[6px] text-slate-500 leading-tight m-0">Founder &amp; CEO</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-0.5 shadow-sm">
                        <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center border border-amber-300">
                          <Award className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-0.5">
                      <div className="text-[7px] font-serif italic text-slate-700 leading-none">Shadrack Darku</div>
                      <div className="border-t border-dotted border-slate-400 pt-0.5">
                        <p className="text-[7.5px] font-bold text-rose-600 leading-none m-0">Shadrack Darku</p>
                        <p className="text-[6px] text-slate-500 leading-tight m-0">AWS Mentor</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Right Side: Exact Text & Layout matching Card 1 */}
              <div className="bg-black p-5 sm:p-7 md:p-6 lg:p-10 flex-1 flex flex-col justify-center text-left space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
                  Cloud Computing Essentials was issued by ...
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-normal m-0">
                  Thrive Africa EduTech
                </p>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 m-0 pt-1">
                  Cloud Computing Essentials ( AWS Certified ) Course
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal m-0 pt-1">
                  Validates successful completion of the Cloud Computing Essentials (AWS Certified) program. Skilled in AWS cloud architecture, infrastructure deployment, security configurations, and foundational cloud principles.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setSelectedCertificate('thrive')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-sm cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Full Certificate</span>
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    ID: TA/CC/25/503
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: ALX AI Career Essentials Certificate of Achievement */}
            <motion.div
              className="max-w-4xl w-full mx-auto rounded-2xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Left Side: ALX Certificate Graphic Preview */}
              <div
                onClick={() => setSelectedCertificate('alx')}
                className="bg-[#02182b] flex items-center justify-center p-5 sm:p-7 md:p-6 lg:p-8 md:w-72 lg:w-88 xl:w-96 shrink-0 border-b md:border-b-0 md:border-r border-slate-800 cursor-pointer group relative overflow-hidden"
                title="Click to view full ALX certificate"
              >
                {/* ALX Certificate Card Replica */}
                <div className="relative w-full aspect-[16/9] bg-[#02182b] rounded-lg p-3 sm:p-4 border border-cyan-900/60 shadow-lg flex flex-col justify-between text-left select-none overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Geometric ALX Chevron Accents on Right */}
                  <div className="absolute -right-6 -top-6 w-32 h-32 border-8 border-cyan-400 rotate-45 pointer-events-none opacity-80" />
                  <div className="absolute -right-2 -bottom-2 w-28 h-28 border-8 border-emerald-400 rotate-45 pointer-events-none opacity-60" />

                  {/* Header: ALX Logo & AI Career Essentials */}
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="text-lg font-black tracking-tighter text-white">alx</span>
                    <div className="h-4 w-px bg-cyan-400/50" />
                    <span className="text-[9px] font-bold text-emerald-400 leading-tight">
                      AI Career<br />Essentials
                    </span>
                  </div>

                  {/* Title & Recipient */}
                  <div className="relative z-10 space-y-0.5 mt-1">
                    <p className="text-[7px] uppercase font-bold tracking-wider text-slate-300 m-0">
                      Certificate of Achievement
                    </p>
                    <p className="text-[6.5px] text-slate-400 m-0">
                      Proudly Presented to
                    </p>
                    <h5 className="text-xs sm:text-sm font-black text-[#00e59b] tracking-tight border-b-2 border-[#00e59b] pb-0.5 inline-block m-0">
                      Emmanuel Aidoo
                    </h5>
                    <p className="text-[6.5px] text-slate-300 leading-tight pt-0.5 m-0">
                      For successfully completing a 6-week programme in AI Career Essentials
                    </p>
                  </div>

                  {/* Signatures & Dates Footer */}
                  <div className="relative z-10 grid grid-cols-2 items-end pt-1">
                    <div className="text-left space-y-0.5">
                      <div className="text-[6.5px] font-serif italic text-slate-300">Fred Swaniker</div>
                      <div className="border-t border-slate-600/80 pt-0.5">
                        <p className="text-[6.5px] font-bold text-white uppercase m-0 leading-tight">Fred Swaniker</p>
                        <p className="text-[5.5px] text-slate-400 m-0 leading-tight">Founder &amp; CEO, AL Group</p>
                      </div>
                    </div>
                    <div className="text-left space-y-0.5 pl-2">
                      <div className="text-[6.5px] font-serif italic text-slate-300">Kavi Ramburn</div>
                      <div className="border-t border-slate-600/80 pt-0.5">
                        <p className="text-[6.5px] font-bold text-white uppercase m-0 leading-tight">Kavi Ramburn</p>
                        <p className="text-[5.5px] text-slate-400 m-0 leading-tight">VP of Learning, ALX</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                  <ZoomIn className="w-4 h-4 text-emerald-400" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Right Side: Details matching Cards 1 & 2 */}
              <div className="bg-black p-5 sm:p-7 md:p-6 lg:p-10 flex-1 flex flex-col justify-center text-left space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
                  AI Career Essentials was issued by ...
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-normal m-0">
                  ALX &bull; African Leadership Group
                </p>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 m-0 pt-1">
                  Certificate of Achievement - AI Career Essentials
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal m-0 pt-1">
                  Validates successful completion of a rigorous 6-week programme in AI Career Essentials. Developed skills in generative AI tools, prompt engineering, data analytics, career navigation, and professional leadership.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://savanna.alxafrica.com/certificates/PcZNpRL9sr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    <span>Verify on ALX Savanna</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedCertificate('alx')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certificate Modal Lightbox (Supports Thrive & ALX) */}
          {selectedCertificate && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedCertificate(null)}
            >
              <div
                className="relative max-w-3xl w-full bg-slate-950 rounded-2xl shadow-2xl overflow-hidden p-3.5 sm:p-6 md:p-8 border border-slate-800 max-h-[92vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer z-30 border border-slate-700"
                  aria-label="Close Certificate View"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content: Thrive Certificate */}
                {selectedCertificate === 'thrive' && (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[4/3] bg-white rounded-xl p-6 sm:p-8 border border-rose-300 shadow-inner flex flex-col justify-between text-center overflow-hidden">
                      <div className="absolute -top-10 -left-10 w-20 h-20 bg-rose-600 rotate-45 pointer-events-none" />
                      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-rose-600 rotate-45 pointer-events-none" />
                      <div className="absolute inset-3 border-2 border-dashed border-rose-300 pointer-events-none rounded-lg" />

                      <div className="relative z-10 flex justify-end">
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                          ID: TA/CC/25/503
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <div className="flex flex-col items-center leading-none">
                          <span className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight">thrive</span>
                          <span className="text-xs font-bold tracking-widest text-slate-800 uppercase mt-0.5">Thrive Africa EduTech</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-black text-rose-600 tracking-tight uppercase pt-2 m-0">
                          CERTIFICATE OF COMPLETION
                        </h3>
                        <p className="text-xs sm:text-sm text-amber-700 italic font-medium m-0">
                          This is to certify that
                        </p>
                      </div>

                      <div className="relative z-10 space-y-2 py-2">
                        <span className="inline-block text-xl sm:text-2xl font-black text-slate-900 border-b-2 border-slate-900 pb-1 px-6">
                          Emmanuel Aidoo
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                          has successfully fulfilled the requirements and completed the{' '}
                          <strong className="text-slate-900 block mt-0.5">Cloud Computing Essentials ( AWS Certified ) Course</strong>
                        </p>
                      </div>

                      <div className="relative z-10 grid grid-cols-3 items-end pt-4 pb-2">
                        <div className="text-left space-y-1">
                          <div className="text-sm font-serif italic text-slate-700">Gad Ocran</div>
                          <div className="border-t border-dotted border-slate-400 pt-1">
                            <p className="text-xs sm:text-sm font-bold text-rose-600 leading-none m-0">Gad Ocran</p>
                            <p className="text-[10px] sm:text-xs text-slate-500 leading-tight m-0">Founder and Chief Executive Officer</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-1 shadow-md">
                            <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center border-2 border-amber-300">
                              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="text-sm font-serif italic text-slate-700">Shadrack Darku</div>
                          <div className="border-t border-dotted border-slate-400 pt-1">
                            <p className="text-xs sm:text-sm font-bold text-rose-600 leading-none m-0">Shadrack Darku</p>
                            <p className="text-[10px] sm:text-xs text-slate-500 leading-tight m-0">Cloud Computing Essentials ( AWS Certified ) Mentor</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Thrive Africa EduTech &bull; ID: TA/CC/25/503</span>
                      <button
                        onClick={() => setSelectedCertificate(null)}
                        className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

                {/* Content: ALX Certificate */}
                {selectedCertificate === 'alx' && (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[16/9] bg-[#02182b] rounded-xl p-6 sm:p-10 border border-cyan-800/60 shadow-2xl flex flex-col justify-between text-left overflow-hidden">
                      {/* Diagonal Cyan & Green Accent Chevron X */}
                      <div className="absolute -right-14 -top-14 w-64 h-64 border-[16px] border-cyan-400 rotate-45 pointer-events-none opacity-80" />
                      <div className="absolute -right-4 -bottom-4 w-52 h-52 border-[16px] border-emerald-400 rotate-45 pointer-events-none opacity-60" />

                      {/* Header: Logo */}
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="text-3xl font-black tracking-tighter text-white">alx</span>
                        <div className="h-6 w-0.5 bg-cyan-400/60" />
                        <span className="text-xs font-bold text-[#00e59b] leading-tight">
                          AI Career<br />Essentials
                        </span>
                      </div>

                      {/* Title & Recipient */}
                      <div className="relative z-10 space-y-1.5 my-auto py-2">
                        <p className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-slate-300 m-0">
                          Certificate of Achievement
                        </p>
                        <p className="text-xs text-slate-400 m-0">
                          Proudly Presented to
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#00e59b] tracking-tight border-b-2 border-[#00e59b] pb-1 inline-block m-0">
                          Emmanuel Aidoo
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md pt-1 m-0">
                          For successfully completing a 6-week programme in AI Career Essentials
                        </p>
                      </div>

                      {/* Footer: Signatures, Dates, Verification */}
                      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end pt-2 border-t border-slate-800/80">
                        <div className="sm:col-span-4 space-y-1">
                          <div className="text-sm font-serif italic text-slate-300">Fred Swaniker</div>
                          <div className="border-t border-slate-700 pt-1">
                            <p className="text-xs font-bold text-white uppercase m-0">Fred Swaniker</p>
                            <p className="text-[10px] text-slate-400 m-0">Founder &amp; CEO, AL Group</p>
                          </div>
                        </div>

                        <div className="sm:col-span-4 space-y-1">
                          <div className="text-sm font-serif italic text-slate-300">Kavi Ramburn</div>
                          <div className="border-t border-slate-700 pt-1">
                            <p className="text-xs font-bold text-white uppercase m-0">Kavi Ramburn</p>
                            <p className="text-[10px] text-slate-400 m-0">VP of Learning, ALX</p>
                          </div>
                        </div>

                        <div className="sm:col-span-4 text-left sm:text-right text-[10px] text-slate-400 space-y-0.5">
                          <p className="m-0"><strong className="text-slate-200">Date of Issue:</strong> 21st October 2025</p>
                          <p className="m-0 text-emerald-400 font-medium">Program Completed</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <span className="truncate max-w-sm">
                        Authenticate at: <span className="text-emerald-400">savanna.alxafrica.com/certificates/PcZNpRL9sr</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://savanna.alxafrica.com/certificates/PcZNpRL9sr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Open Verification Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setSelectedCertificate(null)}
                          className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Core Skills Section - Blue Liquid Smooth 3D Glass */}
        <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-sky-50/50 to-blue-100/40 text-slate-900">
          {/* Liquid Floating 3D Glowing Gradient Blobs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/25 to-sky-500/20 blur-3xl pointer-events-none animate-pulse [animation-duration:8s]" />
          <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-sky-400/20 via-blue-300/25 to-indigo-400/15 blur-3xl pointer-events-none animate-pulse [animation-duration:10s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-64 rounded-full bg-sky-200/35 blur-3xl pointer-events-none" />

          {/* Liquid Mesh / Gloss Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          <div className="max-w-5xl w-full mx-auto relative z-10 space-y-10 sm:space-y-12">
            {/* Section Header */}
            <motion.div
              className="text-center max-w-xl mx-auto space-y-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-blue-200/80 shadow-[0_2px_12px_rgba(59,130,246,0.08)] text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                Expertise &amp; Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight m-0 drop-shadow-xs">
                Core Skills
              </h2>
              <p className="text-slate-600 text-sm sm:text-base m-0 leading-relaxed font-normal">
                Engineered proficiencies across cloud, infrastructure automation, and security.
              </p>
            </motion.div>

            {/* Liquid Smooth 3D Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {coreSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.title}
                    className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 sm:p-7 backdrop-blur-xl bg-white/75 border border-white/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.08),0_4px_12px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_24px_50px_-12px_rgba(37,99,235,0.28),0_12px_24px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] hover:-translate-y-2 hover:scale-[1.025] transition-all duration-300 ease-out overflow-hidden flex items-center justify-between gap-4 cursor-default ${
                      index === 6 ? 'md:col-span-2' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    {/* 3D Glass Top-Light Sheen / Specular Reflection */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />

                    {/* Left Liquid Colored Indicator Pillar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 rounded-l-2xl sm:rounded-l-3xl shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0 relative z-10 w-full">
                      {/* 3D Glass Icon Container */}
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/95 via-sky-50/90 to-blue-100/80 border border-white/90 shadow-[0_4px_16px_rgba(59,130,246,0.14),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(59,130,246,0.28)] transition-transform duration-300 shrink-0 mt-0.5 sm:mt-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Info & Tech Badges */}
                      <div className="min-w-0 space-y-1.5 sm:space-y-2 text-left flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100/90 border border-blue-200/70 text-blue-600 shadow-xs">
                            {skill.number}
                          </span>
                          <h3 className="text-sm sm:text-lg font-bold text-slate-800 tracking-tight m-0 truncate">
                            {skill.title}
                          </h3>
                        </div>

                        {/* Liquid 3D Frosted Tech Badges */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {skill.techs.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium font-mono bg-white/80 text-blue-700/90 border border-blue-200/60 shadow-[0_2px_6px_rgba(59,130,246,0.05),inset_0_1px_1px_rgba(255,255,255,0.85)] backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {index === 6 && (
                          <p className="text-xs text-slate-500 leading-relaxed pt-0.5 m-0 hidden sm:block">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-slate-50/80 border-b border-slate-200/80">
          <div className="max-w-6xl w-full mx-auto space-y-10 sm:space-y-12">
            {/* Section Heading */}
            <motion.div
              className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Radar Ping Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-700 text-[11px] sm:text-xs font-semibold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span>Interactive Architecture Lab &bull; Continuous Live Packet Flow</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight m-0">
                Hands-On Cloud &amp; DevOps Projects
              </h2>
              <p className="text-slate-600 text-sm sm:text-base m-0 max-w-xl mx-auto leading-relaxed font-normal">
                Real-world cloud architectures, security policies, and automation workflows engineered through practical implementations.
              </p>

              {/* Interactive Animated Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
                {[
                  { id: 'all', label: 'All Projects (4)' },
                  { id: 'iam', label: 'Cloud Security & IAM' },
                  { id: 's3', label: 'S3 & CloudFront' },
                  { id: 'serverless', label: 'Serverless & DynamoDB' },
                  { id: 'fullstack', label: 'ExpenseFlow CI/CD' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProjectFilter(tab.id as any)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      activeProjectFilter === tab.id
                        ? 'text-white bg-blue-600 shadow-md shadow-blue-500/25 scale-105'
                        : 'text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Project 1: Cloud Security with AWS IAM */}
            {(activeProjectFilter === 'all' || activeProjectFilter === 'iam') && (
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Simple, Clear Info */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        AWS IAM &bull; Cloud Security
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                        September 2026
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0">
                        Cloud Security with AWS IAM
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed m-0 font-normal">
                        I built an automated multi-tier access control boundary on AWS to strictly restrict intern permissions and prevent accidental modification of production workloads.
                      </p>
                    </div>

                    {/* What I Built - Simple Bullet List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        What I Built:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 m-0 p-0 list-none">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Resource Tagging:</strong> Segregated EC2 instances using <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800 font-bold">Env: development</code> vs <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800 font-bold">Env: production</code>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Custom IAM Policies:</strong> Permitted start/stop operations exclusively on development resources.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Anti-Tampering Guardrails:</strong> Explicit <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800 font-bold">Deny</code> on CreateTags &amp; DeleteTags preventing privilege escalation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Policy Simulator Testing:</strong> Validated allowed/denied authorization outcomes before deployment.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['AWS IAM', 'Amazon EC2', 'Policy Simulator', 'JSON Policies', 'CloudTrail'].map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={openIamProject}
                      className="button inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                    >
                      <span>View Documentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="/cloud-security-with-aws-iam.html"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
                      title="Open in new page"
                    >
                      <span>Full Page</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Right: Architecture Infogram Diagram (Matching Uploaded Design Style) */}
                <div className="lg:col-span-7 bg-slate-50/60 p-3 sm:p-5 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
                  {/* Infogram Whiteboard Container */}
                  <div className="bg-white rounded-2xl border border-slate-300/80 p-3.5 sm:p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[380px]">
                    {/* Top AWS Cloud Box Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#232f3e] text-white text-xs font-bold font-sans">
                        <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                        <span>AWS Cloud</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Swipe &rarr;
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">IAM Access Boundary</span>
                      </div>
                    </div>

                    {/* SVG Connector Overlay with Real Dashed Lines */}
                    <div className="w-full overflow-x-auto overflow-y-hidden py-1 sm:py-2">
                      <div className="min-w-[480px] sm:min-w-0 relative py-4 flex-1 flex flex-col justify-center">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <marker id="arrow-iam" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                            </marker>
                            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a" />
                            </marker>
                            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626" />
                            </marker>
                          </defs>
                          {/* User to Policy Engine */}
                          <line x1="12%" y1="50%" x2="42%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-iam)" />
                          {/* Policy to Dev EC2 (up) */}
                          <path d="M 52% 42% L 52% 26% L 78% 26%" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-green)" />
                          {/* Policy to Prod EC2 (down) */}
                          <path d="M 52% 58% L 52% 76% L 78% 76%" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-red)" />
                        </svg>

                        {/* Architecture Diagram Nodes Grid */}
                        <div className="relative z-10 grid grid-cols-12 items-center gap-2">
                          {/* Node 1: User */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-700 flex items-center justify-center text-slate-800 shadow-sm">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                              </svg>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">User / Intern</div>
                            <span className="text-[10px] text-slate-500 font-mono">Developer Role</span>
                          </div>

                          {/* Mid Step Text Label */}
                          <div className="col-span-2 text-center">
                            <span className="text-[10px] font-sans font-medium text-slate-600 bg-white/90 px-1 py-0.5 rounded border border-slate-200">
                              Calls API
                            </span>
                          </div>

                          {/* Node 2: AWS IAM Policy Engine */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-xl bg-[#232f3e] border-2 border-amber-500 flex flex-col items-center justify-center text-white shadow-md">
                              <Lock className="w-5 h-5 text-amber-400" />
                              <span className="text-[9px] font-bold tracking-tight text-amber-300">IAM</span>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">AWS IAM Policy</div>
                            <span className="text-[10px] text-slate-500 font-mono">Tag Evaluator</span>
                          </div>

                          {/* Flow Labels & Targets */}
                          <div className="col-span-4 flex flex-col justify-between h-48 py-1">
                            {/* Dev EC2 Node */}
                            <div className="flex items-center gap-2.5 bg-emerald-50/90 border border-emerald-300 rounded-xl p-2.5 shadow-2xs">
                              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                                EC2
                              </div>
                              <div className="min-w-0 text-left">
                                <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                                  Dev Instance
                                  <span className="text-[9px] text-emerald-600 font-mono">&#10003; Allow</span>
                                </div>
                                <div className="text-[10px] text-slate-600 font-mono">Env=development</div>
                              </div>
                            </div>

                            {/* Prod EC2 Node */}
                            <div className="flex items-center gap-2.5 bg-rose-50/90 border border-rose-300 rounded-xl p-2.5 shadow-2xs">
                              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                                EC2
                              </div>
                              <div className="min-w-0 text-left">
                                <div className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                                  Prod Instance
                                  <span className="text-[9px] text-rose-600 font-mono">&#10007; Deny</span>
                                </div>
                                <div className="text-[10px] text-slate-600 font-mono">Env=production</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Infogram Sign-off */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-mono text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Validated via AWS Policy Simulator
                      </span>
                      <span className="font-semibold text-slate-800">Architecture by Emmanuel</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {/* Project 2: Host a Website on Amazon S3 */}
            {(activeProjectFilter === 'all' || activeProjectFilter === 's3') && (
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Simple, Clear Info */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/80 flex items-center gap-1.5">
                        <Cloud className="w-3.5 h-3.5 text-blue-600" />
                        Amazon S3 &bull; Cloud Storage &amp; Hosting
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        Public Web &amp; Security
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0">
                        Host a Website on Amazon S3
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed m-0 font-normal">
                        I built a production-ready static website deployed inside an Amazon S3 bucket with global read access and custom delete protection policies.
                      </p>
                    </div>

                    {/* What I Built - Simple Bullet List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        What I Built:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 m-0 p-0 list-none">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Amazon S3 Bucket:</strong> Provisioned dedicated cloud storage bucket configured for web hosting.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Static Asset Deployment:</strong> Uploaded HTML, CSS stylesheets, JavaScript files, and assets.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Public Read Endpoint:</strong> Unblocked static web access for worldwide internet browsers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Accidental Deletion Defense:</strong> Embedded JSON bucket policy denying <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800 font-bold">s3:DeleteObject</code>.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Amazon S3', 'Bucket Policy', 'Static Hosting', 'DNS & Endpoint', 'JSON Policies'].map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={openS3Project}
                      className="button inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                    >
                      <span>View Documentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="/host-a-website-on-amazon-s3.html"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
                      title="Open in new page"
                    >
                      <span>Full Page</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Right: Architecture Infogram Diagram */}
                <div className="lg:col-span-7 bg-slate-50/60 p-3 sm:p-5 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="bg-white rounded-2xl border border-slate-300/80 p-3.5 sm:p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[380px]">
                    {/* Top AWS Cloud Box Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#232f3e] text-white text-xs font-bold font-sans">
                        <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                        <span>AWS Cloud</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Swipe &rarr;
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">Static Website &amp; Policy Guard</span>
                      </div>
                    </div>

                    {/* SVG Connector Overlay with Scroll on Mobile */}
                    <div className="w-full overflow-x-auto overflow-y-hidden py-1 sm:py-2">
                      <div className="min-w-[480px] sm:min-w-0 relative py-4 flex-1 flex flex-col justify-center">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <marker id="arrow-s3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                            </marker>
                            <marker id="arrow-green-s3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a" />
                            </marker>
                          </defs>
                          {/* User to S3 Bucket */}
                          <line x1="12%" y1="50%" x2="33%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-s3)" />
                          {/* S3 Bucket to JSON Policy */}
                          <path d="M 46% 38% L 46% 22% L 68% 22%" fill="none" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-s3)" />
                          {/* S3 Bucket to Static Web Output */}
                          <path d="M 46% 62% L 46% 78% L 68% 78%" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-green-s3)" />
                        </svg>

                        {/* Architecture Diagram Nodes */}
                        <div className="relative z-10 grid grid-cols-12 items-center gap-2">
                          {/* Node 1: Web User */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-700 flex items-center justify-center text-slate-800 shadow-sm">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                              </svg>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">User / Client</div>
                            <span className="text-[10px] text-slate-500 font-mono">Web Browser</span>
                          </div>

                          {/* Mid Flow Label */}
                          <div className="col-span-1 text-center">
                            <span className="text-[10px] font-sans font-medium text-slate-600 bg-white/90 px-1 py-0.5 rounded border border-slate-200">
                              HTTP GET
                            </span>
                          </div>

                          {/* Node 2: S3 Bucket */}
                          <div className="col-span-4 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-lime-500/10 to-emerald-500/20 border-2 border-[#5b8a1e] flex flex-col items-center justify-center text-[#5b8a1e] shadow-md relative">
                              <svg className="w-8 h-8 stroke-[#5b8a1e] fill-none" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M4 8l2 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-12" />
                                <ellipse cx="12" cy="8" rx="8" ry="3" fill="#84cc16" fillOpacity="0.3" />
                                <path d="M4 8c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                              </svg>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">S3 Bucket</div>
                            <span className="text-[10px] text-slate-500 font-mono">Static Web Hosting</span>
                          </div>

                          {/* Nodes: JSON Policy & Web Endpoint Output */}
                          <div className="col-span-4 flex flex-col justify-between h-48 py-1">
                            {/* JSON File Policy Node */}
                            <div className="flex items-center gap-2.5 bg-amber-50/90 border border-amber-300 rounded-xl p-2.5 shadow-2xs">
                              <div className="w-10 h-10 rounded-lg bg-black text-white flex flex-col items-center justify-center font-mono font-bold text-[10px] shrink-0 shadow-xs">
                                <span className="text-amber-400 text-xs">JSON</span>
                              </div>
                              <div className="min-w-0 text-left">
                                <div className="text-[11px] font-bold text-slate-900">
                                  Bucket Policy
                                </div>
                                <div className="text-[10px] text-rose-600 font-mono font-semibold">Deny DeleteObject</div>
                              </div>
                            </div>

                            {/* Static Assets Output */}
                            <div className="flex items-center gap-2.5 bg-blue-50/90 border border-blue-300 rounded-xl p-2.5 shadow-2xs">
                              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                <Globe className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 text-left">
                                <div className="text-[11px] font-bold text-blue-950">
                                  Live Website
                                </div>
                                <div className="text-[10px] text-emerald-600 font-mono font-semibold">HTTP 200 OK</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Infogram Sign-off */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-mono text-blue-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Zero Server Management &bull; 99.99% Availability
                      </span>
                      <span className="font-semibold text-slate-800">Architecture by Emmanuel</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {/* Project 3: Serverless Web Application for Managing Employee Records */}
            {(activeProjectFilter === 'all' || activeProjectFilter === 'serverless') && (
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Simple, Clear Info */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200/80 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-orange-600" />
                        AWS Lambda &bull; Serverless Stack
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        Full CRUD Architecture
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0">
                        Serverless Web Application for Employee Records
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed m-0 font-normal">
                        I built an event-driven serverless web application combining an S3 hosted frontend, Amazon API Gateway, AWS Lambda compute, and Amazon DynamoDB storage.
                      </p>
                    </div>

                    {/* What I Built - Simple Bullet List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        What I Built:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 m-0 p-0 list-none">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Frontend on S3:</strong> Responsive single-page web app for managing and viewing records.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Amazon API Gateway:</strong> Managed REST endpoints routing requests securely with CORS validation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>AWS Lambda Functions:</strong> Event-driven Python execution triggered on-demand (zero idle costs).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Amazon DynamoDB &amp; JSON:</strong> High-performance storage persisting records with single-digit ms response.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['AWS Lambda', 'Amazon DynamoDB', 'API Gateway', 'Amazon S3', 'Python', 'AWS IAM'].map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={openServerlessProject}
                      className="button inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                    >
                      <span>View Documentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="/serverless-web-application-for-managing-employee-records.html"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
                      title="Open in new page"
                    >
                      <span>Full Page</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Right: Architecture Infogram Diagram */}
                <div className="lg:col-span-7 bg-slate-50/60 p-3 sm:p-5 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="bg-white rounded-2xl border border-slate-300/80 p-3.5 sm:p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[410px]">
                    {/* Top AWS Cloud Box Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#232f3e] text-white text-xs font-bold font-sans">
                        <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                        <span>AWS Cloud</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-[10px] text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          Swipe &rarr;
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">Serverless REST Architecture</span>
                      </div>
                    </div>

                    {/* SVG Connector Overlay with Scroll on Mobile */}
                    <div className="w-full overflow-x-auto overflow-y-hidden py-1 sm:py-2">
                      <div className="min-w-[500px] sm:min-w-0 relative py-4 flex-1 flex flex-col justify-center">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <marker id="arrow-infogram" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                            </marker>
                          </defs>
                          {/* User to S3 Bucket */}
                          <line x1="8%" y1="50%" x2="21%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-infogram)" />
                          {/* S3 to API Gateway */}
                          <line x1="33%" y1="50%" x2="47%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-infogram)" />
                          {/* API Gateway Up to Lambda 1 */}
                          <line x1="53%" y1="40%" x2="53%" y2="22%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-infogram)" />
                          {/* Lambda 1 to Database / Topics */}
                          <line x1="60%" y1="18%" x2="84%" y2="18%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-infogram)" />
                          {/* API Gateway Down to Lambda 2 */}
                          <path d="M 58% 50% L 85% 50% L 85% 66%" fill="none" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-infogram)" />
                          {/* Lambda 2 Left to JSON / DynamoDB storage */}
                          <line x1="78%" y1="78%" x2="58%" y2="78%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash-reverse" markerEnd="url(#arrow-infogram)" />
                          {/* JSON / DynamoDB back to S3 */}
                          <path d="M 44% 78% L 27% 78% L 27% 62%" fill="none" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash-reverse" markerEnd="url(#arrow-infogram)" />
                        </svg>

                        {/* Nodes Layout */}
                        <div className="relative z-10 grid grid-cols-12 gap-2 h-72">
                          {/* Left Side: User Icon */}
                          <div className="col-span-2 flex flex-col items-center justify-center text-center">
                            <div className="w-13 h-13 rounded-full bg-slate-50 border-2 border-slate-700 flex items-center justify-center text-slate-800 shadow-sm">
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                              </svg>
                            </div>
                            <div className="mt-1 text-xs font-bold text-slate-900 font-sans">User</div>
                          </div>

                          {/* S3 Bucket for Hosting */}
                          <div className="col-span-3 flex flex-col items-center justify-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-lime-500/10 to-emerald-500/20 border-2 border-[#5b8a1e] flex flex-col items-center justify-center text-[#5b8a1e] shadow-md relative">
                              <svg className="w-7 h-7 stroke-[#5b8a1e] fill-none" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M4 8l2 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-12" />
                                <ellipse cx="12" cy="8" rx="8" ry="3" fill="#84cc16" fillOpacity="0.3" />
                                <path d="M4 8c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                              </svg>
                            </div>
                            <div className="mt-1 text-xs font-bold text-slate-900 font-sans">S3 Bucket</div>
                            <span className="text-[10px] text-slate-500 font-mono">for hosting</span>
                          </div>

                          {/* Center Column: Top Lambda, Middle API Gateway, Bottom JSON/Store */}
                          <div className="col-span-3 flex flex-col justify-between items-center text-center py-0.5">
                            {/* Top: Lambda Function */}
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] text-slate-600 font-mono mb-0.5">Handler Lambda</span>
                              <div className="w-12 h-12 rounded-full bg-[#f97316] border-2 border-orange-600 flex items-center justify-center text-white shadow-md font-bold text-xl leading-none">
                                &lambda;
                              </div>
                            </div>

                            {/* Middle: Amazon API Gateway */}
                            <div className="flex flex-col items-center my-1">
                              <div className="w-13 h-13 rounded-lg bg-[#232f3e] border border-slate-700 flex flex-col items-center justify-center text-white shadow-md">
                                <span className="font-mono text-cyan-400 font-bold text-xs">&lt;/&gt;</span>
                              </div>
                              <div className="mt-1 text-[11px] font-bold text-slate-900 font-sans leading-tight">Amazon API Gateway</div>
                            </div>

                            {/* Bottom: JSON File Document */}
                            <div className="flex flex-col items-center">
                              <div className="w-11 h-11 rounded-lg bg-black border border-slate-800 flex flex-col items-center justify-center text-white shadow-md">
                                <span className="font-mono text-amber-400 font-bold text-[10px]">JSON</span>
                              </div>
                              <span className="text-[10px] text-slate-600 font-mono mt-0.5">Records in JSON</span>
                            </div>
                          </div>

                          {/* Right Column: Top Topics/Store, Bottom Creation Lambda */}
                          <div className="col-span-4 flex flex-col justify-between items-center text-center py-0.5">
                            {/* Top Right: DynamoDB / Topics Storage */}
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-12 rounded-xl bg-amber-500/20 border-2 border-amber-600 flex items-center justify-center text-amber-700 shadow-md">
                                <Database className="w-6 h-6 text-amber-600" />
                              </div>
                              <div className="mt-1 text-[11px] font-bold text-slate-900 font-sans">DynamoDB Table</div>
                              <span className="text-[10px] text-slate-500 font-mono">Records Store</span>
                            </div>

                            {/* Flow Label */}
                            <div className="my-1">
                              <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                Create Events
                              </span>
                            </div>

                            {/* Bottom Right: Event Creation Lambda */}
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-[#f97316] border-2 border-orange-600 flex items-center justify-center text-white shadow-md font-bold text-xl leading-none">
                                &lambda;
                              </div>
                              <div className="mt-1 text-[11px] font-bold text-slate-900 font-sans leading-tight">CRUD Lambda</div>
                              <span className="text-[10px] text-slate-500 font-mono">Processes Request</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Infogram Sign-off */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-mono text-orange-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                        Serverless API &bull; Low Latency &bull; Zero Idle Costs
                      </span>
                      <span className="font-semibold text-slate-800">Architecture by Emmanuel</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {/* Project 4: ExpenseFlow */}
            {(activeProjectFilter === 'all' || activeProjectFilter === 'fullstack') && (
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Simple, Clear Info */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Full-Stack &bull; Personal Finance
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                        JWT Auth &amp; PostgreSQL
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0">
                        ExpenseFlow
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed m-0 font-normal">
                        I built a full-stack personal finance web application with JWT authentication, real-time analytics, and automated deployments on Vercel and Render.
                      </p>
                    </div>

                    {/* What I Built - Simple Bullet List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        What I Built:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 m-0 p-0 list-none">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Interactive Dashboard:</strong> Category breakdown charts, monthly cashflow analytics, and transaction logs.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>FastAPI Backend:</strong> High-performance async Python REST API managing transactions and users.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>PostgreSQL Database:</strong> Relational schema with foreign keys, indexes, and parameterized queries.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Secure Auth &amp; CI/CD:</strong> Bcrypt password hashing, JWT bearer tokens, deployed to Vercel (frontend) &amp; Render (API).</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['FastAPI', 'PostgreSQL', 'JWT Auth', 'Python', 'Vercel', 'Render'].map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={openExpenseFlowProject}
                      className="button inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                    >
                      <span>View Documentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="/expenseflow.html"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
                      title="Open in new page"
                    >
                      <span>Full Page</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Right: Architecture Infogram Diagram */}
                <div className="lg:col-span-7 bg-slate-50/60 p-3 sm:p-5 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="bg-white rounded-2xl border border-slate-300/80 p-3.5 sm:p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[380px]">
                    {/* Top Cloud Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#232f3e] text-white text-xs font-bold font-sans">
                        <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                        <span>Cloud Deployments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Swipe &rarr;
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">Full-Stack Production Pipeline</span>
                      </div>
                    </div>

                    {/* SVG Connector Overlay with Scroll on Mobile */}
                    <div className="w-full overflow-x-auto overflow-y-hidden py-1 sm:py-2">
                      <div className="min-w-[480px] sm:min-w-0 relative py-4 flex-1 flex flex-col justify-center">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <marker id="arrow-ef" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                            </marker>
                          </defs>
                          {/* User to Vercel */}
                          <line x1="12%" y1="50%" x2="33%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-ef)" />
                          {/* Vercel to FastAPI */}
                          <line x1="48%" y1="50%" x2="65%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-ef)" />
                          {/* FastAPI to PostgreSQL */}
                          <line x1="80%" y1="50%" x2="88%" y2="50%" stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4" className="animate-flow-dash" markerEnd="url(#arrow-ef)" />
                        </svg>

                        {/* Architecture Diagram Nodes */}
                        <div className="relative z-10 grid grid-cols-12 items-center gap-2">
                          {/* Node 1: User */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-700 flex items-center justify-center text-slate-800 shadow-sm">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                              </svg>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">User</div>
                            <span className="text-[10px] text-slate-500 font-mono">Web Browser</span>
                          </div>

                          {/* Node 2: Vercel Frontend CDN */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-black border-2 border-slate-800 flex flex-col items-center justify-center text-white shadow-md">
                              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                                <path d="M24 22.525H0l12-21.05 12 21.05z" />
                              </svg>
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">Vercel CDN</div>
                            <span className="text-[10px] text-slate-500 font-mono">Frontend Host</span>
                          </div>

                          {/* Node 3: FastAPI Backend */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-700 border-2 border-emerald-600 flex flex-col items-center justify-center text-white shadow-md">
                              <Cpu className="w-6 h-6 text-white" />
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">FastAPI (Render)</div>
                            <span className="text-[10px] text-slate-500 font-mono">REST + JWT Auth</span>
                          </div>

                          {/* Node 4: PostgreSQL DB */}
                          <div className="col-span-3 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-[#336791] border-2 border-blue-600 flex flex-col items-center justify-center text-white shadow-md">
                              <Database className="w-6 h-6 text-white" />
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-slate-900 font-sans">PostgreSQL</div>
                            <span className="text-[10px] text-slate-500 font-mono">Relational DB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Infogram Sign-off */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-mono text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Automated CI/CD via GitHub Actions
                      </span>
                      <span className="font-semibold text-slate-800">Architecture by Emmanuel</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </section>

        {/* Contact Me Section with Interactive Form */}
        <motion.section
          id="contact"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white border-b border-slate-200/80"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Let's Connect
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight m-0">
                Contact Me
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto m-0 leading-relaxed font-normal">
                Have an AWS cloud initiative, DevOps role, or technical collaboration? Send a message directly and I will respond promptly.
              </p>
            </div>

            {/* Main Form & Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Contact Info & Direct Links (5 cols on md/lg) */}
              <div className="md:col-span-5 space-y-4 text-left">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 m-0">
                      Reach Out Directly
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 m-0 mt-1 leading-relaxed">
                      Available for Cloud Engineering, AWS Infrastructure, and DevOps opportunities.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="mailto:emmanuelaidoo2005@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</div>
                        <div className="text-xs font-bold text-slate-900 truncate font-mono">emmanuelaidoo2005@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="tel:05369940016"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-xs group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</div>
                        <div className="text-xs font-bold text-slate-900 font-mono">05369940016</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form (7 cols on md/lg) */}
              <div className="md:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-7 sm:p-8 text-left relative overflow-hidden">
                {contactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 px-4 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Addressed to emmanuelaidoo2005@gmail.com</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 m-0">Thank You, {contactForm.name || 'Friend'}!</h3>
                      <p className="text-sm text-slate-600 max-w-lg mx-auto m-0 leading-relaxed">
                        Your default email client has been opened with your message pre-addressed to <strong className="text-slate-900 font-mono">emmanuelaidoo2005@gmail.com</strong>. Click below to send via Gmail or re-open your mail app.
                      </p>
                    </div>

                    {/* Pre-addressed quick send buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=emmanuelaidoo2005@gmail.com&su=${encodeURIComponent(contactForm.subject || `Portfolio Contact from ${contactForm.name}`)}&body=${encodeURIComponent(`Hi Emmanuel,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nSubject: ${contactForm.subject}\n\nMessage:\n${contactForm.message}\n\n---\nSent from Emmanuel Aidoo Portfolio`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Send via Gmail Web</span>
                      </a>

                      <a
                        href={`mailto:emmanuelaidoo2005@gmail.com?subject=${encodeURIComponent(contactForm.subject || `Portfolio Contact from ${contactForm.name}`)}&body=${encodeURIComponent(`Hi Emmanuel,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nSubject: ${contactForm.subject}\n\nMessage:\n${contactForm.message}`)}`}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Mail App</span>
                      </a>

                      <button
                        type="button"
                        onClick={copyEmailAndMessage}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{copiedEmail ? 'Copied Details!' : 'Copy Message'}</span>
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactForm({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-slate-900">Send a Message</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">* All fields required</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 bg-white"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 bg-white"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="e.g. Cloud Architecture Discussion / DevOps Role"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell me about your project, timeline, or team..."
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 bg-white resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {contactSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Routing Message to Emmanuel...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message to Emmanuel</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Floating Smooth Scroll-To-Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-sky-200/90 shadow-[0_8px_25px_-5px_rgba(56,189,248,0.35),0_4px_10px_rgba(0,0,0,0.06)] text-blue-600 hover:text-blue-700 hover:bg-white flex items-center justify-center cursor-pointer transition-colors group"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}


