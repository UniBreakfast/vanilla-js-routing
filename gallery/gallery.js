const galleryParams = ['Width', 'Height', 'Count', 'Gap']
  .map(param => 'image'+param)

const li0 = gallery.first()

let process

galleryInit()

imageWidth.onchange =()=> {
  storeGalleryParams()
}
imageHeight.onchange =()=> {
  storeGalleryParams()
}
imageCount.onchange =()=> {
  storeGalleryParams()
}
imageGap.onchange =()=> {
  storeGalleryParams()
}

function storeGalleryParams() {
  ls.gallery = stringify(fromEntries(galleryParams.map(param =>
    [param, window[param].value])))
}

function loadGalleryParams() {
  entries(parse(ls.gallery))
    .forEach(([id, value]) => assign(window[id], {value}))
}

function galleryInit() {
  if (ls.gallery) loadGalleryParams()
  gallery.first().remove()
  fillGallery()
}


function fillGallery() {
  gallery.htm()
  const clone = li0.copy().change('first', {src: li0.first().src
    .replace('width', imageWidth.value).replace('height', imageHeight.value)})
  clearInterval(process)
  process = setInterNum(()=> clone.copy().into(gallery), 1000, imageCount.value)
  gallery.style.setProperty('--gap', imageGap.value/2+'px')
}

function fillGallery() {
  gallery.htm()
  li0.copy(+imageCount.value).forEach(li => li
    .change('first', {src: li0.first().src
    .replace('width', imageWidth.value)
    .replace('height', imageHeight.value)+'?random='+rnd(100)}).into(gallery))
  gallery.style.setProperty('--gap', imageGap.value/2+'px')
}
