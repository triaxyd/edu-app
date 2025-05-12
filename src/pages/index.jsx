// src/pages/index.jsx
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/AuthCard';
import SignInLogo from '@/components/Header/SignInLogo';
import TextInput from '@/components/Input/TextInput';
import SignInButton from '@/components/Button/SignInButton';
import LinkText from '@/components/Text/LinkText';
import { useState } from 'react';
import { useAuth } from '@/context/authContext';

export default function LoginPage() {
    const { login } = useAuth();

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (!success) {
            setError('Invalid credentials—please try again.');
        }
    };
    return (
        <AuthLayout>
            <AuthCard
                illustration="/illustrations/sign-in-illustration.svg"
                header={<SignInLogo />}
                form={
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <p style={{ color: 'red', textAlign: 'center', marginBottom: 12 }}>
                                {error}
                            </p>
                        )}

                        <TextInput
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <SignInButton type="submit">Sign In</SignInButton>
                        <LinkText
                            preText="Don’t have an account?"
                            linkText="Sign Up"
                            href="/register"
                        />
                    </form>
                }
            />
        </AuthLayout>
    );
}
