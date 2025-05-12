'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/AuthCard';
import SignUpLogo from '@/components/Header/SignUpLogo';
import TextInput from '@/components/Input/TextInput';
import SignInButton from '@/components/Button/SignInButton';
import LinkText from '@/components/Text/LinkText';
import Link from "next/link";

export default function RegisterPage() {
    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(email, password);
        if (!success) {
            setError('Registration failed—please try again.');
        }
    };

    return (
        <AuthLayout style={{ backgroundColor: '#BFC8D6' }}>
            <AuthCard
                illustration="/illustrations/sign-up-illustration.svg"
                header={<SignUpLogo />}
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
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <SignInButton
                            type="submit"
                            style={{
                            // new outline color for “Sign Up”
                            background: '#4F48ED'         // new text color
                        }}>Sign Up</SignInButton>

                        <p
                            style={{
                                fontFamily: 'Source Serif Pro, serif',
                                color: '#110F36',
                                fontSize: '0.875rem',
                                textAlign: 'center',
                                marginTop: '16px',
                            }}
                        >
                            Already have an account?
                            <Link
                                href="/"
                                style={{
                                    color: '#E6AC1B',
                                    marginLeft: '4px'
                                }}
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                }
            />
        </AuthLayout>
    );
}
