// les constantes Globales.
const notesWrapper=document.getElementById("notes-wrapper");
const title=document.getElementById("title");
const content=document.getElementById("content")
const error= document.getElementById("form-error")
const current_date=document.getElementById("current_date");

// stockage de la data.
let notesData=[];

// Logique Creer une Data.
const createNote=(uid, title, text, date)=>{
    const note= document.createElement("div");
    note.className="note";
    note.id= uid;
    note.innerHTML=`
        <div class="note">
                <div class="note-title">${title}</div>
                <div class="note-controls">
                    <button class="note-edit" onclick="editNote(${uid})" >Editer</button>
                    <button class="note-save" style="display:none" onclick="saveNote(${uid})" >sauvegarder</button>
                    <button class="note-delete" onclick="deleteNote(${uid})">Supprimer</button>
                </div>
                <div class="note-text">${text}</div>
                <div class="note-date">${date}</div>
            </div>
    `;

    notesWrapper.insertBefore(note, notesWrapper.firstChild)
}




// Logique evenement sur le button
const addNote=()=>{
    if(title.value.trim().length===0 
        && content.value.trim().length===0){
           error.innerHTML="Veuillez remplir tous les champs s'il vous plait !"
           return
        }

        // definir un generateur d'identifiant.
        const uid=new Date().getTime().toString()
        console.log(uid)

        // Definir un objet de stockage de la data.
        const noteObj={
            uid:uid,
            title: title.value,
            text:content.value,
            date:new Date().toLocaleDateString()
        };

        // Inserer la data dans le stockage.
        notesData.push(noteObj);
        // Enregistrer dans la memoire du navigateur.
        localStorage.setItem("notes",JSON.stringify(notesData));

        // creer une nouvelle note.
        createNote(noteObj.uid, noteObj.title, noteObj.text, noteObj.date);

        error.innerHTML="";
        title.value="";
        content.value="";

}

// Crud-Edit operation.

const editNote=(uid)=>{
    // Recuperer l'id.
    const note=document.getElementById(uid);

    // Definir les globales.
    const noteTitle= note.querySelector(".note-title");
    const noteText= note.querySelector(".note-text");
    const noteSave= note.querySelector(".note-save");
    const noteEdit= note.querySelector(".note-edit")

    noteTitle.contentEditable=true;
    noteText.contentEditable=true;
    noteEdit.style.display="none";
    noteSave.style.display="block"
    noteText.focus();
}

// Crud-Delete operation.
const deleteNote=(uid)=>{
    let confirmDelete=confirm('Voulez vous vraiment effacer cette pensée?')

    if(!confirmDelete){
        return;
    }
    // indexer l'element à effacer
    const note=document.getElementById(uid)
    note.parentNode.removeChild(note);

    // filter le stockage pour effacer l'element
    //              id est identique à l'entree.
    notesData= notesData.filter((note)=>{
        return note.uid != uid;
    });

    localStorage.setItem("notes", JSON.stringify(notesData))
}

// Crud-Delete operation.
const saveNote=(uid)=>{
    const note= document.getElementById(uid);

    // Definir les globales.
    const noteTitle= note.querySelector(".note-title");
    const noteText= note.querySelector(".note-text");
    const noteSave= note.querySelector(".note-save");
    const noteEdit= note.querySelector(".note-edit")

    // console.log(noteSave)

    if(noteTitle.innerText.trim().length ==0 && noteText.value.trim().length==0){
            error.innerHTML="Veuillez remplir les champs !"
            return;
        }
    notesData.forEach((note)=>{
        if(note.uid=uid){
          note.title= noteTitle.innerText;
          note.text=noteText.innerText;
        }
    });

    localStorage.setItem("notes", JSON.stringify(notesData));


    noteTitle.contentEditable="false";
    noteText.contentEditable="false";
    noteEdit.style.display="block";
    noteSave.style.display="none"
    error.innerText=""

}


// Afficher la date
let date=new Date().getFullYear()
current_date.innerText=date;

// Charger et afficher la data stocké dans le navigateur.
window.addEventListener("load", ()=>{
    notesData= localStorage.getItem("notes")
        ? JSON.parse(localStorage.getItem("notes"))
        : [];
    
    notesData.forEach((note)=>{
        createNote(note.uid, note.title, note.text,note.date)
    });

})