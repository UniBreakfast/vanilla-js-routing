const subPages = {
  home: {
    title: "Home",
    html: '',
    htmlFile: 'home.html',
    css: '',
    cssFile: 'home.css',
  },
  about: {
    title: "About us",
    html: `<h1>Here you would read more about us and the things we do.</h1>
            <h4>... but you can't obviously, bacause there's nothing here.<h4>`,
    css: 'h4 { color: teal }',
  },
  gallery: {
    title: "Image Gallery",
    html: '',
    htmlFile: 'gallery.html',
    css: '',
    cssFile: 'gallery.css',
  }
}

onload =()=> {
  goto(doc.title || subPages[ls.page])
}

async function goto(path='home') {
  const page = subPages[path]
  document.title = page.title

  if (!page.html) page.html = await(await fetch(page.htmlFile)).text()
  mainWrapper.innerHTML = page.html

  if (typeof subPageStyling != 'undefined') subPageStyling.remove()
  const link = doc.createElement('link')
  link.id = 'subPageStyling'
  link.rel = 'stylesheet'
  link.href = page.cssFile
  head.append(link)

  history.pushState({path}, path, '/'+path);

  ls.page = path
}