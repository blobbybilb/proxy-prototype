import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts"

const doc = new DOMParser().parseFromString(
  `
    <h1>Hello World!</h1>
    <p>Hello from <a href="https://deno.land/">Deno!</a></p>
    <script src="http://example.com/something.js"></script>
    <a href="http://example.com">Example</a>
    
  `,
  "text/html"
)!

function modifyTags(doc: HTMLDocument): HTMLDocument {
  // script tags
  const scripts = doc.querySelectorAll("script")

  scripts.forEach((script) => {
    const src: string | null = (script as any).getAttribute("src")
    if (src) {
      ;(script as any).setAttribute("src", convertURL(src))
    }
  })

  // a tags
  const links = doc.querySelectorAll("a")

  links.forEach((link) => {
    const href: string | null = (link as any).getAttribute("href")
    if (href) {
      ;(link as any).setAttribute("href", convertURL(href))
    }
  })

  return doc
}

function convertURL(text: string, currentPath = ""): string {
  if (text.startsWith("http://")) {
    text = "/" + text.slice(7)
  } else if (text.startsWith("https://")) {
    text = "/" + text.slice(8)
  } else if (text.startsWith("//")) {
    text = "/" + text.slice(2)
  } else if (text.startsWith("/")) {
    text = currentPath + text
  } else {
    console.log(text)
  }

  return text.startsWith("/") ? text : "/" + text
}

console.log(modifyTags(doc).documentElement?.outerHTML)

export { modifyTags, convertURL }
