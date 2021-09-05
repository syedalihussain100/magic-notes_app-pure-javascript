showNotes();
let addbtn = document.getElementById('addbtn');


addbtn.addEventListener('click', function (e) {
    let notes = localStorage.getItem('notes');
    let addtxt = document.getElementById('addtxt');
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addtxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj);
    addtxt.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
         <div class="notecard my-2 mx-2 card" style="width: 18rem;">
         <div class="card-body">
             <h5 class="card-title">Note${index + 1}</h5>
             <p class="card-text">${element}</p>
             <button id=${index} onclick="deletenote(this.id)" class="btn btn-danger">Delete</button>
         </div>
     </div>
         `
    })

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h5>Nothing to show! Use "Add a Note" section above to add notes.</h5>`
    }
}

function deletenote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}


let searchText = document.getElementById("search");

searchText.addEventListener('input', function () {
    let searchValue = searchText.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if (cardText.includes(searchValue)) {
            element.style.display = "block"
        } else {
            element.style.display = "none";
        }
    })
})