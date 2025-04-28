import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaTicketAlt, 
  FaUsers, 
  FaChartLine, 
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaServer,
  FaShieldAlt
} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', agreeTerms: false });
  
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleRegisterChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRegisterData({ ...registerData, [e.target.name]: value });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  
  return (
    <div className="page-container">
      {/* Header */}
      <header className="page-header">
        <div className="logo">
          HelpDesk<span className="logo-plus">+</span>
        </div>
        
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        <nav className="desktop-nav">
          <a 
            href="#" 
            className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}
          >
            Home
          </a>
          <a 
            href="#features" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}
          >
            Features
          </a>
          <a 
            href="#cloud" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}
          >
            Cloud
          </a>
          <a 
            href="#contact" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}
          >
            Contact
          </a>
        </nav>
        
        {activeSection === 'home' ? (
          <button 
            onClick={() => setActiveSection('login')} 
            className="signin-button"
          >
            Sign In
          </button>
        ) : (
          <button 
            onClick={() => setActiveSection('home')} 
            className="back-button"
          >
            Back to Home
          </button>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a 
              href="#" 
              className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveSection('home'); setMobileMenuOpen(false); }}
            >
              Home
            </a>
            <a 
              href="#features" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); setActiveSection('home'); setMobileMenuOpen(false); }}
            >
              Features
            </a>
            <a 
              href="#cloud" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); setActiveSection('home'); setMobileMenuOpen(false); }}
            >
              Cloud
            </a>
            <a 
              href="#contact" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); setActiveSection('home'); setMobileMenuOpen(false); }}
            >
              Contact
            </a>
            {activeSection === 'home' ? (
              <button 
                onClick={() => { setActiveSection('login'); setMobileMenuOpen(false); }} 
                className="mobile-signin-button"
              >
                Sign In
              </button>
            ) : (
              <button 
                onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }} 
                className="mobile-back-button"
              >
                Back to Home
              </button>
            )}
          </nav>
        </div>
      )}
      
      <main className="main-content">
        {activeSection === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <span className="hero-badge">
                  IT Support Made Easy
                </span>
                <h1 className="hero-title">
                  Streamline Your <span className="gradient-text">IT Support</span> with HelpDesk+
                </h1>
                <p className="hero-description">
                  Our professional IT ticketing system helps you manage, track, and resolve technical issues efficiently. Designed for modern teams who need reliable support solutions.
                </p>
                <div className="hero-buttons">
                  <button
                    onClick={() => setActiveSection('login')}
                    className="primary-button"
                  >
                    <span>Get Started</span>
                    <FaArrowRight className="button-icon" />
                  </button>
                  <button
                    onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                    className="secondary-button"
                  >
                    <span>Learn More</span>
                  </button>
                </div>
              </div>

              <div className="hero-graphic">
                <div className="graphic-circle large"></div>
                <div className="graphic-main">
                  <FaTicketAlt className="graphic-icon" />
                </div>
                <div className="graphic-circle small users">
                  <FaUsers className="graphic-icon" />
                </div>
                <div className="graphic-dot"></div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
              <h2 className="section-title gradient-text">
                Powerful Features
              </h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaTicketAlt />
                  </div>
                  <h3 className="feature-title">Ticket Management</h3>
                  <p className="feature-description">
                    Create, assign and track IT tickets with an intuitive interface designed for efficiency.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaUsers />
                  </div>
                  <h3 className="feature-title">User Administration</h3>
                  <p className="feature-description">
                    Manage users, permissions and system configuration with granular control.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaChartLine />
                  </div>
                  <h3 className="feature-title">Real-time Analytics</h3>
                  <p className="feature-description">
                    Get insights with comprehensive reporting and dashboard metrics.
                  </p>
                </div>
              </div>
            </section>

            {/* Cloud Section */}
            <section id="cloud" className="cloud-section">
              <div className="cloud-content">
                <h2 className="section-title gradient-text">
                  Cloud Powered Solution
                </h2>
                <p className="cloud-description">
                  Notre solution basée sur le cloud offre une plateforme de support accessible de n'importe où, sur n'importe quel appareil, avec une fiabilité de qualité entreprise.
                </p>
                
                <div className="cloud-features-grid">
                  <div className="cloud-feature-card">
                    <div className="feature-icon">
                      <FaServer />
                    </div>
                    <h3>Infrastructure Scalable</h3>
                    <p>Adaptez votre capacité en fonction de vos besoins</p>
                    <a href="#cloud-details" className="learn-more-link">
                      En savoir plus <FaArrowRight />
                    </a>
                  </div>
                  
                  <div className="cloud-feature-card">
                    <div className="feature-icon">
                      <FaShieldAlt />
                    </div>
                    <h3>Sécurité Renforcée</h3>
                    <p>Protection des données avec chiffrement de bout en bout</p>
                    <a href="#security" className="learn-more-link">
                      En savoir plus <FaArrowRight />
                    </a>
                  </div>
                </div>
                
                <div className="cloud-cta">
                  <button className="primary-button">
                    Essai gratuit de 30 jours
                  </button>
                  <a href="#pricing" className="pricing-link">
                    Voir nos plans et tarifs
                  </a>
                </div>
              </div>
              
              <div className="cloud-graphic">
                <div className="graphic-dot top-left"></div>
                <div className="graphic-dot bottom-right"></div>
                <div className="cloud-dashboard">
                  <div className="dashboard-header">
                    <FaTicketAlt className="dashboard-icon" />
                  </div>
                  <div className="dashboard-content">
                    <h3>Cloud Dashboard</h3>
                    <p>Access your tickets from anywhere</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
              <div className="contact-container">
                <div className="contact-info">
                  <h2 className="section-title gradient-text">
                    Contactez notre équipe
                  </h2>
                  
                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="method-icon">
                        <FaEnvelope />
                      </div>
                      <div className="method-details">
                        <h3>Email</h3>
                        <p>support@helpdeskplus.com</p>
                        <a href="mailto:support@helpdeskplus.com" className="contact-link">
                          Envoyer un email <FaArrowRight />
                        </a>
                      </div>
                    </div>
                    
                    <div className="contact-method">
                      <div className="method-icon">
                        <FaPhone />
                      </div>
                      <div className="method-details">
                        <h3>Téléphone</h3>
                        <p>+1 (555) 123-4567</p>
                        <p>Lundi-Vendredi, 9h-17h</p>
                      </div>
                    </div>
                    
                    <div className="contact-method">
                      <div className="method-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="method-details">
                        <h3>Bureaux</h3>
                        <p>123 Tech Street</p>
                        <p>San Francisco, CA 94107</p>
                        <a href="#directions" className="contact-link">
                          Itinéraire <FaArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="contact-form-container">
                  <h3>Ou envoyez-nous un message</h3>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Votre email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        rows="4"
                        placeholder="Votre message"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      className="submit-button"
                    >
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Login Section */}
        {activeSection === 'login' && (
          <section className="auth-section">
            <div className="auth-container">
              <div className="auth-header">
                <h2 className="auth-title gradient-text">
                  Welcome Back
                </h2>
                <div className="auth-title-underline"></div>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="your@email.com"
                      required
                    />
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <div className="input-with-icon">
                    <input
                      type="password"
                      id="login-password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      required
                    />
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-options">
                  <div className="remember-me">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                    />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>
                  <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="auth-submit-button"
                >
                  <span>Sign In</span>
                  <FaArrowRight />
                </button>
              </form>
              
              <div className="auth-footer">
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setActiveSection('register')}
                    className="auth-switch-button"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Register Section */}
        {activeSection === 'register' && (
          <section className="auth-section">
            <div className="auth-container">
              <div className="auth-header">
                <h2 className="auth-title gradient-text">
                  Create Account
                </h2>
                <div className="auth-title-underline"></div>
              </div>
              
              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="register-username">Username</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="register-username"
                      name="username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      placeholder="username"
                      required
                    />
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-email">Email</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      placeholder="your@email.com"
                      required
                    />
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <div className="input-with-icon">
                    <input
                      type="password"
                      id="register-password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="••••••••"
                      required
                    />
                    <div className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-terms">
                  <input
                    id="terms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={registerData.agreeTerms}
                    onChange={handleRegisterChange}
                    required
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="#">Terms and Conditions</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="auth-submit-button"
                >
                  <span>Create Account</span>
                  <FaArrowRight />
                </button>
              </form>
              
              <div className="auth-footer">
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setActiveSection('login')}
                    className="auth-switch-button"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-logo">
                HelpDesk<span>+</span>
              </h3>
              <p className="footer-description">
                Professional IT ticketing system for modern teams who need reliable support solutions.
              </p>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#" onClick={() => setActiveSection('home')}>Home</a></li>
                <li><a href="#features" onClick={() => setActiveSection('home')}>Features</a></li>
                <li><a href="#cloud" onClick={() => setActiveSection('home')}>Cloud</a></li>
                <li><a href="#contact" onClick={() => setActiveSection('home')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-links">
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-contact">
                <li>info@helpdeskplus.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Tech Street, San Francisco</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} HelpDesk+. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;