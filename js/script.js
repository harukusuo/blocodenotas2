/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notesContainer = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.
let inputTitle = document.querySelector('#input-title'); // campo de entrada do título
let inputContent = document.querySelector('#input-content'); // campo de entrada do conteúdo

/**
 * Modal de edição da anotação
 */
addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log('Botão de adicionar notas clicado.');
    modal.style.display='block';
    document.querySelector('#notes').style.display='none';
    document.querySelector('#controls').style.display='none';
});

btnCloseModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'none';
    addNote.style.display = 'block';
    notesContainer.style.display = 'flex';
    document.querySelector('#controls').style.display = 'flex';
    clearInputFields();
});

btnSaveNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    let data = {
        id: document.querySelector('#input-id').value,
        title: inputTitle.value,
        content: inputContent.value,
    };

    saveNote(data);
    modal.style.display = 'none';
    addNote.style.display = 'block';
    notesContainer.style.display = 'flex';
    document.querySelector('#controls').style.display = 'flex';
    clearInputFields();

    listNotes();
});

btnCloseNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display='none';
    addNote.style.display = 'block';
    notesContainer.style.display = 'flex';
    modalView.style.display = 'none';
    clearInputFields();
});

/**
 * ===================== FUNÇÕES  =================================
 */

const saveNote = (note) => {
    let notes = loadNotes();
    if (note.id.trim().length < 1) {
        note.id = new Date().getTime();
    } else {
        // ???
    }
    note.lastTime = new Date().getTime();
    notes.push(note);
    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);
};

const loadNotes = () => {
    let notes = localStorage.getItem('notes');
    if (!notes) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }
    return notes;
};

const listNotes = () => {
    notesContainer.innerHTML = '';
    let listNotes = loadNotes();
    listNotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        divCard.appendChild(divCardBody);
        //titulo
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        //conteudo
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        //data
        let pLastTime = document.createElement('p');
        let time = new Date(note.lastTime);//converte p data
        time = time.toLocaleDateString('pt-BR');
        pLastTime.innerText = "Atualizado em: " + time;
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);

        notesContainer.appendChild(divCard);

        divCard.addEventListener('click', (evt) => {
            showNote(note);
        });
    });
};

const showNote = (note) => {
    notesContainer.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";
    document.querySelector('#content-note').innerHTML = 
        `<p>${note.content}</p>
        <p>Última alteração: ${dateFormat(note.lastTime)}</p>`;

    // Criar o botão de editar nota
    let editButton = document.createElement('div');
    editButton.id = 'edit-modal-view';
    editButton.innerHTML = `
        <a href="">
            <i class="bi bi-pen" style="color:#a40980"></i>
        </a>`;

    // Criar o botão de excluir nota
    let deleteButton = document.createElement('div');
    deleteButton.id = 'delete-modal-view';
    deleteButton.innerHTML = `
        <a href="">
            <i class="bi bi-trash3" style="color:#a40980"></i>
        </a>`;

    // Adicionar os botões ao modalView
    modalView.appendChild(editButton);
    modalView.appendChild(deleteButton);
};

const dateFormat = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toLocaleDateString('pt-BR');
    return date;
};

const clearInputFields = () => {
    inputTitle.value = '';
    inputContent.value = '';
};

listNotes();
