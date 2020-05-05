const galleryParams = ['Width', 'Height', 'Count', 'Gap']
  .map(param => 'image'+param)

const li0 = gallery.first()

galleryInit()

{[imageWidth, imageHeight, imageCount, imageGap]
  .forEach(input => input.onchange = storeGalleryParams)}


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
  li0.copy(+imageCount.value).forEach(li => gallery.append(li.change('first',
    {src: li0.first().dataset.src.replace('width', imageWidth.value)
      .replace('height', imageHeight.value)+'?random='+rnd(1e5),
      onload: e => e.target.parent().class('empty', -1)})))
  entries({'--gap': imageGap.value/2+'px', '--width': imageWidth.value+'px','--height': imageHeight.value+'px'}).forEach(pair =>
      gallery.style.setProperty(...pair))
}
