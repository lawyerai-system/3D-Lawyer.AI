import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaSpinner, FaEnvelope, FaPhone, FaLocationDot, FaTag } from 'react-icons/fa6';
import LandingNav from '../../components/Common/LandingNav';
import LandingFooter from '../../components/Common/LandingFooter';
import { toast } from 'react-hot-toast';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  background: #0b0d14;
  color: #fff;
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 10rem 2rem 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
  overflow: hidden;
  max-width: 1100px;
  width: 100%;
  display: flex;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  backdrop-filter: blur(20px);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const InfoSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #6c5dd3 0%, #4a40a2 100%);
  padding: 4rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 250px;
    height: 250px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
  }

  h2 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    letter-spacing: -1px;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.8;
    line-height: 1.8;
    margin-bottom: 4rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.1rem;
    margin-bottom: 2rem;

    svg { 
      background: rgba(255,255,255,0.15);
      padding: 12px;
      border-radius: 12px;
      width: 45px;
      height: 45px;
    }
  }
`;

const FormSide = styled.div`
  flex: 1.5;
  padding: 5rem;
  background: transparent;

  @media (max-width: 768px) {
    padding: 3rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    color: #a0a3bd;
    font-size: 0.95rem;
    font-weight: 500;
  }

  input, textarea, select {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 1.2rem;
    border-radius: 16px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #6c5dd3;
      background: rgba(255,255,255,0.06);
      box-shadow: 0 0 20px rgba(108, 93, 211, 0.2);
    }

    option {
        background: #1a1d24;
        color: white;
    }
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

const SubmitBtn = styled.button`
  background: #6c5dd3;
  color: white;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover:not(:disabled) {
    background: #5a4db8;
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(108, 93, 211, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'civilian',
    issueType: 'General Contact',
    message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Sync with user data when it arrives
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        role: user.role || prev.role
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone) return toast.error("Phone number is required");

    setLoading(true);
    try {
      await api.post('/api/contact/submit', formData);
      toast.success("Support request sent successfully!");
      setFormData({ ...formData, message: '', phone: '', issueType: 'General Contact' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LandingNav />
      <Container>
        <Box>
          <InfoSide>
            <div>
              <h2>Let's Connect</h2>
              <p>Have a question or need to report an issue? Our team is ready to help you navigate the future of law.</p>

              <div className="contact-item"><FaEnvelope /> support@lawyer.ai</div>
              <div className="contact-item"><FaPhone /> +91 94095 59039</div>
              <div className="contact-item"><FaLocationDot /> Ahmedabad, Gujarat, India</div>
            </div>

            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>
              Typical response time: &lt; 24 hours
            </div>
          </InfoSide>

          <FormSide>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <FormGroup>
                  <label>Your Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                </FormGroup>
                <FormGroup>
                  <label>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                </FormGroup>
              </div>
              
              <FormGroup>
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" disabled={!!user?.email} required />
              </FormGroup>

              <FormGroup>
                <label><FaTag size={12}/> Issue Type</label>
                <select name="issueType" value={formData.issueType} onChange={handleChange}>
                  <option value="General Contact">General Contact</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Report User">Report User</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="How can we help you?" />
              </FormGroup>
              
              <SubmitBtn type="submit" disabled={loading}>
                {loading ? <FaSpinner className="spin" /> : <FaPaperPlane />}
                {loading ? 'Sending Support Ticket...' : 'Send Message'}
              </SubmitBtn>
            </form>
          </FormSide>
        </Box>
      </Container>
      <LandingFooter />
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </PageWrapper>
  );
};

export default ContactPage;
