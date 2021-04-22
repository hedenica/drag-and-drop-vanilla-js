// cards

const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')


cards.forEach(card => {
  card.addEventListener('dragstart', dragstart)
  card.addEventListener('dragend', dragend)
})

function dragstart() {
  // console.log('CARD: started dragging')
  dropzones.forEach(dropzone => dropzone.classList.add('highlight'))

  this.classList.add('is-dragging')
}

function dragend() {
  // console.log('CARD: stopped dragging')
  dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))

  this.classList.remove('is-dragging')
}

// Place where the cards will be dropped

dropzones.forEach(dropzone => {
  // dropzone.addEventListener('dragenter', dragenter)
  dropzone.addEventListener('dragover', dragover)
  dropzone.addEventListener('dragleave', dragleave)
  dropzone.addEventListener('drop', drop)
})

function dragenter() {
  // console.log('DROPZONE: ENTERED zone')
}

function dragover(e) {
  e.preventDefault()

  this.classList.add('over')

  const cardDragged = document.querySelector('.is-dragging')

  const afterElement = getDragAfterElement(this, e.clientY)

  if (!afterElement) {
    this.appendChild(cardDragged)
  } else {
    this.insertBefore(cardDragged, afterElement)
  }
}

function dragleave() {
  this.classList.remove('over')
}

function drop() {
  this.classList.remove('over')
}

function getDragAfterElement(dropzone, y) {
  const draggleElements = [...dropzone.querySelectorAll('.card:not(.is-dragging)')]

  return draggleElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }

  }, { offset: Number.NEGATIVE_INFINITY }).element
}