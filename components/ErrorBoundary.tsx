import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: unknown, info?: React.ErrorInfo) => void;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div>Ui da, có lỗi client rồi 🙃</div>
        )
      );
    }

    return this.props.children;
  }
}
