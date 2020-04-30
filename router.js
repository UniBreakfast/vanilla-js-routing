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

// a fix for the cases where site is hosted deeper than the root level
// you can simply assign a number that tells how deeply is your site hosted
const rootDepth = location.host.endsWith('.github.io')? 1 : 0,
    rootPath = location.pathname.match(/\/[^/]*/g).slice(0, rootDepth).join('')

let path = getPath()
if (path) goto(path)
else onload =()=> goto(getPath() || ls.page)

onpopstate = e => goto(e.state.path)


async function goto(path='home') {
  const page = subPages[path]
  document.title = page.title

  if (!page.html && page.htmlFile) page.html =
    await(await fetch(`${rootPath}/${path}/${page.htmlFile}`)).text()
  if (page.html) mainWrapper.innerHTML = page.html

  try { subPageStyling.remove() } catch {}

  if (!page.css && page.cssFile) page.css =
    await(await fetch(`${rootPath}/${path}/${page.cssFile}`)).text()

  if (page.css) head.append(assign(doc.createElement('style'),
                  {innerHTML: page.css, id: 'subPageStyling'}))

  history.pushState({path}, path, rootPath+'/'+path)

  ls.page = path
}

function getPath() {
  return /([^/]*)\/?$/.exec(location.pathname.slice(rootPath.length))[1]
}