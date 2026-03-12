import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import styled from 'styled-components';
import AnnouncementBanner from '../Dashboard/AnnouncementBanner';
import { FaChevronDown, FaChevronRight, FaGauge, FaUsers, FaUserCheck, FaPenNib, FaFileLines, FaBullhorn, FaRobot, FaGear, FaHeadset, FaRightFromBracket } from 'react-icons/fa6';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-dark);
  color: var(--text-main);
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: var(--bg-panel);
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid var(--border);
  box-shadow: 10px 0 30px rgba(0,0,0,0.1);
  z-index: 100;

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '280px' : '0'};
    position: fixed;
    height: 100vh;
  }
`;

const SidebarHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid var(--border);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--primary);
  background: rgba(255,255,255,0.02);
`;

const NavList = styled.nav`
  padding: 1.25rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
`;

const NavGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  justify-content: space-between;

  &:hover {
    color: var(--text-main);
    background: rgba(255,255,255,0.03);
  }

  .title-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const GroupContent = styled.div`
  margin-top: 0.25rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? 'var(--text-main)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'linear-gradient(90deg, var(--primary) 0%, #a066ff 100%)' : 'transparent'};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &:hover {
    color: var(--text-main);
    background: ${props => props.active ? '' : 'rgba(255,255,255,0.05)'};
    padding-left: ${props => props.active ? '' : '1.25rem'};
  }

  .icon {
    margin-right: 12px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }

  .badge {
    background: #ff4757;
    color: white;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 20px;
    margin-left: auto;
  }
`;

const SidebarFooter = styled.div`
  padding: 1.25rem;
  border-top: 1px solid var(--border);
`;

const LogoutButton = styled.button`
  width: 100%;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 600;

  &:hover {
    background: #ef4444;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

const SidebarSection = ({ title, icon, children, pathPrefix, location }) => {
  const isInside = location.pathname.startsWith(pathPrefix);
  const [isOpen, setIsOpen] = useState(isInside);

  return (
    <NavGroup>
      <GroupHeader onClick={() => setIsOpen(!isOpen)}>
        <div className="title-wrap">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
      </GroupHeader>
      {isOpen && <GroupContent>{children}</GroupContent>}
    </NavGroup>
  );
};

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const Topbar = styled.header`
  background-color: var(--bg-panel);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid var(--border);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  color: var(--text-main);

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-main);
`;

const ContentArea = styled.main`
  padding: 2.5rem;
  flex: 1;
  overflow-y: auto;
  background: radial-gradient(circle at 50% 50%, rgba(108, 93, 211, 0.03) 0%, transparent 100%);
`;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingLawyers, setPendingLawyers] = useState(0);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPendingLawyers = async () => {
      try {
        const res = await api.get('/api/admin/pending-lawyers');
        if (res.data.status === 'success') {
          setPendingLawyers(res.data.data.lawyers.length);
        }
      } catch (error) {
        console.error("Failed to fetch pending lawyers for layout", error);
      }
    };
    fetchPendingLawyers();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>LAWYER.AI ADMIN</SidebarHeader>
        <NavList>
          <NavItem to="/admin" active={isActive('/admin') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
            <span className="icon"><FaGauge /></span>
            Dashboard
          </NavItem>

          <SidebarSection title="User Management" icon={<FaUsers />} pathPrefix="/admin/user" location={location}>
            <NavItem to="/admin/users" active={isActive('/admin/users') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaUsers size={14} /></span>
              Users
            </NavItem>
            <NavItem to="/admin/lawyers" active={isActive('/admin/lawyers') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaUserCheck size={14} /></span>
              Lawyer Verification
              {pendingLawyers > 0 && <span className="badge">{pendingLawyers}</span>}
            </NavItem>
          </SidebarSection>

          <SidebarSection title="Content" icon={<FaFileLines />} pathPrefix="/admin/c" location={location}>
            <NavItem to="/admin/blogs" active={isActive('/admin/blogs') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaPenNib size={14} /></span>
              Blogs
            </NavItem>
            <NavItem to="/admin/cases" active={isActive('/admin/cases') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaFileLines size={14} /></span>
              Case Library
            </NavItem>
            <NavItem to="/admin/announcements" active={isActive('/admin/announcements') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaBullhorn size={14} /></span>
              Announcements
            </NavItem>
          </SidebarSection>

          <SidebarSection title="AI Monitoring" icon={<FaRobot />} pathPrefix="/admin/ai-monitoring" location={location}>
            <NavItem to="/admin/ai-monitoring" active={isActive('/admin/ai-monitoring') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaRobot size={14} /></span>
              AI Usage Monitoring
            </NavItem>
          </SidebarSection>

          <SidebarSection title="Platform" icon={<FaGear />} pathPrefix="/admin/settings" location={location}>
            <NavItem to="/admin/settings" active={isActive('/admin/settings') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaGear size={14} /></span>
              Platform Settings
            </NavItem>
          </SidebarSection>

          <SidebarSection title="Support" icon={<FaHeadset />} pathPrefix="/admin/contacts" location={location}>
            <NavItem to="/admin/contacts" active={isActive('/admin/contacts') ? 1 : 0} onClick={() => setSidebarOpen(false)}>
              <span className="icon"><FaHeadset size={14} /></span>
              Support & Reports
            </NavItem>
          </SidebarSection>
        </NavList>

        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>
            <FaRightFromBracket /> Logout
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <AnnouncementBanner />
        <Topbar>
          <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>☰</MenuButton>
          <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Admin Portal</h3>
          <UserMenu>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{user?.name || 'Admin'}</span>
          </UserMenu>
        </Topbar>
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
