import React,{ useState } from "react";

function CreateNote(props) {

    const [note,setNote]=useState({
        title:'',
        body:'',
        color:''

    })

function handleChange(event){
  
    const {name,value}=event.target;

    setNote(prevNote=>{
        return {
            ...prevNote,
            [name]:value
        };
    }
    );
}

function submitNote(event){
  props.onAdd(note)
 setNote({
    title:'',
    body:'',
    color:'',

 });
 console.log(note,'note1');
 event.preventDefault();
}

    return(
        <div>
            <form className="createNote">
            <label >Title:</label>
                <input 
                type="text" 
                name='title'
                onChange={handleChange} 
                value={note.title}
                placeholder="enter title"/>
                <br />
                <br />
                <label>Note Content:</label>
                <textarea 
                name="body" 
                cols="100" 
                rows="2" 
                onChange={handleChange} 
                value={note.body}
                placeholder="enter note"
                />
<br />
<br />
                <label >Choose a color:</label>
                <input 
                type="color" 
                id="colorPicker" 
                name="color" 
                list="colorOptions"
                onChange={handleChange} 
                value={note.color}
                />
        
                <datalist id="colorOptions">
                <option value="#ff0000">Red</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
                <option value="#ffff00">Yellow</option>
                <option value="#ff00ff">Magenta</option>
                <option value="#00ffff">Cyan</option>
                </datalist>
                <button onClick={submitNote}>Create Note</button>
                </form>
                </div>
    )
}
export default CreateNote