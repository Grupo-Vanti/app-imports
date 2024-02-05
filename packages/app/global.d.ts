export {}

declare global {
  interface Window {
    clAppConfig: {
      /**
       * Specific domain to use for Commerce Layer API requests.
       * It must be set as `commercelayer.io`.
       */
      domain: string
      /**
       * Disable client-side schema validation on CSV files.
       * When this is `true` any csv will be accepted delegating errors on invalid record to the API.
       */
      skipSchemaValidation?: boolean
      /**
       * Enable Google Tag Manager for the provided GTM ID.
       */
      gtmId?: string
    }
  }
}