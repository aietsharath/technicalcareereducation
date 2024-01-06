const express=require('express');//inbuilt middlewear

const cors=require('cors')

const bodyParser=require('body-parser');//it's not inbuilt middlewear


const mongoose=require('mongoose')

const schema=require('./model')

const app=express();//built in middlewear


const port=5000;

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static('public'))
 
app.use(cors());

mongoose.connect('enter your db connection path',{useUnifiedTopology:true})

const Notes=new mongoose.model("Notes",schema.userNotesSchema);



app.post("/createNote", async function (req, res) {
    console.log('entered');
    console.log(req.body);

    const {title,body,color,userId}=req.body;

try{
    if (req.body) {
        const newNote=new Notes({title,body,color,userId});
        await newNote.save();
        console.log(title);
        console.log(newNote);
        res.json({ message: 'Data received successfully' });            
    }
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  });

app.get('/getUserNotes',async (req,res)=>{
    try {
        let note=await Notes.find({})
      console.log(note);
    } catch (error) {
        throw new Error('some error while getting all document')
    }  
});

app.put('/updateNote/:noteId',async(req,res)=>{
    try {
        const id=req.params.getNote;
        await Notes.findOneAndUpdate({ _id:id},{title:req.body.title,body:req.body.body,color:req.body.color})
        json.send('hi');
    } catch (error) {
        throw new Error('some error while updating document') 
    }
})

app.delete("/deleteNote/:noteId",async (req,res)=>{
    const id=req.params.getNote;
await Notes.deleteOne({
    _id:id
})
});

//optional
app.get('/getUserNote/:getNote',async function(req,res){
    console.log('hello inside product now');
    
    const note=req.params.getNote;
    
    const getNote=await Notes.findById(note);
    
    res.send(getNote);

});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})