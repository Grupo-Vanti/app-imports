import { appRoutes } from '#data/routes'
import { useLocation, Link } from 'wouter'
import { availableResources, showResourceNiceName } from '#data/resources'
import { List, ListItem, PageLayout } from '@commercelayer/core-app-elements'

export function ResourceSelectorPage(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Select type'
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <List>
        {availableResources.sort().map((resource) => (
          <Link key={resource} href={appRoutes.newImport.makePath(resource)}>
            <ListItem label={showResourceNiceName(resource)} />
          </Link>
        ))}
      </List>
    </PageLayout>
  )
}
