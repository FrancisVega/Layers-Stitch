const doc = context.document
const sel = context.selection.slice()
const sortByPosition = (a, b) => a.frame().left() - b.frame().left();
const selSorted = sel.sort(sortByPosition)
const firstElement = selSorted[0]
const gutters = [0, 8, 16, 24, 32, 40, 48, 56, 64]
let firstElementLeft = firstElement.frame().left()

function getLeftGutter(a, b) {
  const aWidth = a.frame().width()
  const aX = a.frame().left()
  const bX = b.frame().left()
  return bX - aX - aWidth
}

function evenGuttered(layers) {
  let gutter = getLeftGutter(layers[0], layers[1])
  for(var i=0; i<layers.length-1; i++) {
    if(getLeftGutter(layers[i], layers[i+1]) != gutter) {
      return false
    }
  }
  return gutter
}

function fit(gutter, orient) {

  selSorted.map(layer => {
    layer.frame().setX(firstElementLeft);
    firstElementLeft = layer.frame().left() + layer.frame().width() + gutter;
  })

  doc.showMessage(`🌭 @ ${gutter}`);
}

const actualGutter = evenGuttered(selSorted)

if (gutters[gutters.indexOf(actualGutter)+1] != undefined) {
  nextGutter = gutters[gutters.indexOf(actualGutter)+1]
} else {
  nextGutter = 0
}

if (actualGutter == nextGutter) {
  fit(0, 'left')
} else {
  fit(nextGutter, 'left')
}

