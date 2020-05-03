const galleryParams = ['Width', 'Height', 'Count', 'Gap']
  .map(param => 'image'+param)

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

const li0 = gallery.firstElementChild

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
}
