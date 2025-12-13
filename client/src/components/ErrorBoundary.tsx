import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error.message);
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center border border-amber-500/20">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
            
            <h1 className="text-2xl font-light text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-white/60 mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Try Again
              </Button>
              <Button
                onClick={this.handleReload}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
