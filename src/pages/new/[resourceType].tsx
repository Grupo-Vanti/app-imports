import CommerceLayer, { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { ImportPreviewTable } from "#components/ImportPreviewTable"
import { Input } from "#components/Input"
import { useSettings } from "#components/SettingsProvider"
import { isAvailableResource } from "#data/resources"
import { appRoutes } from "#data/routes"

const NewImportPage: NextPage = () => {
  const {
    settings: { organization, accessToken },
  } = useSettings()
  const { query, push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords, setCleanupRecords] = useState(false)
  const [parentResourceId, setParentResourceId] = useState<string | undefined>()
  const [importCreateValue, setImportCreateValue] = useState<ImportCreate["inputs"] | undefined>(undefined)

  const resourceType = query.resourceType as AllowedResourceType

  if (!organization || !accessToken) {
    return null
  }

  if (!isAvailableResource(resourceType)) {
    return <div>404 - resource type non allowed or not enabled</div>
  }

  const cl = CommerceLayer({
    organization,
    accessToken,
  })

  const createImport = async () => {
    if (!importCreateValue) {
      return
    }

    setIsLoading(true)
    try {
      await cl.imports.create({
        resource_type: resourceType,
        cleanup_records: cleanupRecords,
        parent_resource_id: parentResourceId,
        inputs: importCreateValue,
      })
      push(appRoutes.list())
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="container px-3 py-4">
        <h1 className="text-xl pb-2 font-bold">New upload {resourceType}</h1>
        <Input
          resourceType={resourceType}
          onDataReady={setImportCreateValue}
          onDataResetRequest={() => setImportCreateValue(undefined)}
        />

        {importCreateValue && importCreateValue.length > 0 ? (
          <div>
            <ImportPreviewTable rows={importCreateValue as []} />
            <button className="btn" onClick={createImport} disabled={isLoading}>
              {isLoading ? "Loading..." : "Create import task"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NewImportPage
