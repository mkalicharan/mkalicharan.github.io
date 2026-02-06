'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [showGetStartedForm, setShowGetStartedForm] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all animated elements
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => {
      ;(el as HTMLElement).style.opacity = '0'
      observerRef.current?.observe(el)
    })

    // Navbar background on scroll
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) {
        if (window.scrollY > 50) {
          ;(nav as HTMLElement).style.background = 'rgba(255, 255, 255, 0.98)'
          ;(nav as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        } else {
          ;(nav as HTMLElement).style.background = 'rgba(255, 255, 255, 0.95)'
          ;(nav as HTMLElement).style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleGetStartedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setFormStatus('success')
      setFormState({ name: '', email: '', phone: '', interest: '', message: '' })
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f8fafc;
          color: #0f172a;
          line-height: 1.6;
          overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          line-height: 1.2;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Navigation */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 16px 0;
          transition: all 0.3s ease;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #0f172a;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          color: #3b82f6;
        }

        .nav-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%) !important;
          color: white !important;
          padding: 10px 24px !important;
          border-radius: 12px;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
          padding: 120px 0 80px;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/hero-bg.png') center/cover no-repeat;
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hero-text h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: white;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-text .subtitle {
          font-size: 1.25rem;
          color: #64748b;
          margin-bottom: 32px;
          line-height: 1.8;
        }

        .hero-stats {
          display: flex;
          gap: 48px;
          margin-bottom: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #60a5fa;
          display: block;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #60a5fa;
        }

        .hero-image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image-wrapper {
          position: relative;
          width: 400px;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 4px solid rgba(255, 255, 255, 0.1);
        }

        .hero-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-image::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          opacity: 0.3;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }

        /* Section Styles */
        section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: #0f172a;
          margin-bottom: 16px;
        }

        .section-header p {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* About Section */
        .about {
          background: white;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .about-text h3 {
          font-size: 1.875rem;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .about-text p {
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }

        .skill-badge {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          padding: 12px 20px;
          border-radius: 12px;
          text-align: center;
          font-weight: 600;
          color: #0f172a;
          transition: all 0.3s ease;
        }

        .skill-badge:hover {
          transform: translateY(-4px);
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .about-image {
          position: relative;
        }

        .about-image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .about-image-wrapper::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 3px solid #3b82f6;
          border-radius: 24px;
          z-index: -1;
        }

        .about-image-wrapper img {
          width: 100%;
          display: block;
        }

        /* Book Section */
        .book {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .book-card {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }

        .book-cover {
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          aspect-ratio: 3/4;
          overflow: hidden;
          position: relative;
        }

        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .book-info h3 {
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .book-info .tag {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .book-info p {
          color: #64748b;
          margin-bottom: 24px;
          line-height: 1.8;
        }

        .book-features {
          list-style: none;
          margin-bottom: 32px;
        }

        .book-features li {
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .book-features li::before {
          content: '✓';
          color: #3b82f6;
          font-weight: 700;
          font-size: 1.25rem;
        }

        /* Podcast Section */
        .podcast {
          background: white;
        }

        .podcast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .podcast-card {
          background: #f8fafc;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .podcast-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .podcast-image {
          height: 200px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .podcast-image::before {
          content: '';
          position: absolute;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .podcast-content {
          padding: 32px;
        }

        .podcast-content h3 {
          font-size: 1.5rem;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .podcast-content p {
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .podcast-link {
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .podcast-link:hover {
          color: #2563eb;
        }

        /* Achievements Section */
        .achievements {
          background: #0f172a;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .achievements::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/pattern-bg.png') center/cover;
          opacity: 0.1;
        }

        .achievements-content {
          position: relative;
          z-index: 1;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .achievement-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .achievement-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.1);
          border-color: #60a5fa;
        }

        .achievement-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 2rem;
        }

        .achievement-number {
          font-size: 3rem;
          font-weight: 700;
          color: #60a5fa;
          margin-bottom: 8px;
        }

        .achievement-card h4 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }

        .achievement-card p {
          color: #64748b;
          line-height: 1.7;
        }

        /* Courses Section */
        .courses {
          background: white;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .course-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 40px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          transform: scaleX(0);
          transition: all 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #60a5fa;
        }

        .course-card:hover::before {
          transform: scaleX(1);
        }

        .course-card.featured {
          border-color: #3b82f6;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .course-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .course-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          font-size: 1.75rem;
        }

        .course-card h3 {
          font-size: 1.5rem;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .course-card p {
          color: #64748b;
          margin-bottom: 24px;
          line-height: 1.7;
        }

        .course-features {
          list-style: none;
          margin-bottom: 32px;
        }

        .course-features li {
          padding: 8px 0;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .course-features li::before {
          content: '•';
          color: #3b82f6;
          font-size: 1.5rem;
          line-height: 1;
        }

        .course-price {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .course-price span {
          font-size: 1rem;
          font-weight: 400;
          color: #64748b;
        }

        /* CTA Section */
        .cta {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/pattern-bg.png') center/cover;
          opacity: 0.2;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 20px;
        }

        .cta p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .cta .btn-white {
          background: white;
          color: #2563eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .cta .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Get Started Form Dialog */
        .get-started-dialog {
          background: white !important;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .get-started-dialog label {
          color: #0f172a;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .get-started-dialog input,
        .get-started-dialog select,
        .get-started-dialog textarea {
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.95rem;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .get-started-dialog input:focus,
        .get-started-dialog select:focus,
        .get-started-dialog textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          background: white;
        }
        .get-started-dialog select {
          cursor: pointer;
          appearance: auto;
          width: 100%;
        }
        .get-started-dialog textarea {
          min-height: 80px;
          resize: vertical;
        }
        .get-started-dialog [data-slot="dialog-close"] {
          color: #64748b;
          top: 1rem;
          right: 1rem;
        }
        .get-started-dialog [data-slot="dialog-close"]:hover {
          color: #0f172a;
        }
        .get-started-dialog .form-submit-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          width: 100%;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .get-started-dialog .form-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4);
        }
        .get-started-dialog .form-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Footer */
        footer {
          background: #0f172a;
          color: #64748b;
          padding: 32px 0;
          text-align: center;
          margin-top: auto;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .footer-social {
          display: flex;
          gap: 24px;
        }

        .footer-social a {
          color: #64748b;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          color: #60a5fa;
        }

        .footer-links {
          display: flex;
          gap: 32px;
        }

        .footer-links a {
          color: #64748b;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          color: #60a5fa;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content,
          .about-content,
          .book-card {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .hero-image-wrapper {
            width: 320px;
            height: 320px;
          }

          .nav-links {
            display: none;
          }

          .hero-stats {
            flex-wrap: wrap;
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 64px 0;
          }

          .hero {
            padding: 100px 0 60px;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-buttons .btn {
            width: 100%;
            justify-content: center;
          }

          .book-card {
            padding: 32px;
          }

          .courses-grid,
          .achievements-grid,
          .podcast-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-links {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav>
        <div className="container nav-content">
          <div className="logo">Kali</div>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
            <li><a href="#book" onClick={(e) => scrollToSection(e, 'book')}>Book</a></li>
            <li><a href="#podcast" onClick={(e) => scrollToSection(e, 'podcast')}>Podcast</a></li>
            <li><a href="#courses" onClick={(e) => scrollToSection(e, 'courses')}>Courses</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setShowGetStartedForm(true); }} className="nav-cta">Get Started</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="animate-on-scroll">Master Vibe Coding with an Industry Veteran</h1>
            <p className="subtitle animate-on-scroll">
            Launch your innovative business ideas faster and more cost-effectively with personalized, 1:1 guidance from a 23+ year AI/ML expert.
            Learn an end-to-end "vibe coding" approach to quickly build fully functional Minimum Viable Products (MVPs), turning your concepts into working prototypes in just a couple of days.            
            </p>
            <div className="hero-stats animate-on-scroll">
              <div className="stat-item">
                <span className="stat-number">23+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">9K+</span>
                <span className="stat-label">LinkedIn Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$50K</span>
                <span className="stat-label">Innovation Award</span>
              </div>
            </div>
            <div className="hero-buttons animate-on-scroll">
              <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="btn btn-primary">Start Learning</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="hero-image-wrapper">
              <img src="/upload/profile-photo.jpeg" alt="Kalicharan Mahasivabhattu" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container about-content">
          <div className="about-text">
            <h3 className="animate-on-scroll">Your Guide to AI-Powered Development</h3>
            <p className="animate-on-scroll">
            Transform from a non-technical leader into a self-sufficient, AI-powered entrepreneur. I'm Kalicharan Mahasivabhattu, 
            Director of Data Science at Pharma with over 23 years of experience building innovative AI/ML solutions for Fortune 500 companies. 
            Now, I'm bringing that expertise directly to startup founders, CEOs, and senior managers.
            </p>
            <p className="animate-on-scroll">
            My personalized, 1:1 Vibe Coding™ training is designed for rapid execution: you'll move from initial prompt to a fully functional web application prototype in just a few days. We cut through the confusion of generic training programs, ensuring you avoid getting stuck in tools with a dedicated, handholding approach until your product is live.
            </p>
            <p className="animate-on-scroll">
            Master the art of creating high-impact MVPs using conversational AI, generative AI, computer vision, and natural language processing. By leveraging AI as your entire technical team, you gain the confidence to quickly iterate and monetize your ideas, giving you a massive competitive advantage.
            </p>
            <div className="skills-grid animate-on-scroll">
              <div className="skill-badge">Prompt Engineering</div>
              <div className="skill-badge">Replit</div>
              <div className="skill-badge">Cursor</div>
              <div className="skill-badge">Vercel</div>
              <div className="skill-badge">Github</div>
              <div className="skill-badge">Zhipu</div>
              <div className="skill-badge">Postgress</div>
              <div className="skill-badge">LLMs</div>
            </div>
          </div>
          <div className="about-image animate-on-scroll">
            <div className="about-image-wrapper">
              <img src="/upload/profile-photo.jpeg" alt="Kalicharan Mahasivabhattu" />
            </div>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="book" id="book">
        <div className="container">
          <div className="section-header">
            <h2>My Book: <span className="gradient-text">Algorithm Diaries</span></h2>
            <p>Discover the fascinating world of Machine Learning and AI through real-world applications</p>
          </div>
          <div className="book-card">
            <div className="book-cover">
              <img src="/upload/algorithm-diaries-cover.png" alt="Algorithm Diaries by Kalicharan Mahasivabhattu" />
            </div>
            <div className="book-info">
              <span className="tag">Bestseller</span>
              <h3>Understanding ML & AI for Everyone</h3>
              <p>
                "Algorithm Diaries" demystifies complex machine learning and artificial intelligence concepts 
                for general audiences. Through engaging narratives and practical examples, I break down 
                how AI is transforming industries and changing our daily lives.
              </p>
              <ul className="book-features">
                <li>Real-world ML applications explained simply</li>
                <li>Perfect for beginners and enthusiasts</li>
                <li>Practical insights from industry experience</li>
                <li>Bridge between theory and practice</li>
              </ul>
              <a href="https://www.amazon.in/Algorithm-Diaries-Lighthearted-understanding-algorithms/dp/B0C24CJMKH" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Your Copy</a>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="podcast" id="podcast">
        <div className="container">
          <div className="section-header">
            <h2>My Podcast: <span className="gradient-text">Talking AWS for Data Science</span></h2>
            <p>Tune in to insightful discussions about cloud computing, data science, and AI</p>
          </div>
          <div className="podcast-grid">
            <div className="podcast-card">
              <div className="podcast-image">
                <span style={{ fontSize: '3rem' }}>▶</span>
              </div>
              <div className="podcast-content">
                <h3>Data Science in the Cloud</h3>
                <p>
                  Explore how modern data science workflows leverage AWS services. Learn best practices 
                  for scaling ML models and managing data pipelines in the cloud.
                </p>
                <a href="#" className="podcast-link">Listen Now →</a>
              </div>
            </div>
            <div className="podcast-card">
              <div className="podcast-image">
                <span style={{ fontSize: '3rem' }}>▶</span>
              </div>
              <div className="podcast-content">
                <h3>AI/ML Career Insights</h3>
                <p>
                  Get insider perspectives on building a successful career in AI and machine learning. 
                  Industry experts share their journeys and advice.
                </p>
                <a href="#" className="podcast-link">Listen Now →</a>
              </div>
            </div>
            <div className="podcast-card">
              <div className="podcast-image">
                <span style={{ fontSize: '3rem' }}>▶</span>
              </div>
              <div className="podcast-content">
                <h3>Building AI Products</h3>
                <p>
                  Learn the end-to-end process of taking AI ideas from concept to production. 
                  Real-world case studies and practical lessons.
                </p>
                <a href="#" className="podcast-link">Listen Now →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <div className="container achievements-content">
          <div className="section-header">
            <h2>Recognized <span className="gradient-text">Achievements</span></h2>
            <p>A track record of innovation and excellence in AI/ML</p>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-number">$50K</div>
              <h4>Innovation Funding</h4>
              <p>Winner of $50,000 innovation funding for groundbreaking AI/ML projects</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">👥</div>
              <div className="achievement-number">9K+</div>
              <h4>LinkedIn Followers</h4>
              <p>Building a community of 8,000+ professionals passionate about AI and data science</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🎯</div>
              <div className="achievement-number">23+</div>
              <h4>Years Experience</h4>
              <p>Two decades of expertise across healthcare, manufacturing, and technology sectors</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">📚</div>
              <div className="achievement-number">1</div>
              <h4>Published Author</h4>
              <p>Author of "Algorithm Diaries" - making ML/AI accessible to everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <div className="section-header">
            <h2>Vibe Coding <span className="gradient-text">Training Programs</span></h2>
            <p>Personalized 1:1 coaching to master AI-assisted development</p>
          </div>
          <div className="courses-grid">
            <div className="course-card featured">
              <div className="course-badge">Most Popular</div>
              <div className="course-icon">🚀</div>
              <h3>Vibe Coding Fundamentals</h3>
              <p>
                Master the art of AI-assisted coding from scratch. Learn effective prompting techniques, 
                understand AI model capabilities, and build your first AI-powered applications.
              </p>
              <ul className="course-features">
                <li>8 weeks of personalized 1:1 coaching</li>
                <li>Weekly 60-minute live sessions</li>
                <li>Hands-on projects and assignments</li>
                <li>Access to curated resources</li>
                <li>Priority email support</li>
              </ul>
              <div className="course-price">
                $1,999 <span>/ course</span>
              </div>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Enroll Now</a>
            </div>
            <div className="course-card">
              <div className="course-icon">💼</div>
              <h3>Advanced Vibe Coding</h3>
              <p>
                Take your skills to the next level. Learn complex prompt engineering, 
                multi-agent systems, and production-grade AI applications.
              </p>
              <ul className="course-features">
                <li>12 weeks of intensive training</li>
                <li>Weekly 90-minute deep-dive sessions</li>
                <li>Real-world project implementation</li>
                <li>Code reviews and optimization</li>
                <li>Deployment strategies</li>
              </ul>
              <div className="course-price">
                $2,999 <span>/ course</span>
              </div>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Enroll Now</a>
            </div>
            <div className="course-card">
              <div className="course-icon">🎯</div>
              <h3>Enterprise Vibe Coding</h3>
              <p>
                Transform your team's productivity with corporate Vibe Coding training. 
                Customized programs for organizations looking to adopt AI-assisted development.
              </p>
              <ul className="course-features">
                <li>Custom curriculum design</li>
                <li>Team training sessions</li>
                <li>Project-based learning</li>
                <li>Best practices documentation</li>
                <li>Ongoing consultation</li>
              </ul>
              <div className="course-price">
                Custom <span>/ pricing</span>
              </div>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" id="contact">
        <div className="container cta-content">
          <h2>Ready to Transform Your Coding Journey?</h2>
          <p>
            Join hundreds of developers who have accelerated their careers with Vibe Coding. 
            Get personalized guidance from an industry expert who's been building AI solutions for over 20 years.
          </p>
          <button type="button" onClick={() => setShowGetStartedForm(true)} className="btn btn-white">Get Started Today</button>
        </div>
      </section>

      {/* Get Started Form Dialog */}
      <Dialog open={showGetStartedForm} onOpenChange={setShowGetStartedForm}>
        <DialogContent className="get-started-dialog sm:max-w-lg bg-white border-0 shadow-2xl rounded-2xl p-8">
          <DialogHeader className="pb-4 border-b border-slate-200">
            <DialogTitle className="text-xl font-bold text-slate-900 font-[family-name:var(--font-geist-sans)]">
              Get Started Today
            </DialogTitle>
            <DialogDescription className="text-slate-600 mt-1">
              Share your details and we&apos;ll get back to you with personalized guidance for your Vibe Coding journey.
            </DialogDescription>
          </DialogHeader>
          {formStatus === 'success' ? (
            <div className="py-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <p className="text-green-600 font-semibold text-lg">Thank you!</p>
              <p className="text-slate-600 mt-1">We&apos;ve received your information and will reach out soon.</p>
            </div>
          ) : (
            <form onSubmit={handleGetStartedSubmit} className="space-y-4 pt-6">
              <div>
                <Label htmlFor="lead-name">Name *</Label>
                <Input
                  id="lead-name"
                  required
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  disabled={formStatus === 'submitting'}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lead-email">Email *</Label>
                <Input
                  id="lead-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  disabled={formStatus === 'submitting'}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lead-phone">Phone</Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formState.phone}
                  onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                  disabled={formStatus === 'submitting'}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lead-interest">I&apos;m interested in</Label>
                <select
                  id="lead-interest"
                  value={formState.interest}
                  onChange={(e) => setFormState((s) => ({ ...s, interest: e.target.value }))}
                  disabled={formStatus === 'submitting'}
                  className="mt-1 w-full"
                >
                  <option value="">Select an option</option>
                  <option value="Vibe Coding 1:1">Vibe Coding 1:1 Coaching</option>
                  <option value="Beginner Vibe Coding">Beginner Vibe Coding</option>
                  <option value="Advanced Vibe Coding">Advanced Vibe Coding</option>
                  <option value="Enterprise Training">Enterprise Training</option>
                  <option value="Algorithm Diaries Book">Algorithm Diaries Book</option>
                  <option value="Podcast">Podcast</option>
                  <option value="General inquiry">General inquiry</option>
                </select>
              </div>
              <div>
                <Label htmlFor="lead-message">Message</Label>
                <Textarea
                  id="lead-message"
                  placeholder="Tell us about your goals or any questions..."
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  disabled={formStatus === 'submitting'}
                  rows={3}
                  className="mt-1"
                />
              </div>
              {formStatus === 'error' && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="form-submit-btn"
              >
                {formStatus === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="logo">Kali</div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/kalicharan-mahasivabhattu-5a6a6a12/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="footer-links">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            <a href="#book" onClick={(e) => scrollToSection(e, 'book')}>Book</a>
            <a href="#podcast" onClick={(e) => scrollToSection(e, 'podcast')}>Podcast</a>
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')}>Courses</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          </div>
          <p>© 2025 Kalicharan Mahasivabhattu. All rights reserved. | mkalicharan.com</p>
        </div>
      </footer>
    </>
  )
}
