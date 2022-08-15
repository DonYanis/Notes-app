const createNote=document.querySelector('.add-box')
const noteForm=document.querySelector('.popup-box')
const noteFormTitle=document.querySelector('header p')
const closeForm=document.querySelector('header i')
const addNote=document.querySelector('.add-note')
const noteTitle=document.querySelector('input')
const noteDesc=document.querySelector('textarea')
const wrapper=document.querySelector('.wrapper')

//get notes from local storage
const notes=JSON.parse(localStorage.getItem("notes")||'[]') // parse empty array if local storage is empty
let update=false,updateID

showNotes()

createNote.addEventListener("click",()=>{
    noteForm.style.display='block'
    addNote.innerHTML="Add Note"
    noteFormTitle.innerHTML="Add a new note"
    noteTitle.focus()
    update=false
})

closeForm.addEventListener("click",()=>{
    noteDesc.value=""
    noteTitle.value=""
    noteForm.style.display='none'
})

addNote.addEventListener("click",e=>{
    let Ndesc=noteDesc.value
    let Ntitle=noteTitle.value
    let Ndate=new Date(),
    month=Ndate.getMonth(),
    day=Ndate.getDay(),
    year=Ndate.getFullYear()

    let note={
        title:Ntitle,
        description:Ndesc,
        date:`${day}/${month}/${year}`,
    }

    if(update){
        notes[updateID]=note
    }else{
        notes.push(note)
    }
    localStorage.setItem("notes",JSON.stringify(notes))

    closeForm.click()
    showNotes()
})


function showNotes(){
    document.querySelectorAll('.note').forEach((note)=>note.remove())
    notes.forEach((note,index) => {
        let noteElement=`<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description} </span>
                            </div>
                            <div class="bottom-content">
                                <span class="date">${note.date}</span>
                                <div class="settings">
                                    <i onclick="showSettings(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="menu">
                                    <li  onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                    <li  onclick="editNote(${index})"><i class="uil uil-pen"></i>Update</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`
        createNote.insertAdjacentHTML('afterend',noteElement)
    });
}

function showSettings(element){
    element.parentElement.classList.add("show")
    document.addEventListener("click",(e)=>{
        if(e.target!==element){
            element.parentElement.classList.remove("show")
        }
    })
}


function deleteNote(index){
    notes.splice(index,1)
    localStorage.setItem("notes",JSON.stringify(notes))
    showNotes()
}

function editNote(index) {
    update=true
    updateID=index
    addNote.innerHTML="Update Note"
    noteFormTitle.innerHTML="Update your note"
    noteDesc.value=notes[index].description
    noteTitle.value=notes[index].title
    noteForm.style.display='block'
}