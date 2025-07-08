
//   import { redirect } from 'next/navigation';
import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <SignupForm />
    </main>
  );
}
