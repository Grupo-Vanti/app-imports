import { appRoutes } from '#data/routes'
import { PageLayout, EmptyState, Button } from '@commercelayer/app-elements'
import { Link, useLocation } from 'wouter'

export function ErrorNotFound(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Importaciones'
      navigationButton={{
        label: 'Back',
        icon: 'arrowLeft',
        onClick: () => {
          setLocation(appRoutes.list.makePath())
        }
      }}
    >
      <EmptyState
        title='Not found'
        description='We could not find the resource you are looking for.'
        action={
          <Link href={appRoutes.list.makePath()}>
            <Button variant='primary'>Go back</Button>
          </Link>
        }
      />
    </PageLayout>
  )
}
