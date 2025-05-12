// src/pages/index.jsx
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '@/components/AuthCard';
import SignInLogo from '@/components/Header/SignInLogo';
import TextInput from '@/components/Input/TextInput';
import SignInButton from '@/components/Button/SignInButton';
import LinkText from '@/components/Text/LinkText';

export default function LoginPage() {
    return (
        <AuthLayout>
            <AuthCard
                illustration="/illustrations/sign-in-illustration.svg"
                header={<SignInLogo />}
                form={
                    <>
                        <TextInput
                            label="Email"
                            name="email"
                            placeholder="Enter your username"
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <SignInButton>Sign In</SignInButton>
                        <LinkText
                            preText="Don’t have an account?"
                            linkText="Sign Up"
                            href="/register"
                        />
                    </>
                }
            />
        </AuthLayout>
    );
}
