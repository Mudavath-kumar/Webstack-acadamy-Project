import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Travel enthusiast and adventure seeker. Love exploring new places and meeting people from different cultures.',
    joinDate: 'January 2023',
    avatar: 'https://i.pravatar.cc/150?img=8',
  });

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: 'var(--spacing-2xl)' }}>
            Profile Settings
          </h1>
        </MotionWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--spacing-2xl)' }}>
          {/* Sidebar */}
          <MotionWrapper delay={0.1}>
            <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--spacing-md)' }}>
                  <img src={profile.avatar} alt={profile.name} style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary)',
                      border: '2px solid var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={16} color="white" />
                  </motion.button>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{profile.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Member since {profile.joinDate}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['account', 'security', 'preferences'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: 'var(--spacing-md)',
                      background: activeTab === tab ? 'var(--bg-secondary)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontWeight: activeTab === tab ? '600' : '400',
                      color: activeTab === tab ? 'var(--primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Main Content */}
          <MotionWrapper delay={0.2}>
            <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-xl)', textTransform: 'capitalize' }}>
                {activeTab} Information
              </h2>

              {activeTab === 'account' && (
                <form>
                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Full Name</label>
                      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
                      <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Phone</label>
                      <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Location</label>
                      <input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Bio</label>
                      <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="input" rows="4" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-gradient"
                    style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md) var(--spacing-2xl)' }}
                  >
                    Save Changes
                  </motion.button>
                </form>
              )}

              {activeTab === 'security' && (
                <form>
                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Current Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>New Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Confirm New Password</label>
                      <input type="password" className="input" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-gradient"
                    style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md) var(--spacing-2xl)' }}
                  >
                    Update Password
                  </motion.button>
                </form>
              )}

              {activeTab === 'preferences' && (
                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications</span>
                    </label>
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      <span>Push notifications</span>
                    </label>
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span>Marketing emails</span>
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gradient"
                    style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md) var(--spacing-2xl)' }}
                  >
                    Save Preferences
                  </motion.button>
                </div>
              )}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
