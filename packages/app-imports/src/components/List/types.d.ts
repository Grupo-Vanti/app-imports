import { Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'

declare module 'App' {
  export interface ListImportContextValue {
    state: ListImportContextState
    changePage: (page: number) => void
    deleteImport: (importId: string) => void
  }

  export interface ListImportContextState {
    list?: ListResponse<Import>
    isLoading: boolean
    isPolling: boolean
    currentPage: number
  }
}