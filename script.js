const doc = document,  {head, body} = doc,  ls = localStorage,
      {assign, entries, fromEntries} = Object,  c = console.log,
      {stringify, parse} = JSON,  clone = obj => parse(stringify(obj)),
      crEl =(tag, props={})=> assign(doc.createElement(tag), props),

fetchMe =(type, url, cb)=> {
  let promise = fetch(url).then(resp => resp[type]())
  return cb? cb(promise) : promise
},
fetchTxt =(url, cb)=> fetchMe('text', url, cb),
fetchObj =(url, cb)=> fetchMe('json', url, cb),  fetchArr = fetchObj,

range = to => [...Array(to).keys()],
mapArr =(len, fn, thisArg)=> Array.from(range(len), fn, thisArg)


assign(HTMLElement.prototype, {
  html: function (str='') { this.innerHTML = str; return this },
  txt: function (str='') { this.innerText = str; return this },
  val: function (str='') { this.value = str; return this },
  into: function (el) { el.append(this); return el },
  copy: function (n) { return n? mapArr(n, ()=> this.copy()) :
          this.cloneNode(1) },
  change: function (props) { return assign(this, props) },
  host: function (arr) { return arr? (this.append(...arr), this) :
          el => this.appendChild(el) },
  multiply: function (n) { return this.copy(n).map(el => el.inAfter(this))
          .reverse() },
  inBefore: function (el) { el.parent().insertBefore(this, el); return this },
  inAfter: function (el) { el.next()? this.inBefore(el.next()) :
             this.into(el.parent()); return this },
  parent: function (sel) { return sel? this.closest(sel) : this.parentNode },
  next: function (sel) { return sel? this.sibs(sel)[this.i(sel)+1] :
          this.nextElementSibling },
  prev: function (sel) { return sel? this.sibs(sel)[this.i(sel)-1] :
          this.previousElementSibling },
  all: function (sel) {
         return [...sel? this.querySelectorAll(sel) : this.children] },
  last: function (sel) {
          return sel? this.all(sel).pop() : this.lastElementChild },
  first: function (sel) {
           return sel? this.querySelector(sel) : this.firstElementChild },
  child: function (sel) { return typeof sel!='number'? this.first(sel) :
           this.children[sel<0? this.all().length+sel : sel] },
  sibs: function (sel) { return typeof sel!='number'? this.parent().all(sel) :
          this.parent().child(i) },
  i: function (sel) { return this.sibs(sel).indexOf(this) },
})