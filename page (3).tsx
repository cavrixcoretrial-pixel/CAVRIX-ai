import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign Up - Cavrix AI",
  description: "Create your Cavrix AI account",
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
