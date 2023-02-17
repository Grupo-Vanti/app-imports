import { ErrorBoundary, InputJson } from '@commercelayer/core-app-elements'
import { ImportCreate } from '@commercelayer/sdk'
import { useState } from 'react'

type ImportJsonData = ImportCreate['inputs']

interface Props {
  onDataReady: (jsonInput: ImportJsonData) => void
  onDataResetRequest: () => void
}

export function InputCode({
  onDataReady,
  onDataResetRequest
}: Props): JSX.Element {
  const [renderKey, setRenderKey] = useState<number | undefined>(undefined)

  return (
    <ErrorBoundary
      errorDescription='We could not parse your input. Please try again.'
      onRetry={() => {
        setRenderKey(new Date().getTime())
      }}
      key={renderKey}
    >
      <InputJson<ImportJsonData>
        placeholder={placehoder}
        onDataReady={(validInput) => onDataReady(validInput)}
        onDataResetRequest={onDataResetRequest}
        validateFn={(maybeJson) => maybeJson.inputs}
      />
    </ErrorBoundary>
  )
}

const placehoder = {
  inputs: [
    {
      code: 'ABC',
      name: 'Foo'
    }
  ]
}