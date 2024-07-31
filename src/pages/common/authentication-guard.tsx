import { withAuthenticationRequired } from '@auth0/auth0-react'
// import { LoadingSpinner } from './components/LoadingSpinner'
// import { StoresContext } from './stores/StoresContext'
// import { useSafeContext } from './stores/useSafeContext'

export const AuthenticationGuard = ({ component }: { component: Parameters<typeof withAuthenticationRequired>[0] }) => {
  // const { overlayStore } = useSafeContext(StoresContext)
  const Component = withAuthenticationRequired(component, {
    loginOptions: {
      appState: { targetUrl: window.location.pathname },
    },
    // onBeforeAuthentication: async () => overlayStore.setLoadingSpinner(true),
    // onRedirecting: () => <LoadingSpinner display={true} />,
  })

  return <Component />
}