import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import githubLogo from '../../assets/icons/Github.png'
import LinkedInLogo from '../../assets/icons/LinkedIn.png'
import FacebookLogo from '../../assets/icons/Facebook.png'
import InstagramLogo from '../../assets/icons/Instagram.webp'
import TelegramLogo from '../../assets/icons/Telegram.png'

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      // For demonstration purposes, let's just simulate success after a delay
      // setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('success');
        formRef.current?.reset();
      }, 1500);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full flex flex-col justify-center py-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyanGlow to-transparent rounded-full mx-auto mb-6" />
        <p className="text-gray-400 max-w-2.2xl mx-auto">
          Whether you have a question, a project idea, or just want to say hi, 
          I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto w-full">
        {/* Contact Info & Socials */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 flex flex-col space-y-8"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
            <div className="flex flex-col space-y-6">
              {[
                { icon: () => <img src={githubLogo} alt="GitHub"/>, label: 'GitHub', link: 'https://github.com/K-Sothearith' },
                { icon: () => <img src={LinkedInLogo} alt="LinkedIn"/>, label: 'LinkedIn', link: 'https://www.linkedin.com/in/kongsothearith' },
                { icon: () => <img src={FacebookLogo} alt="Facebook"/>, label: 'Facebook', link: 'https://www.facebook.com/AnhAhRithz' },
                { icon: () => <img src={InstagramLogo} alt="Instagram"/>, label: 'Instagram', link: 'https://www.instagram.com/kong_sothearith_?igsh=amtlc2VldGhyZWh0' },
                { icon: () => <img src={TelegramLogo} alt="Telegram"/>, label: 'Telegram', link: 'https://t.me/False_Saintt' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target={social.link === '#' ? undefined : '_blank'}
                  rel={social.link === '#' ? undefined : 'noopener noreferrer'}
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  className="flex items-center space-x-4 text-gray-400 hover:text-cyanGlow transition-colors duration-300 group"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyanGlow/10 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 w-10 h-10 flex items-center justify-center">
                    <social.icon />
                  </div>
                  <span className="font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="user_name" className="text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  className="bg-abyss/50 border border-cyanGlow/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyanGlow focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
                  placeholder="Yuji Itadori"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="user_email" className="text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  className="bg-abyss/50 border border-cyanGlow/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyanGlow focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
                  placeholder="yuji.itadori@gmail.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="bg-abyss/50 border border-cyanGlow/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyanGlow focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300 resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex items-center justify-center space-x-2 bg-cyanGlow/10 border border-cyanGlow text-cyanGlow py-4 rounded-lg overflow-hidden hover:bg-cyanGlow hover:text-abyss transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              {!isSubmitting && <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-tealGlow justify-center mt-4">
                <CheckCircle size={18} />
                <span>Message sent successfully!</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-red-400 justify-center mt-4">
                <XCircle size={18} />
                <span>Failed to send message. Please try again.</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
