import { Component, PropsWithChildren } from 'react'

export class ErrorBoundary extends Component<PropsWithChildren<{ fallback: any }>, { hasError: boolean }> {
  constructor(props: PropsWithChildren<{ fallback: any }>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error | any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children
  }
}