let currentPageURL

self.addEventListener("fetch", function (event) {
  const url = event.request.url

  let newReq

  console.log(3333, url, currentPageURL)

  if (url.includes("sw.js")) {
    const newReq = new Request("/sw.js")
    console.log(4444, newReq)
  } else if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    newReq = new Request("/" + url)
  } else if (url.startsWith("/")) {
    const currentHost = new URL(currentPageURL).origin
    newReq = new Request(currentHost + url)
  } else {
    const url2 = url.startsWith("/") ? url : "/" + url
    newReq = new Request(currentPageURL + url)
  }

  console.log(newReq)
  event.respondWith(fetch(newReq))
  event.preventDefault()
})

console.log(55555555555, newReq)

self.addEventListener("message", function (event) {
  currentPageURL = event.data
  console.log(6666, currentPageURL)
})
