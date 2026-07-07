import type { ReactElement } from "react";

import { SignupForm } from "@/components/ui/organisms/signup-form";

type SignupPageProps = {
  searchParams: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps): Promise<ReactElement> {
  const query = await searchParams;
  const status = query.status;
  const message = query.message;
  const isError = status === "error";
  const isSuccess = status === "success";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold">Sign up</h1>

      <SignupForm />

      {isError && message ? <p className="mt-4 text-sm text-red-500">{message}</p> : null}
      {isSuccess && message ? <p className="mt-4 text-sm text-green-500">{message}</p> : null}
    </main>
  );
}
