let inputElement=document.getElementById("task")
let buttonElement=document.getElementById("button")
let listElement=document.getElementById("lists")

buttonElement.addEventListener("click",function(event){
    const note=inputElement.value.trim()
    event.preventDefault()
    if (note!=""){
const li =document.createElement("li")
    li.textContent=note
    listElement.appendChild(li)
    inputElement.value=""

    }
    else{
        alert("Please First write the note")
    }
})


listElement.addEventListener("click",function(event){
    listElement.removeChild(event.target)
})