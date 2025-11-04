'use client';

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      (window as any)?.flutter_inappwebview?.callHandler?.("crashDetection", {
        message: error?.message ?? "Unknown client error",
        digest: error?.digest,
      });

      console.log("Crash detected and notified Flutter bridge about the crash.");
    } catch (bridgeError) {
      console.warn(
        "Failed to notify Flutter bridge about the crash.",
        bridgeError,
      );
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          The page crashed. We have notified the host application so it can take
          action. You can try again using the button below.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-black px-6 py-3 text-white transition-colors hover:bg-zinc-800"
        >
          Try again
        </button>
        <code className="text-sm text-zinc-500 dark:text-zinc-400">
          Error: {error.message}
        </code>
      </body>
    </html>
  );
}
