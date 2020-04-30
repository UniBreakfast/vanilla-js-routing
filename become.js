fetch(loader.dataset.src).then(r=>r.text()).then(html => {
  ({head, body} = doc = document)

  body.innerHTML = /<body>([\s\S]*)<\/body>/.exec(html)[0]

  const headHtml = /<head>([\s\S]*)<\/head>/.exec(html)[0]

  const links = headHtml.match(/(?<=<link )[^>]*(?=>)/g)
  if (links) links.forEach(attrs => {
    const link = doc.createElement('link')
    attrs.split(/(?<=") /).forEach(attr => {
      const [key, value] = attr.split('="')
      link[key] = value.slice(0, -1)
    })
    head.append(link)
  })

  const scripts = headHtml.match(/(?<=<script )[^>]*(?=>)/g)
  if (scripts) scripts.forEach(attrs => {
    const script = doc.createElement('script')
    attrs.split(/(?<=") /).forEach(attr => {
      const [key, value] = attr.split('="')
      if (value) script[key] = value.slice(0, -1)
    })
    head.append(script)
  })

  loader.remove()
})
