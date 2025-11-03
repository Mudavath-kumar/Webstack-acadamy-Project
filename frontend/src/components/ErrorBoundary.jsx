import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Log to console; in production you might send this to a logging service
		// eslint-disable-next-line no-console
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			const hint = typeof this.state.error?.message === 'string' && this.state.error.message.includes('chrome-extension://invalid')
				? 'A browser extension may be interfering (you may see chrome-extension://invalid in the console). Try disabling extensions or using an Incognito window without extensions.'
				: 'Please check the console for details. If the issue persists, try a hard refresh (Ctrl+F5) or clear cache.';

			return (
				<div style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '2rem',
					background: 'var(--bg-secondary, #0b0b0c)'
				}}>
					<div style={{
						maxWidth: 720,
						width: '100%',
						background: 'var(--glass-bg, rgba(255,255,255,0.04))',
						border: '1px solid var(--border-color, rgba(255,255,255,0.12))',
						borderRadius: 16,
						padding: '2rem'
					}}>
						<h1 style={{ marginTop: 0 }}>Something went wrong</h1>
						<p style={{ opacity: 0.8 }}>{hint}</p>
						<pre style={{
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							background: 'rgba(255,255,255,0.06)',
							padding: '1rem',
							borderRadius: 8,
							fontSize: 12,
							overflow: 'auto'
						}}>{String(this.state.error)}</pre>
						<button onClick={this.handleReload} style={{
							marginTop: '1rem',
							background: '#6366f1',
							color: '#fff',
							border: 'none',
							padding: '0.75rem 1rem',
							borderRadius: 10,
							cursor: 'pointer'
						}}>
							Reload
						</button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

