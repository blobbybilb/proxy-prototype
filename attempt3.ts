import { Hono } from "https://deno.land/x/hono@v4.0.9/mod.ts"

const app = new Hono()

app.get("/fetch/*", async (c) => {
  const url = c.req.url.split("/fetch/")[1]
  return await fetch(new Request(url, c.req))
})

app.get("/", (c) => c.text("hello world"))

Deno.serve(app.fetch)
