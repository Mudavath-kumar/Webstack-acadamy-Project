import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { otpAPI } from '../services/api';
import toast from 'react-hot-toast';

const OTPVerificationModal = ({ isOpen, onClose, bookingId, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [otpData, setOtpData] = useState(null);

  useEffect(() => {
    if (isOpen && bookingId) {
      generateOTP();
    }
  }, [isOpen, bookingId]);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const generateOTP = async () => {
    try {
      const response = await otpAPI.generate({
        bookingId,
        purpose: 'booking_confirmation',
      });

      if (response.data.success) {
        setOtpData(response.data.data);
        setTimeLeft(600);
        
        // In development, show OTP in console
        if (response.data.data.otp) {
          console.log('🔐 OTP for testing:', response.data.data.otp);
          toast.success(`OTP for testing: ${response.data.data.otp}`, { duration: 10000 });
        } else {
          toast.success('OTP sent successfully! Check your email/SMS.');
        }
      }
    } catch (error) {
      console.error('OTP generation error:', error);
      toast.error('Failed to generate OTP. Please try again.');
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOTP = [...otp];
    newOTP[index] = value.slice(-1); // Take only last digit
    setOtp(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOTP = pastedData.split('');
    setOtp([...newOTP, ...Array(6 - newOTP.length).fill('')]);
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await otpAPI.verify({
        bookingId,
        otp: otpCode,
      });

      if (response.data.success) {
        toast.success('Booking confirmed successfully! 🎉');
        onVerificationSuccess(response.data.data.booking);
        onClose();
      }
    } catch (error) {
      const attemptsRemaining = error.response?.data?.attemptsLeft;
      if (attemptsRemaining !== undefined) {
        setAttemptsLeft(attemptsRemaining);
      }
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']); // Clear OTP
      document.getElementById('otp-0')?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await generateOTP();
      setOtp(['', '', '', '', '', '']);
      setAttemptsLeft(3);
      document.getElementById('otp-0')?.focus();
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: 'var(--spacing-lg)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-2xl)',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--spacing-lg)',
              right: 'var(--spacing-lg)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--spacing-lg)',
              }}
            >
              <Lock size={40} color="white" />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
              }}
            >
              Verify Your Booking
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Enter the 6-digit OTP sent to your email/phone
            </p>
          </div>

          {/* OTP Input */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-xl)',
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                style={{
                  width: '60px',
                  height: '60px',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-secondary)',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 56, 92, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ))}
          </div>

          {/* Timer and Attempts */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} color={timeLeft < 60 ? '#EF4444' : 'var(--text-secondary)'} />
              <span style={{ color: timeLeft < 60 ? '#EF4444' : 'var(--text-secondary)' }}>
                Time left: {formatTime(timeLeft)}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>
                Attempts: {attemptsLeft}/3
              </span>
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying || otp.join('').length !== 6}
            className="btn-gradient"
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isVerifying || otp.join('').length !== 6 ? 0.6 : 1,
              cursor: isVerifying || otp.join('').length !== 6 ? 'not-allowed' : 'pointer',
            }}
          >
            {isVerifying ? (
              <>
                <RefreshCw size={20} className="spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Verify OTP
              </>
            )}
          </button>

          {/* Resend OTP */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>
              Didn't receive the code?
            </span>
            <button
              onClick={handleResend}
              disabled={isResending || timeLeft > 540} // Can resend after 1 minute
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: isResending || timeLeft > 540 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                opacity: isResending || timeLeft > 540 ? 0.5 : 1,
              }}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>

          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .spin {
                animation: spin 1s linear infinite;
              }
            `}
          </style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OTPVerificationModal;
