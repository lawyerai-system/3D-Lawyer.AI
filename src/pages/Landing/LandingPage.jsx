import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Search, Gavel, BookOpen, ChevronRight, PlayCircle } from 'lucide-react';
import AIModel from '../../components/Landing/AIModel';
import LandingNav from '../../components/Common/LandingNav';
import LandingFooter from '../../components/Common/LandingFooter';

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageWrapper = styled.div`
  background: #0b0d14;
  color: #fff;
  overflow-x: hidden;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

// --- Hero Section ---
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
  line-height: 1.1;
  background: linear-gradient(135deg, #fff 0%, #6c5dd3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #a0a3bd;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MainCTA = styled.button`
  background: linear-gradient(90deg, #6c5dd3 0%, #ff754c 100%);
  background-size: 200% auto;
  animation: ${gradientFlow} 5s ease infinite;
  border: none;
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 10px 30px rgba(108, 93, 211, 0.4);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0 auto;

  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;

// --- Features Section ---
const Section = styled.section`
  padding: 8rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Tag = styled.span`
  background: rgba(108, 93, 211, 0.1);
  color: #6c5dd3;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-block;
  border: 1px solid rgba(108, 93, 211, 0.2);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(26, 29, 45, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #6c5dd3;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(108, 93, 211, 0.2);
    
    .card-glow {
      opacity: 1;
    }
  }

  .card-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(108, 93, 211, 0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(108, 93, 211, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c5dd3;
  margin-bottom: 1.5rem;
`;

// --- Demo Section ---
const DemoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  perspective: 2000px;
`;

const LaptopFrame = styled(motion.div)`
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #1a1d2d;
  border: 8px solid #333;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 50px 100px rgba(0,0,0,0.6);
  transform-style: preserve-3d;
  background-image: url("${props => props.$image}");
  background-size: cover;
  background-position: top center;

  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 12px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Lawyer.AI Chat',
      desc: 'Expert legal consultation powered by state-of-the-art AI. Get instant answers to complex legal queries.',
      icon: <Bot size={28} />,
      id: 'chat'
    },
    {
      title: 'IPC Finder',
      desc: 'Blazing fast search through the Indian Penal Code. Find sections, offenses, and punishments instantly.',
      icon: <Search size={28} />,
      id: 'ipc'
    },
    {
      title: 'Virtual Courtroom',
      desc: 'Immersive AI courtroom environment for practice, simulation, and case management.',
      icon: <Gavel size={28} />,
      id: 'courtroom'
    },
    {
      title: 'Legal Knowledge Hub',
      desc: 'Curated blogs and educational resources for students and legal professionals.',
      icon: <BookOpen size={28} />,
      id: 'blog'
    }
  ];

  return (
    <PageWrapper>
      <LandingNav />

      <HeroSection>
        <AIModel />
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroTitle>Future of Legal <br /> Intelligence.</HeroTitle>
          <HeroSubtitle>
            Experience the world's most advanced AI-powered legal assistance platform. Built for citizens, students, and legal professionals.
          </HeroSubtitle>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <MainCTA onClick={() => navigate('/auth')}>
              Launch App
              <ChevronRight size={20} />
            </MainCTA>
            <button
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '14px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              Watch Video
              <PlayCircle size={20} />
            </button>
          </div>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <SectionHeader>
            <Tag>Advanced Ecosystem</Tag>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Core AI Modules</h2>
            <p style={{ color: '#a0a3bd', maxWidth: '600px', margin: '1rem auto' }}>
              Our platform brings together deep legal expertise and cutting-edge machine learning.
            </p>
          </SectionHeader>

          <FeatureGrid>
            {features.map((feature, i) => (
              <FeatureCard
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-glow" />
                <IconWrapper>{feature.icon}</IconWrapper>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: '#a0a3bd', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {feature.desc}
                </p>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Container>
      </Section>

      <Section style={{ background: 'rgba(108, 93, 211, 0.02)' }}>
        <Container>
          <SectionHeader>
            <Tag>Real Experience</Tag>
            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Live Platform View</h2>
          </SectionHeader>

          <DemoWrapper>
            <LaptopFrame
              $image="/images/real_dashboard.png"
              initial={{ rotateX: 20, rotateY: -10, scale: 0.9 }}
              whileInView={{ rotateX: 10, rotateY: 0, scale: 1 }}
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </DemoWrapper>
        </Container>
      </Section>

      <Section style={{ textAlign: 'center' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, rgba(108, 93, 211, 0.1) 0%, rgba(255, 117, 76, 0.1) 100%)',
              padding: '4rem',
              borderRadius: '32px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to transform your legal workflow?</h2>
            <p style={{ color: '#a0a3bd', marginBottom: '2.5rem', fontSize: '1.2rem' }}>
              Join thousands of users leveraging AI for faster, smarter legal research and consultations.
            </p>
            <MainCTA onClick={() => navigate('/auth')}>Start for Free</MainCTA>
          </motion.div>
        </Container>
      </Section>

      <LandingFooter />
    </PageWrapper>
  );
};

export default LandingPage;
