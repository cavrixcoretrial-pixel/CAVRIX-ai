import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Reset Password - Cavrix AI",
  description: "Set your new Cavrix AI password",
};

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return <AuthForm mode="reset-password" token={searchParams.token} />;
}
