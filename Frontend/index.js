//api
fetch('http://localhost:3000/notes')


const input = document.getElementById('noteInput');
const addBtn = document.getElementById('addNote');
const list = document.getElementById('notesList');

function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  list.innerHTML = '';
  getNotes().forEach((note, i) => {
    const li = document.createElement('li');
    li.textContent = note;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      const notes = getNotes();
      notes.splice(i, 1);
      saveNotes(notes);
      renderNotes();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const note = input.value.trim();
  if (note) {
    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
    input.value = '';
    renderNotes();
  }
};

renderNotes();
