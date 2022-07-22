import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

import { csvCouponsSchema } from "./coupon"
import { csvPricesSchema } from "./prices"
import { csvSkuListSchema } from "./skuLists"
import { csvSkusSchema } from "./skus"

export const parsers: Record<AllowedResourceType, ZodSchema> = {
  skus: csvSkusSchema,
  prices: csvPricesSchema,
  coupons: csvCouponsSchema,
  sku_lists: csvSkuListSchema,
}
