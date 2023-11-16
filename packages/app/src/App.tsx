import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import { Router, Route, Switch } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'
import { ResourceSelectorPage } from './pages/ResourceSelectorPage'
import {
  MetaTags,
  ErrorBoundary,
  TokenProvider,
  PageSkeleton,
  CoreSdkProvider,
  GTMProvider
} from '@commercelayer/app-elements'

const isDev = Boolean(import.meta.env.DEV)

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <ErrorBoundary hasContainer>
      <TokenProvider
        appSlug='imports'
        kind='imports'
        domain={window.clAppConfig.domain}
        reauthenticateOnInvalidAuth={!isDev}
        loadingElement={<PageSkeleton />}
        devMode={isDev}
        organizationSlug={import.meta.env.PUBLIC_SELF_HOSTED_SLUG}
      >
        <GTMProvider gtmId={window.clAppConfig.gtmId}>
          <MetaTags />
          <CoreSdkProvider>
            <Router base={basePath}>
              <Switch>
                <Route path={appRoutes.list.path}>
                  <ListPage />
                </Route>
                <Route path={appRoutes.selectResource.path}>
                  <ResourceSelectorPage />
                </Route>
                <Route path={appRoutes.newImport.path}>
                  <NewImportPage />
                </Route>
                <Route path={appRoutes.details.path}>
                  <DetailsPage />
                </Route>
                <Route>
                  <ErrorNotFound />
                </Route>
              </Switch>
            </Router>
          </CoreSdkProvider>
        </GTMProvider>
      </TokenProvider>
    </ErrorBoundary>
  )
}

export default App
