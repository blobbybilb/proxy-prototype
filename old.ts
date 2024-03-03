// Web Proxy, proxies all HTTP requests through this

import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts"
import { modifyTags } from "./helpers.ts"

async function reqHandler(req: Request): Promise<Response> {
  const reqPath = new URL(req.url).pathname

  const response = await fetch("https://" + reqPath, { headers: req.headers })

  const responseBody = await response.text()
  const modifiedResponseBody = performModifications(responseBody)

  const modifiedResponse = new Response(modifiedResponseBody, response)

  return modifiedResponse
}

function performModifications(text: string): string {
  return (
    modifyTags(new DOMParser().parseFromString(text, "text/html")!)
      .documentElement?.outerHTML ?? ""
  )
}

Deno.serve({
  handler: reqHandler,
  port: 8080,
})
