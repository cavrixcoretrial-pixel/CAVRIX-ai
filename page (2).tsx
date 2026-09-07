import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Login - Cavrix AI",
  description: "Sign in to your Cavrix AI account",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
