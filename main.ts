async function reqHandler(req: Request): Promise<Response> {
  const reqPath =
    new URL(req.url).pathname.substring(1) + new URL(req.url).search

  if (reqPath === "") {
    const index = await Deno.readTextFile("test.html")
    return new Response(index, {
      headers: {
        "Content-Type": "text/html",
      },
    })
  }

  if (reqPath === "sw.js") {
    const sw = await Deno.readTextFile("sw.js")
    return new Response(sw, {
      headers: {
        "Content-Type": "application/javascript",
      },
    })
  }

  const response = await fetch(new Request(reqPath, req))
  const responseBody = await response.text()
  if (response.headers.get("Content-Type")?.includes("text/html")) {
    const modifiedResponseBody =
      responseBody +
      `<script>
      navigator.serviceWorker.getRegistrations().then(r => r.active.postMessage("reload"))
        </script>`
    return new Response(modifiedResponseBody, response)
  }

  return new Response(responseBody, response)
}

Deno.serve({
  handler: reqHandler,
  port: 8080,
})
