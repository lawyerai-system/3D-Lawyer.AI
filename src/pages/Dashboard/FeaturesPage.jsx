import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRobot, FaGavel, FaPenNib, FaBook, FaScaleUnbalanced, FaUsers, FaShieldHalved, FaLaptop, FaFileSignature, FaBrain, FaFileContract, FaChartLine } from 'react-icons/fa6';
import LandingNav from '../../components/Common/LandingNav';
import LandingFooter from '../../components/Common/LandingFooter';
import { useAuth } from '../../context/AuthContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  background: #0b0d14;
  color: #fff;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  padding: 10rem 2rem 8rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  
  h1 {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #fff 0%, #6c5dd3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -2px;
  }

  p {
    font-size: 1.25rem;
    color: #a0a3bd;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(108, 93, 211, 0.5);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 40px 80px rgba(0,0,0,0.4);

    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      background: #6c5dd3;
      color: white;
      box-shadow: 0 0 30px rgba(108, 93, 211, 0.4);
    }
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    background: rgba(108, 93, 211, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    color: #6c5dd3;
    margin-bottom: 2rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    color: white;
  }

  p {
    color: #a0a3bd;
    line-height: 1.8;
    font-size: 1.05rem;
  }
`;
const featuresData = [
  {
    icon: <FaRobot />,
    title: "AI Legal Assistant",
    description: "Instant case insights and comprehensive legal research powered by advanced NLU technology.",
    allowedRoles: ['civilian', 'law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaChartLine />,
    title: "Strategy Generator",
    description: "AI-driven tactical advice and argument mapping for complex legal scenarios.",
    allowedRoles: ['law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaBrain />,
    title: "Outcome Predictor",
    description: "Leverage historical judicial patterns to calculate the probability of success for your case.",
    allowedRoles: ['lawyer', 'admin']
  },
  {
    icon: <FaGavel />,
    title: "Moot Court Simulator",
    description: "Immersive AI-hosted courtroom trial practice for aspiring lawyers and law students.",
    allowedRoles: ['law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaLaptop />,
    title: "Judicial Simulation",
    description: "Gain perspective by experiencing the judicial reasoning process through AI-powered simulations.",
    allowedRoles: ['lawyer', 'admin']
  },
  {
    icon: <FaFileContract />,
    title: "Document Analyzer",
    description: "Intelligent extraction and analysis of critical clauses and legal terminology in seconds.",
    allowedRoles: ['civilian', 'law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaBook />,
    title: "IPC Dictionary",
    description: "A complete, student-friendly reference for Indian Penal Code sections and punishments.",
    allowedRoles: ['civilian', 'law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaUsers />,
    title: "Open Case Library",
    description: "A collaborative repository for sharing landmark judgments and studying unique legal cases.",
    allowedRoles: ['civilian', 'law_student', 'lawyer', 'admin']
  },
  {
    icon: <FaShieldHalved />,
    title: "Justice Rooms",
    description: "Secure, end-to-end encrypted virtual consultation spaces for private attorney-client meetings.",
    allowedRoles: ['civilian', 'lawyer', 'admin']
  }
];

const FeaturesPage = () => {
  const { user } = useAuth();

  const filteredFeatures = user
    ? featuresData.filter(f => f.allowedRoles.includes(user.role))
    : featuresData; // Show all to non-logged users/landing visitors

  return (
    <PageWrapper>
      <LandingNav />
      <PageContainer>
        <HeroSection>
          <h1>Powerful Legal Features</h1>
          <p>Everything you need to navigate the legal world, empowered by Artificial Intelligence.</p>
        </HeroSection>

        <Grid>
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </Grid>
      </PageContainer>
      <LandingFooter />
    </PageWrapper>
  );
};

export default FeaturesPage;
