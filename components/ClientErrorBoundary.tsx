'use client';

import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

type Props = {
  children: React.ReactNode;
};

const fallback = (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
    <h1 className="text-2xl font-semibold">Ui da, có lỗi client rồi 🙃</h1>
    <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
      Đã phát hiện lỗi client. Ứng dụng host sẽ được thông báo để xử lý.
    </p>
  </div>
);

function notifyFlutter(error: unknown) {
  if (typeof window === "undefined") return;

  const payload =
    error instanceof Error
      ? { message: error.message, stack: error.stack }
      : { message: String(error) };

  try {
    (window as any)?.flutter_inappwebview?.callHandler?.(
      "crashDetection",
      payload,
    );
  } catch (bridgeError) {
    console.warn("Failed to notify Flutter bridge about the crash.", {
      bridgeError,
      originalError: error,
    });
  }
}

export function ClientErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      onError={(error, info) => {
        notifyFlutter(error);
        if (info) {
          console.error("Error boundary caught error:", error, info);
        }
      }}
      fallback={fallback}
    >
      {children}
    </ErrorBoundary>
  );
}
