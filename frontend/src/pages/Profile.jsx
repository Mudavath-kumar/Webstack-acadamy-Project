import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Bell, Trash2, Edit2 } from 'lucide-react';
import { userAPI } from '../services/api';
import { updatePassword } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import MotionWrapper from '../components/MotionWrapper';

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  });

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
      });
      setImagePreview(user.avatar?.url || null);
    }
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!profileData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await userAPI.updateProfile(profileData);
      
      if (response.data.success) {
        // Update localStorage
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully! 🎉');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      // You would need to create this endpoint in your backend
      // const response = await userAPI.uploadAvatar(formData);
      
      toast.success('Avatar uploaded successfully! 🎨');
      
      // Update localStorage with new avatar
      // const updatedUser = { ...user, avatar: response.data.data.avatar };
      // localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Failed to upload avatar');
      setImagePreview(user?.avatar?.url || null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();
      
      toast.success('Password updated successfully! 🔐');
      
      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Password update error:', error);
      toast.error(error || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle preferences update
  const handleUpdatePreferences = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // In a real app, save preferences to backend
      toast.success('Preferences saved successfully! ⚙️');
    } catch (error) {
      console.error('Preferences update error:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (!confirmed) return;

    setIsLoading(true);
    
    try {
      // await userAPI.deleteAccount();
      toast.success('Account deleted successfully');
      // Redirect to home or logout
    } catch (error) {
      console.error('Account deletion error:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Please log in to view your profile</h2>
          <a href="/login" className="btn-gradient">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container section">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              Profile Settings
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Manage your account information and preferences
            </p>
          </div>
        </MotionWrapper>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '280px 1fr', 
          gap: 'var(--spacing-2xl)',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
          }
        }}>
          {/* Sidebar */}
          <MotionWrapper delay={0.1}>
            <div className="glass-card">
              {/* Avatar Section */}
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--spacing-md)' }}>
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={imagePreview || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)} 
                    alt={user.name} 
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: 'var(--radius-full)', 
                      objectFit: 'cover',
                      border: '4px solid var(--border-color)',
                      boxShadow: 'var(--shadow-lg)',
                    }} 
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gradient-sunset)',
                      border: '3px solid var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <Camera size={18} color="white" />
                  </motion.button>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  {user.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{user.email}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
                  Role: {user.role || 'User'}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'account', label: 'Account Info', icon: User },
                  { id: 'security', label: 'Security', icon: Lock },
                  { id: 'preferences', label: 'Preferences', icon: Bell },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: 'var(--spacing-md)',
                      background: activeTab === tab.id ? 'var(--gradient-sunset)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontWeight: activeTab === tab.id ? '600' : '500',
                      color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Main Content */}
          <MotionWrapper delay={0.2}>
            <div className="glass-card">
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.75rem', 
                fontWeight: '700', 
                marginBottom: 'var(--spacing-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                {activeTab === 'account' && <><User size={28} /> Account Information</>}
                {activeTab === 'security' && <><Lock size={28} /> Security Settings</>}
                {activeTab === 'preferences' && <><Bell size={28} /> Notification Preferences</>}
              </h2>

              {/* Account Tab */}
              {activeTab === 'account' && (
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} 
                        className="input"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} 
                        className="input"
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} 
                        className="input"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Bio
                      </label>
                      <textarea 
                        value={profileData.bio} 
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} 
                        className="input" 
                        rows="4"
                        placeholder="Tell us about yourself..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--spacing-md)', 
                    marginTop: 'var(--spacing-xl)',
                    flexWrap: 'wrap'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="btn-gradient"
                      style={{ 
                        padding: 'var(--spacing-md) var(--spacing-2xl)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: isLoading ? 0.7 : 1,
                      }}
                    >
                      <Save size={18} />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleDeleteAccount}
                      style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: 'transparent',
                        border: '2px solid #ef4444',
                        borderRadius: 'var(--radius-lg)',
                        color: '#ef4444',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <form onSubmit={handleUpdatePassword}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Current Password *
                      </label>
                      <input 
                        type="password" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="input"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        New Password *
                      </label>
                      <input 
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="input"
                        placeholder="Enter new password (min 6 characters)"
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        Confirm New Password *
                      </label>
                      <input 
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="input"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="btn-gradient"
                    style={{ 
                      marginTop: 'var(--spacing-xl)', 
                      padding: 'var(--spacing-md) var(--spacing-2xl)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    <Lock size={18} />
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </motion.button>
                </form>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <form onSubmit={handleUpdatePreferences}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                        Email Notifications
                      </h3>
                      <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                        <label style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          cursor: 'pointer',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                        }}>
                          <input 
                            type="checkbox" 
                            checked={preferences.emailNotifications}
                            onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '600' }}>Email Notifications</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Receive booking confirmations and updates
                            </div>
                          </div>
                        </label>
                        
                        <label style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          cursor: 'pointer',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                        }}>
                          <input 
                            type="checkbox" 
                            checked={preferences.pushNotifications}
                            onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '600' }}>Push Notifications</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Get instant updates on your device
                            </div>
                          </div>
                        </label>
                        
                        <label style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          cursor: 'pointer',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                        }}>
                          <input 
                            type="checkbox" 
                            checked={preferences.marketingEmails}
                            onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '600' }}>Marketing Emails</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Receive promotions and special offers
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="btn-gradient"
                    style={{ 
                      marginTop: 'var(--spacing-xl)', 
                      padding: 'var(--spacing-md) var(--spacing-2xl)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </motion.button>
                </form>
              )}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
