import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import AnimatedButton from '../ui/AnimatedButton';
import AnimatedModal from '../ui/AnimatedModal';

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

interface AccountSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountSettings({ isOpen, onClose }: AccountSettingsProps) {
  const { user, isAnonymous, signInWithGoogle, linkWithGoogle, linkWithEmail, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleGoogleSignIn = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkGoogle = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      await linkWithGoogle();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to link Google account');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await linkWithEmail(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      await signOut();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose} size="md" className="bg-dark-gray border-border/70">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Account</h2>
            {user && (
            <p className="text-text/60 mt-1">
              {isAnonymous ? 'Guest Account' : user.email ?? 'Signed in'}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-danger/70 bg-danger/15 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {!isAnonymous && (
          <motion.div variants={cardVariants} initial="initial" animate="animate" className="space-y-4">
            <div className="p-4 rounded-lg border border-success/30 bg-success/10">
              <p className="text-success text-sm">Your account is linked and secure</p>
            </div>
            <AnimatedButton
              variant="outline"
              size="md"
              onClick={() => { void handleSignOut(); }}
              disabled={loading}
              className="w-full"
            >
              Sign Out
            </AnimatedButton>
          </motion.div>
        )}

        {isAnonymous && !showEmailForm && (
          <motion.div variants={cardVariants} initial="initial" animate="animate" className="space-y-4">
            <p className="text-text/70 text-center">
              Create an account to save your order history and access from multiple devices.
            </p>
            <AnimatedButton
              variant="default"
              size="md"
              onClick={() => { void handleGoogleSignIn(); }}
              disabled={loading}
              className="w-full"
            >
              <span className="material-icons md-18 mr-2">public</span>
              Continue with Google
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="md"
              onClick={() => { setShowEmailForm(true); }}
              disabled={loading}
              className="w-full"
            >
              <span className="material-icons md-18 mr-2">email</span>
              Create Account with Email
            </AnimatedButton>
          </motion.div>
        )}

        {isAnonymous && showEmailForm && (
          <motion.div variants={cardVariants} initial="initial" animate="animate" className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
                className="w-full px-3 py-2 bg-bg border border-border rounded-none focus:outline-none focus:border-primary text-text"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                className="w-full px-3 py-2 bg-bg border border-border rounded-none focus:outline-none focus:border-primary text-text"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); }}
                className="w-full px-3 py-2 bg-bg border border-border rounded-none focus:outline-none focus:border-primary text-text"
                placeholder="Confirm your password"
              />
            </div>
            <div className="flex space-x-3">
              <AnimatedButton
                variant="outline"
                size="md"
                onClick={() => { setShowEmailForm(false); }}
                disabled={loading}
                className="flex-1"
              >
                Back
              </AnimatedButton>
              <AnimatedButton
                variant="default"
                size="md"
                onClick={() => { void handleEmailSignUp(); }}
                disabled={loading || !email || !password || !confirmPassword}
                className="flex-1"
              >
                Create Account
              </AnimatedButton>
            </div>
          </motion.div>
        )}

        {isAnonymous && (
          <motion.div variants={cardVariants} initial="initial" animate="animate">
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={() => { void handleLinkGoogle(); }}
              disabled={loading}
              className="w-full text-text/60 hover:text-text"
            >
              Already have a Google account? Link it
            </AnimatedButton>
          </motion.div>
        )}
      </div>
    </AnimatedModal>
  );
}
