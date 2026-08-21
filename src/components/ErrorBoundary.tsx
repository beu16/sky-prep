import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Shield, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SkyPrep Application Caught Render Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleClearCacheAndReset = () => {
    try {
      sessionStorage.clear();
    } catch (_) {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl mx-auto flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#F2B134]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                SkyPrep Safety Recovery
              </h2>
              <p className="text-xs text-slate-300">
                A temporary rendering glitch occurred. Your candidate profile and progress data remain safely saved.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-left">
                <p className="text-[11px] font-mono text-amber-300 break-words line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full bg-[#2E86FF] hover:bg-blue-600 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleClearCacheAndReset}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs py-3 px-4 rounded-xl transition-all"
              >
                Reset Session Cache & Return
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
