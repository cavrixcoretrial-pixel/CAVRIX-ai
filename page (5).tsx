import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Forgot Password - Cavrix AI",
  description: "Reset your Cavrix AI password",
};

export default function ForgotPasswordPage() {
  return <AuthForm mode="forgot-password" />;
}
