let lastFetchURL

const channel = new BroadcastChannel("sw-location-updates")

self.addEventListener("fetch", function (event) {
  const url = event.request.url
  console.log("SW: event.request.url:", url)

  if (event.request.mode === "navigate") {
    if (url.includes("test.html")) return
    console.log("SW: event.request.mode === navigate")
    event.respondWith(fetch("/test2.html"))
    event.preventDefault()
    channel.postMessage(url)
    console.log("posted message")
    // event.preventDefault()
  }

  //   let newReq

  //   if (
  //     url.startsWith("http://") ||
  //     url.startsWith("https://") ||
  //     url.startsWith("//")
  //   ) {
  //     console.log("SW: URL starts with http:// or https:// or //")
  //     newReq = new Request("/" + url)
  //   } else if (url.startsWith("/")) {
  //     console.log("SW: URL starts with /")
  //     const currentHost = new URL(currentPageURL).origin
  //     newReq = new Request(currentHost + url)
  //   } else {
  //     console.log("SW: URL starts with something else")
  //     newReq = new Request(url)
  //   }

  //   console.log("SW: newReq:", newReq)

  //   const fetchCall = fetch(newReq)
  //   console.log("SW: fetchCall:", fetchCall)

  //   event.respondWith(fetchCall)
  //   event.preventDefault()
})

self.addEventListener("message", function (event) {
  lastFetchURL = event.data
  console.log(6666, lastFetchURL)
})
