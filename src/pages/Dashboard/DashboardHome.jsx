import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaScaleUnbalanced, FaRobot, FaBook, FaGavel, FaPenNib, FaLightbulb, FaUserGraduate, FaBrain, FaScaleBalanced, FaArrowRight } from 'react-icons/fa6';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scrollText = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  color: white;
  animation: ${fadeIn} 0.8s ease-out;
`;

const NewsWidget = styled.div`
  background: rgba(25, 195, 125, 0.1);
  border: 1px solid rgba(25, 195, 125, 0.2);
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const NewsLabel = styled.div`
  background: rgba(21, 23, 30, 0.5);
  color: var(--primary);
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(25, 195, 125, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
`;

const NewsMarquee = styled.div`
  padding: 0.8rem 0;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  display: flex;
  
  .ticker-track {
    display: inline-block;
    animation: ${scrollText} 40s linear infinite;
    padding-left: 100%;
  }

  span {
    display: inline-block;
    color: var(--text-secondary);
    margin-right: 50px;
    font-size: 0.95rem;
  }

  &:hover .ticker-track {
    animation-play-state: paused;
  }
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #6c5dd3 0%, #8f85f2 100%);
  padding: 3rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(108, 93, 211, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(50px);
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  span {
    font-size: 0.8rem;
    background: rgba(108, 93, 211, 0.2);
    color: var(--primary);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SectionDesc = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled(Link)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 1.5rem;
  text-decoration: none;
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(108, 93, 211, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(108, 93, 211, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::before { opacity: 1; }
    .icon-box { transform: rotate(10deg); background: var(--primary); color: white; }
    .arrow { transform: translateX(5px); opacity: 1; }
  }

  .icon-box {
    width: 60px;
    height: 60px;
    min-width: 60px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--primary);
    transition: all 0.3s;
  }

  .content {
    flex: 1;
    h3 {
      font-size: 1.15rem;
      margin: 0 0 0.3rem 0;
      color: #fff;
      font-weight: 600;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }
  }

  .arrow {
    font-size: 0.9rem;
    color: var(--primary);
    opacity: 0.3;
    transition: all 0.3s;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: var(--primary);
    opacity: 0.3;
    font-family: serif;
  }

  p {
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(45deg, #6c5dd3, #8f85f2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    div {
      h5 { margin: 0; color: white; }
      span { font-size: 0.8rem; color: var(--text-secondary); }
    }
  }
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  max-width: 800px;
  margin: 0 auto 3rem;
  
  .indicators {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: var(--primary);
        transform: scale(1.2);
      }
    }
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: 0 1rem;
`;

const DashboardHome = () => {
  const { user } = useAuth();
  const userName = user?.name || 'User';

  const newsItems = [
    "New IPC Amendment (2024) Passed - Key changes in Section 377",
    "Supreme Court Guidelines on Digital Privacy & Data Protection",
    "Bar Council of India announces new registration norms for 2025",
    "AI Regulation Bill proposed in upcoming parliament session",
    "Landmark judgment on Property Rights for Daughters summarized"
  ];

  const testimonials = [
    {
      text: "Lawyer.AI has completely transformed how I research cases. The IPC dictionary is a lifesaver!",
      name: "Adv. Rajesh Kumar",
      role: "Criminal Lawyer"
    },
    {
      text: "The AI assistant is accurate and surprisingly nuanced. It saves me hours of drafting time.",
      name: "Sriya Patel",
      role: "Law Student"
    },
    {
      text: "Finally, a platform that connects civilians with lawyers seamlessly. The courtroom feature is brilliant.",
      name: "Amit Verma",
      role: "Civilian User"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Container>
      {/* News Ticker - Refined for Mobile Stability */}
      <NewsWidget>
        <NewsLabel>⚡ LEGAL TRENDING:</NewsLabel>
        <NewsMarquee>
          <div className="ticker-track">
            {newsItems.map((item, i) => (
              <span key={i}>• {item}</span>
            ))}
          </div>
        </NewsMarquee>
      </NewsWidget>

      {/* Welcome Banner */}
      <WelcomeBanner>
        <h1>Hello, {userName}! 👋</h1>
        <p>Ready to revolutionize your legal workflow? Your AI assistant is standing by.</p>
      </WelcomeBanner>


      {/* Group 1: AI POWERED TOOLS */}
      <CategorySection>
        <SectionTitle>AI Intelligence Hub <span>Smart Tools</span></SectionTitle>
        <SectionDesc>Automate your legal research and document analysis with cutting-edge AI.</SectionDesc>
        <CategoryGrid>
          <ActionCard to="/dashboard/chat">
            <div className="icon-box"><FaRobot /></div>
            <div className="content">
              <h3>Legal AI Assistant</h3>
              <p>Chat with AI for instant case insights and legal research.</p>
            </div>
            <div className="arrow"><FaArrowRight /></div>
          </ActionCard>

          <ActionCard to="/dashboard/doc-analyzer">
            <div className="icon-box"><FaScaleUnbalanced /></div>
            <div className="content">
              <h3>Document Analyzer</h3>
              <p>AI-powered extraction of key clauses and legal terminology.</p>
            </div>
            <div className="arrow"><FaArrowRight /></div>
          </ActionCard>

          {/* Outcome Predictor: Lawyers only */}
          {(user?.role === 'lawyer' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/outcome-predictor">
              <div className="icon-box"><FaBrain /></div>
              <div className="content">
                <h3>Outcome Predictor</h3>
                <p>Predict case probabilities based on judicial patterns.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}

          {/* Strategy Generator: Students & Lawyers */}
          {(user?.role === 'law_student' || user?.role === 'lawyer' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/strategy-generator">
              <div className="icon-box"><FaLightbulb /></div>
              <div className="content">
                <h3>Strategy Generator</h3>
                <p>Receive AI-driven tactical advice for your legal scenarios.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}
        </CategoryGrid>
      </CategorySection>

      {/* Group 2: LAW & RESEARCH */}
      <CategorySection>
        <SectionTitle>Law & Knowledge <span>Research</span></SectionTitle>
        <SectionDesc>Comprehensive database for Indian laws and landmark judgments.</SectionDesc>
        <CategoryGrid>
          <ActionCard to="/dashboard/ipc">
            <div className="icon-box"><FaBook /></div>
            <div className="content">
              <h3>IPC Dictionary</h3>
              <p>Navigate the Indian Penal Code with simplified explanations.</p>
            </div>
            <div className="arrow"><FaArrowRight /></div>
          </ActionCard>

          <ActionCard to="/dashboard/case-library">
            <div className="icon-box"><FaScaleUnbalanced /></div>
            <div className="content">
              <h3>Open Case Library</h3>
              <p>Study, share, and discuss landmark court cases in India.</p>
            </div>
            <div className="arrow"><FaArrowRight /></div>
          </ActionCard>

          {/* Blogs: All Roles (Read access) */}
          {(user?.role === 'lawyer' || user?.role === 'law_student' || user?.role === 'civilian' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/blog">
              <div className="icon-box"><FaPenNib /></div>
              <div className="content">
                <h3>Legal Insights</h3>
                <p>Read landmark case studies and professional legal articles.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}
        </CategoryGrid>
      </CategorySection>

      {/* Group 3: SIMULATIONS & PRACTICE */}
      <CategorySection>
        <SectionTitle>Practice & Simulation <span>Experience</span></SectionTitle>
        <SectionDesc>Hone your skills in immersive virtual courtroom environments.</SectionDesc>
        <CategoryGrid>
          {/* Moot Court: Students & Lawyers only */}
          {(user?.role === 'lawyer' || user?.role === 'law_student' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/moot-court">
              <div className="icon-box"><FaUserGraduate /></div>
              <div className="content">
                <h3>Moot Court Simulator</h3>
                <p>Engage in realistic AI-hosted courtroom trial practice.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}

          {/* Judicial Simulation: Lawyers only */}
          {(user?.role === 'lawyer' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/judicial-simulation">
              <div className="icon-box"><FaScaleBalanced /></div>
              <div className="content">
                <h3>Judicial Simulation</h3>
                <p>Experience the reasoning process of a presiding judge.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}

          {/* Virtual Courtroom: Civilians & Lawyers only */}
          {(user?.role === 'civilian' || user?.role === 'lawyer' || user?.role === 'admin') && (
            <ActionCard to="/dashboard/courtroom">
              <div className="icon-box"><FaGavel /></div>
              <div className="content">
                <h3>Virtual Courtroom</h3>
                <p>Private secure consultation space for legal meetings.</p>
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </ActionCard>
          )}
        </CategoryGrid>
      </CategorySection>

      {/* Testimonials Section */}
      <SectionTitle>User Testimonials</SectionTitle>
      <CarouselContainer>
        <CarouselTrack style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((t, i) => (
            <TestimonialSlide key={i}>
              <TestimonialCard>
                <p>{t.text}</p>
                <div className="author">
                  <div className="avatar">{t.name[0]}</div>
                  <div>
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
              </TestimonialCard>
            </TestimonialSlide>
          ))}
        </CarouselTrack>
        <div className="indicators">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </CarouselContainer>

    </Container>
  );
};

export default DashboardHome;
