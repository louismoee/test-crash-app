'use client';

export default function CrashPage() {
  if (typeof window !== "undefined") {
    throw new Error("Intentional client crash for monitoring validation.");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <h1 className="text-2xl font-semibold">
        Intentional client-side crash page
      </h1>
      <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        This page builds successfully, but as soon as the client bundle runs it
        throws an unhandled error. Open your browser console to see the stack
        trace, or test your monitoring to confirm the crash is captured.
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">
        Tip: run <code>npm run build</code> and <code>npm run start</code>, then
        visit <code>/crash</code> to reproduce the generic
        &ldquo;Application error&rdquo; screen.
      </p>
    </div>
  );
}
