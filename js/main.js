const notesContainer = document.querySelector('.notes__wraper')
const addNote = document.querySelector('.addNote__wraper')
const createNote = document.querySelector('.create__notes__wraper')
const closeNote = document.querySelector('.note__close')
const noteForm = document.querySelector('.note__form')
const noteTitle = document.querySelector('#note__title')
const noteText = document.querySelector('#note__text')

let notes = []

const close = () =>{
    noteForm.reset()
    notesContainer.style.display = 'flex'
    createNote.style.display = 'none'
    addNote.style.display = 'flex'
}

const setLocalStorage = (notes) =>{
    const json = JSON.stringify(notes)
    localStorage.setItem('notes', json)
}

const toDOM = (arr) =>{
    const notes = arr.reduce((acc, curr) => {
        return acc + `
            <div class='note__wraper'>
                <div class='note__title'>
                    <p>Title: </p>
                    <p>${curr.title}</p>
                </div>
                <div class='note__text'>
                    <p>Note: </p>
                    <p>${curr.note}</p>
                </div>
                <button>View Note</button>
            </div>
        `
    }, '')
    return notes
} 

addNote.addEventListener('click', () =>{
    noteForm.reset()
    notesContainer.style.display = 'none'
    createNote.style.display = 'flex'
    addNote.style.display = 'none'
})

closeNote.addEventListener('click', () =>{
    close()
})

class note {
    constructor(title,note){
        this.title = title,
        this.note = note
    }
}

noteForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    notes.push(new note(noteTitle.value,noteText.value))
    setLocalStorage(notes)
    Swal.fire({
        title: 'Note added',
        icon: 'success'
    })
    showNotes()
    close()
})

const showNotes = () =>{
    const getNotes = localStorage.getItem('notes') || []
    const parseNotes = JSON.parse(getNotes)
    notesContainer.innerHTML = toDOM(parseNotes)
}

showNotes()