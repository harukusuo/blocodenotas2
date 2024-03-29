/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.

/**
 * Modal de edição da anotação
 */
addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display='block';
    document.querySelector('#notes').style.display='none';
    document.querySelector('#controls').style.display='none';
});

btnCloseModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display='none';
    addNote.style.display = 'block';
    notes.style.display = 'flex';
});

btnSaveNote.addEventListener('click', (evt) => {
evt.preventDefault();
data = {
    id: document.querySelector('#input-id').value,
    title: document.querySelector('#input-title').value,
    content: document.querySelector('#input-content').value,
}

addNote.addEventListener('click', (evt) => {
   evt.preventDefault();
   modal.style.display='block';
   document.querySelector('#notes').style.display='none';
   document.querySelector('#controls').style.display='none';
});

saveNote(data);

});

btnCloseNote.addEventListener('click', (evt) => {
   evt.preventDefault();
   modal.style.display='none';
   addNote.style.display = 'block';
   notes.style.display = 'flex';
   modalView.style.display = 'none';
});

//funcoess

const saveNote = (note) => {
    console.log(note);
    let notes = loadNotes();
    if(note.id.trim().lenght < 1){
        note.id = new Date().getTime()
    }
    else{
        ///?
    }
    note.lastTime = new Date().getTime();
        console.log(note);
        notes.push(note);
        notes = JSON.stringify(notes);
        localStorage.setItem('notes', notes);

    //if(notes.id === undefined){
        //note.id = new Date().getTime();
    //}else{
    //}
};

const loadNotes = () => {
    let notes = localStorage.getItem('notes')
    if(!notes){
        notes = []; //ou notes = array();
    }else{
        notes = JSON.parse(notes);
    }
    return notes;
}

const listNotes = () => {
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
        time=time.toLocaleDateString('pt-BR');
        pLastTime.innerText = "Atualizado em: "+time;
        //pLastTime.innerText = "Atualizado em: "+dateFormat(note.lastTime);   //tava no do candido
        console.log(time);

        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);

        notes.appendChild(divCard);

        divCard.addEventListener('click', (evt) => {
           showNote(note);
        })
    });
}

const showNote = (note) => {
   notes.style.display = 'none';
   addNote.style.display = 'none';
   modalView.style.display = 'block';
   document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"<\h1>";
   document.querySelector('#content-note').innerHTML = 
   `<p>${note.content}<\p>
   <p>Última alteração: ${dateFormat(note.lastTime)}<\p>`
};

const dateFormat = (timestamp) => {
   let date = new Date(timestamp);//converte p data
        date=date.toLocaleDateString('pt-BR');
        return date;
}

listNotes();
