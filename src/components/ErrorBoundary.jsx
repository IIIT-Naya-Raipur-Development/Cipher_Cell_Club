import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgb(10, 26, 51)',
          color: '#10b981',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '1.2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div>⚠️ Component Error</div>
            <div style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.7 }}>
              Fallback to static display
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;