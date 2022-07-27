import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

type ImportInputs = ImportCreate["inputs"]

export const adapters: Record<AllowedResourceType, (csvSchema: ZodSchema[]) => ImportInputs> = {
  skus: (...args) => fromCsvSchemaToImportInputs(...args),
  sku_lists: (...args) => fromCsvSchemaToImportInputs(...args),
  prices: (...args) => fromCsvSchemaToImportInputs(...args),
  coupons: (...args) => fromCsvSchemaToImportInputs(...args),
  gift_cards: (...args) => fromCsvSchemaToImportInputs(...args),
  customers: (...args) => fromCsvSchemaToImportInputs(...args),
  customer_subscriptions: (...args) => fromCsvSchemaToImportInputs(...args),
  tax_categories: (...args) => fromCsvSchemaToImportInputs(...args),
  stock_items: (...args) => fromCsvSchemaToImportInputs(...args),
}

const fromCsvSchemaToImportInputs = (csvSchema: ZodSchema[]): ImportInputs => csvSchema
