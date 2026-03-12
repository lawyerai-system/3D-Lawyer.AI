import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Scale, FileText, Bookmark, ArrowRight, User, Calendar, ArrowLeft } from 'lucide-react';
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10rem 2rem 8rem;
`;

const BackToHome = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6c5dd3;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 2rem;
    transition: all 0.3s;
    width: fit-content;

    &:hover {
        gap: 0.8rem;
        opacity: 0.8;
    }
`;

const Hero = styled.div`
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
    font-size: 1.2rem;
    color: #a0a3bd;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 3rem;
`;

const BlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(108, 93, 211, 0.4);
    box-shadow: 0 40px 80px rgba(0,0,0,0.5);

    .blog-image {
        transform: scale(1.05);
    }
  }
`;

const ImageWrapper = styled.div`
  height: 240px;
  overflow: hidden;
  background: #1a1d2d;
  position: relative;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: #6c5dd3;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const BlogContent = styled.div`
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: white;
    line-height: 1.3;
  }

  p {
    color: #a0a3bd;
    line-height: 1.7;
    font-size: 1rem;
    margin-bottom: 2rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #686a7d;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ReadMore = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c5dd3;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
  transition: gap 0.3s;

  &:hover {
    gap: 0.8rem;
  }
`;

const LegalBlogPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleHomeRedirect = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const articles = [
    {
      title: "How Legal AI is Transforming Modern Practice",
      excerpt: "The integration of AI into legal research is no longer a luxury. It's becoming the standard for efficiency, accuracy, and client satisfaction in top law firms.",
      category: "Tech & Law",
      author: "Adv. J. Mehta",
      date: "Mar 05, 2026",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Understanding Section 377 Amendments in 2024",
      excerpt: "Decoding the latest supreme court rulings and legislative changes that affect human rights and individual privacy under the Indian Penal Code.",
      category: "Legal Update",
      author: "Dr. Sandeep J.",
      date: "Feb 28, 2026",
      image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "The Ethics of Virtual Courtrooms",
      excerpt: "Exploring the balance between accessibility and judicial tradition. Are virtual court hearings the future of justice democratization or a temporary solution?",
      category: "Judiciary",
      author: "Sara V. Khan",
      date: "Feb 20, 2026",
      image: "https://images.unsplash.com/photo-1453941303383-bd0878563c63?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <PageWrapper>
      <LandingNav />
      <Container>
        <BackToHome onClick={handleHomeRedirect}>
          <ArrowLeft size={16} /> Back to Homepage
        </BackToHome>
        <Hero>
          <h1>Legal Knowledge Hub</h1>
          <p>
            Insights, updates, and deep dives into the intersection of technology and the justice system.
            Empowering everyone with the clarity they deserve.
          </p>
        </Hero>

        <BlogGrid>
          {articles.map((article, i) => (
            <BlogCard
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ImageWrapper>
                <CategoryTag>{article.category}</CategoryTag>
                <BlogImage className="blog-image" $image={article.image} />
              </ImageWrapper>
              <BlogContent>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <ReadMore onClick={() => navigate('/auth')}>
                  Read Full Article <ArrowRight size={18} />
                </ReadMore>
                <BlogMeta>
                  <div><User size={14} /> {article.author}</div>
                  <div><Calendar size={14} /> {article.date}</div>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>

        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <button
            onClick={() => navigate('/auth')}
            style={{
              background: 'rgba(108, 93, 211, 0.1)',
              border: '1px solid rgba(108, 93, 211, 0.2)',
              color: '#6c5dd3',
              padding: '1.2rem 3rem',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            Sign in to view all 150+ articles
          </button>
        </div>
      </Container>
      <LandingFooter />
    </PageWrapper>
  );
};

export default LegalBlogPage;

