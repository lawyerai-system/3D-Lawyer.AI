import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa6';
import LandingNav from '../../components/Common/LandingNav';
import LandingFooter from '../../components/Common/LandingFooter';

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
  padding: 10rem 2rem 6rem;
  color: var(--text-main);
  animation: ${fadeIn} 0.8s ease-out;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: var(--primary);
    filter: blur(100px);
    opacity: 0.2;
    z-index: -1;
  }
  
  h1 {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #fff, #6c5dd3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -2px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: #a0a3bd;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
  }
`;

const Section = styled.section`
  margin-bottom: 8rem;
  display: flex;
  align-items: center;
  gap: 6rem;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 900px) {
    flex-direction: column !important;
    gap: 3rem;
    text-align: center;
  }
`;

const ImageBox = styled.div`
  flex: 1;
  height: 450px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  box-shadow: 0 40px 80px rgba(0,0,0,0.3);
`;

const ContentBox = styled.div`
  flex: 1;

  h2 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: white;
    letter-spacing: -1px;
  }

  p {
    font-size: 1.15rem;
    color: #a0a3bd;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const QuoteBox = styled.div`
  background: rgba(108, 93, 211, 0.05);
  border-left: 4px solid var(--primary);
  padding: 4rem;
  border-radius: 0 40px 40px 0;
  margin: 6rem 0;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.05);

  svg {
    font-size: 3rem;
    color: var(--primary);
    opacity: 0.3;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.8rem;
    font-style: italic;
    color: white;
    font-weight: 300;
    line-height: 1.4;
  }
`;

const AboutPage = () => {
  return (
    <PageWrapper>
      <LandingNav />
      <PageContainer>
        <HeroSection>
          <h1>Bridging Justice & Technology</h1>
          <p>
            LawAI is pioneering the future of legal assistance, making justice accessible,
            transparent, and efficient for everyone through the power of Artificial Intelligence.
          </p>
        </HeroSection>

        <Section>
          <ImageBox>🚀</ImageBox>
          <ContentBox>
            <h2>Our Mission</h2>
            <p>
              We strive to democratize legal knowledge. By leveraging advanced AI, we break down complex legal barriers,
              allowing ordinary citizens to understand their rights and enabling lawyers to work with unprecedented efficiency.
            </p>
          </ContentBox>
        </Section>

        <QuoteBox>
          <FaQuoteLeft />
          <p>"Justice delayed is justice denied. We use technology to ensure justice is always within reach."</p>
        </QuoteBox>

        <Section>
          <ImageBox>💡</ImageBox>
          <ContentBox>
            <h2>Our Vision</h2>
            <p>
              A world where legal counsel is not a luxury but a fundamental right accessible to all.
              We envision an ecosystem where AI acts as a trusted co-counsel, reducing backlog and eradicating
              errors in the judicial process.
            </p>
          </ContentBox>
        </Section>
      </PageContainer>
      <LandingFooter />
    </PageWrapper>
  );
};

export default AboutPage;
