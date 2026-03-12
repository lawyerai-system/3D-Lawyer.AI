import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGavel, FaScaleUnbalanced, FaUserTie, FaUserGraduate, FaPaperPlane, FaXmark, FaRobot, FaCircleInfo, FaStar } from 'react-icons/fa6';
import api from '../../../utils/axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - 80px); /* Fill space between Nav and Footer */
  background: #0b0d14;
  color: white;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.div`
  width: 350px;
  background: rgba(255, 255, 255, 0.03);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 { font-size: 1.25rem; color: var(--primary); margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
  h3 { font-size: 1rem; color: #fff; margin-bottom: 0.5rem; }
  p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: radial-gradient(circle at center, rgba(108, 93, 211, 0.05) 0%, transparent 70%);
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 1rem 1.5rem;
  border-radius: 18px;
  line-height: 1.6;
  font-size: 0.95rem;
  ${props => props.$sender === 'User' ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #6c5dd3 0%, #8f85f2 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : props.$sender === 'AI Judge' ? `
    align-self: center;
    background: rgba(45, 55, 72, 0.8);
    border: 1px solid rgba(255, 215, 0, 0.3); /* Golden accent for judge */
    text-align: center;
    border-radius: 12px;
  ` : `
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.05);
    border-bottom-left-radius: 4px;
  `}

  small {
    display: block;
    font-weight: 700;
    margin-bottom: 0.3rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${props => props.$sender === 'AI Judge' ? '#FFD700' : props.$sender === 'User' ? 'rgba(255,255,255,0.7)' : 'var(--primary)'};
  }
`;

const InputArea = styled.div`
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  resize: none;
  height: 60px;
  &:focus { outline: none; border-color: var(--primary); }
`;

const SendButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  width: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.2s;
  &:hover { transform: scale(1.05); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SetupOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #0b0d14;
  z-index: 100;
  display: flex;
  flex-direction: column; /* Better for scrolling content */
  align-items: center;
  justify-content: flex-start; /* Start from top to ensure full scrollability */
  padding: 4rem 2rem; /* Add vertical padding for breathing room when scrolling */
  overflow-y: auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 32px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
`;

const SelectButton = styled.button`
  background: ${props => props.$active ? 'var(--primary)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  &:hover { background: ${props => props.$active ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; }

  svg { font-size: 1.5rem; }
  span { font-weight: 600; }
`;

const LevelGrid = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LevelTag = styled.button`
  background: ${props => props.$active ? 'var(--primary)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #6c5dd3 0%, #8f85f2 100%);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.5; }
`;

const EvaluationCard = styled.div`
  background: rgba(25, 195, 125, 0.05);
  border: 1px solid rgba(25, 195, 125, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1rem;
`;

const ScoreCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0 auto 1.5rem;
`;

const MootCourtSimulator = () => {
    const [step, setStep] = useState('setup'); // setup, case_preview, simulation, results
    const [role, setRole] = useState('Prosecutor');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [session, setSession] = useState(null);
    const [userMessage, setUserMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [error, setError] = useState(null);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [session?.messages]);

    const handleStart = async () => {
        setTyping(true);
        setError(null);
        try {
            const res = await api.post('/api/moot-court/start', { role, difficulty });
            setSession(res.data.data);
            setStep('case_preview');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to generate case. Please try again.');
        } finally {
            setTyping(false);
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const currentMsg = userMessage;
        setUserMessage('');

        // Optimistic update
        setSession(prev => ({
            ...prev,
            messages: [...prev.messages, { sender: 'User', content: currentMsg }]
        }));

        setTyping(true);
        try {
            const res = await api.post('/api/moot-court/message', {
                sessionId: session._id,
                message: currentMsg
            });

            setSession(prev => ({
                ...prev,
                messages: [...prev.messages, ...res.data.data]
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setTyping(false);
        }
    };

    const handleEndSession = async () => {
        setTyping(true);
        try {
            const res = await api.post('/api/moot-court/end', { sessionId: session._id });
            setSession(prev => ({
                ...prev,
                status: 'completed',
                evaluation: res.data.data
            }));
            setStep('results');
        } catch (err) {
            console.error(err);
        } finally {
            setTyping(false);
        }
    };

    return (
        <Container>
            {(step === 'setup' || step === 'case_preview') && (
                <SetupOverlay>
                    {step === 'setup' ? (
                        <Card>
                            <h1>AI Moot Court Simulator</h1>
                            <p>Enter the courtroom and test your legal skills against the toughest AI opponents.</p>

                            <OptionGrid>
                                <SelectButton $active={role === 'Prosecutor'} onClick={() => setRole('Prosecutor')}>
                                    <FaUserTie />
                                    <span>Prosecutor</span>
                                </SelectButton>
                                <SelectButton $active={role === 'Defense Lawyer'} onClick={() => setRole('Defense Lawyer')}>
                                    <FaUserGraduate />
                                    <span>Defense Lawyer</span>
                                </SelectButton>
                            </OptionGrid>

                            <h3 style={{ marginBottom: '1rem' }}>Choose Difficulty Level</h3>
                            <LevelGrid>
                                {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                    <LevelTag key={lvl} $active={difficulty === lvl} onClick={() => setDifficulty(lvl)}>
                                        {lvl}
                                    </LevelTag>
                                ))}
                            </LevelGrid>

                            {error && (
                                <div style={{ color: '#ff7675', background: 'rgba(255, 118, 117, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.95rem', border: '1px solid rgba(255, 118, 117, 0.2)' }}>
                                    <strong>Error:</strong> {error}
                                </div>
                            )}

                            <StartButton onClick={handleStart} disabled={typing}>
                                {typing ? 'Generating Case...' : 'Prepare for Trial'}
                            </StartButton>
                        </Card>
                    ) : (
                        <Card style={{ textAlign: 'left', maxWidth: '800px' }}>
                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{session?.caseDetails?.title}</h2>
                            <h3 style={{ marginBottom: '0.5rem' }}>Case Background</h3>
                            <p style={{ marginBottom: '1.5rem' }}>{session?.caseDetails?.background}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                <div>
                                    <h3>Evidence</h3>
                                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {session?.caseDetails?.evidence?.map((e, i) => <li key={i}>{e}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3>Precedent Laws (IPC)</h3>
                                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {session?.caseDetails?.relevantSections?.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <StartButton onClick={() => setStep('simulation')}>Enter Courtroom</StartButton>
                            </div>
                        </Card>
                    )}
                </SetupOverlay>
            )}

            {session && (
                <>
                    <Sidebar>
                        <h2>Case File</h2>
                        <div>
                            <h3>Title</h3>
                            <p>{session.caseDetails.title}</p>
                        </div>
                        <div>
                            <h3>Witnesses</h3>
                            {session.caseDetails.witnesses.map((w, i) => <p key={i} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>{w}</p>)}
                        </div>
                        <div style={{ marginTop: 'auto' }}>
                            <button
                                onClick={handleEndSession}
                                style={{ width: '100%', padding: '1rem', background: 'rgba(245, 101, 101, 0.1)', border: '1px solid #f56565', color: '#f56565', borderRadius: '12px', cursor: 'pointer' }}
                            >
                                Conclude Trial
                            </button>
                        </div>
                    </Sidebar>

                    <MainContent>
                        {step === 'results' && (
                            <div style={{ position: 'absolute', inset: 0, background: '#0b0d14', zIndex: 200, padding: '3rem', overflowY: 'auto' }}>
                                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Trial Performance Evaluation</h1>
                                    <EvaluationCard>
                                        <ScoreCircle>{session.evaluation?.score}</ScoreCircle>
                                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                                            <div>
                                                <h3>Legal Reasoning & IPC Use</h3>
                                                <p>{session.evaluation?.ipcUse}</p>
                                            </div>
                                            <div>
                                                <h3>Argument Clarity</h3>
                                                <p>{session.evaluation?.clarity}</p>
                                            </div>
                                            <div>
                                                <h3>AI Suggestions</h3>
                                                <p>{session.evaluation?.suggestions}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                                            <StartButton onClick={() => window.location.reload()}>Start New Simulation</StartButton>
                                        </div>
                                    </EvaluationCard>
                                </div>
                            </div>
                        )}

                        <ChatWindow>
                            {session.messages.map((m, i) => (
                                <MessageBubble key={i} $sender={m.sender}>
                                    <small>{m.sender}</small>
                                    {m.content}
                                </MessageBubble>
                            ))}
                            {typing && (
                                <MessageBubble $sender="AI" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                                    AI Participants are drafting their responses...
                                </MessageBubble>
                            )}
                            <div ref={chatEndRef} />
                        </ChatWindow>

                        <InputArea>
                            <TextArea
                                placeholder="State your legal argument..."
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                            />
                            <SendButton onClick={handleSendMessage} disabled={!userMessage.trim() || typing}>
                                <FaPaperPlane />
                            </SendButton>
                        </InputArea>
                    </MainContent>
                </>
            )}
        </Container>
    );
};

export default MootCourtSimulator;
