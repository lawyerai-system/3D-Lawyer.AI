import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../utils/axios';
import { toast } from 'react-hot-toast';
import { FaSave, FaCog, FaToggleOn, FaToggleOff, FaFolderOpen, FaServer, FaPlus, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
  
  svg { opacity: 0.8; }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);

  .info {
    display: flex;
    flex-direction: column;
    span { font-weight: 600; font-size: 0.95rem; }
    small { color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px; }
  }
`;

const Toggle = styled.button`
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: ${props => props.active ? 'var(--primary)' : '#4b5563'};
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover { transform: scale(1.1); }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Tag = styled.div`
  background: rgba(108, 93, 211, 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(108, 93, 211, 0.2);

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    padding: 0;
    opacity: 0.6;
    &:hover { opacity: 1; }
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    color: white;
    &:focus { outline: none; border-color: var(--primary); }
  }
`;

const ActionBtn = styled.button`
  background: ${props => props.variant === 'primary' ? 'var(--primary)' : 'rgba(255,255,255,0.05)'};
  color: white;
  border: 1px solid ${props => props.variant === 'primary' ? 'var(--primary)' : 'var(--border)'};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#5a4db8' : 'rgba(255,255,255,0.1)'};
    transform: translateY(-2px);
  }
`;

const SettingsManagement = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ blog: '', library: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/api/settings');
      if (res.data.success) {
        setSettings(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (feature) => {
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: !settings.features[feature]
      }
    });
  };

  const handleAddCategory = (type) => {
    if (!newCat[type].trim()) return;
    const catList = type === 'blog' ? 'blog' : 'caseLibrary';
    if (settings.categories[catList].includes(newCat[type].trim())) {
      return toast.error("Category already exists");
    }

    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        [catList]: [...settings.categories[catList], newCat[type].trim()]
      }
    });
    setNewCat({ ...newCat, [type]: '' });
  };

  const handleRemoveCategory = (type, category) => {
    const catList = type === 'blog' ? 'blog' : 'caseLibrary';
    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        [catList]: settings.categories[catList].filter(c => c !== category)
      }
    });
  };

  const handleSave = async () => {
    try {
      const res = await api.patch('/api/settings', settings);
      if (res.data.success) {
        toast.success("Settings saved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };

  if (loading || !settings) return <div>Loading settings...</div>;

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Platform Settings</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '5px 0 0' }}>Manage global feature toggles and configurations.</p>
        </div>
        <ActionBtn variant="primary" onClick={handleSave}>
          <FaSave /> Save Changes
        </ActionBtn>
      </div>

      <Section>
        <SectionTitle><FaToggleOn /> Feature Toggles</SectionTitle>
        <SettingsGrid>
          {Object.entries({
            legalAI: ['Legal AI', 'Main chat assistant'],
            docAnalyzer: ['Document Analyzer', 'AI clause extraction'],
            strategyGenerator: ['Strategy Gen', 'Tactical advice generator'],
            mootCourt: ['Moot Court', 'Virtual trial practice'],
            outcomePredictor: ['Case Predictor', 'Success probability engine'],
            judicialSimulation: ['Simulation', 'Judicial perspective simulation']
          }).map(([key, [label, desc]]) => (
            <SettingItem key={key}>
              <div className="info">
                <span>{label}</span>
                <small>{desc}</small>
              </div>
              <Toggle active={settings.features[key]} onClick={() => handleToggle(key)}>
                {settings.features[key] ? <FaToggleOn /> : <FaToggleOff />}
              </Toggle>
            </SettingItem>
          ))}
        </SettingsGrid>
      </Section>

      <Section>
        <SectionTitle><FaFolderOpen /> Blog Categories</SectionTitle>
        <CategoryBox>
          {settings.categories.blog.map(cat => (
            <Tag key={cat}>{cat} <button onClick={() => handleRemoveCategory('blog', cat)}><FaTimes size={10} /></button></Tag>
          ))}
        </CategoryBox>
        <InputGroup>
          <input 
            placeholder="Add new blog category..." 
            value={newCat.blog} 
            onChange={(e) => setNewCat({...newCat, blog: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory('blog')}
          />
          <ActionBtn onClick={() => handleAddCategory('blog')}><FaPlus /> Add</ActionBtn>
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle><FaFolderOpen /> Case Library Categories</SectionTitle>
        <CategoryBox>
          {settings.categories.caseLibrary.map(cat => (
            <Tag key={cat}>{cat} <button onClick={() => handleRemoveCategory('library', cat)}><FaTimes size={10} /></button></Tag>
          ))}
        </CategoryBox>
        <InputGroup>
          <input 
            placeholder="Add new library category..." 
            value={newCat.library} 
            onChange={(e) => setNewCat({...newCat, library: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory('library')}
          />
          <ActionBtn onClick={() => handleAddCategory('library')}><FaPlus /> Add</ActionBtn>
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle><FaServer /> System Defaults</SectionTitle>
        <SettingsGrid>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Max Upload Size (MB)</label>
            <input 
              type="number" 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '12px', color: 'white' }}
              value={settings.systemDefaults.maxUploadSize}
              onChange={(e) => setSettings({...settings, systemDefaults: {...settings.systemDefaults, maxUploadSize: parseInt(e.target.value)}})}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Items Per Page (Admin Lists)</label>
            <input 
              type="number" 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '12px', color: 'white' }}
              value={settings.systemDefaults.itemsPerPage}
              onChange={(e) => setSettings({...settings, systemDefaults: {...settings.systemDefaults, itemsPerPage: parseInt(e.target.value)}})}
            />
          </div>
        </SettingsGrid>
      </Section>
    </Container>
  );
};

export default SettingsManagement;
