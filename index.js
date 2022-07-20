const express = require('express')
const morgan = require('morgan')

const app = express()
// morgan('tiny')
app.use(express.json())
app.use(morgan('tiny'))


const message = 'hello mom'
const port = 3001

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function generateId(reference){
    return Math.floor( Math.random() * reference)
}

const information = `<h2>Phonebook has info for ${data.length} people
        <br/>
        ${new Date()}
    </h2>`

app.get('/', (req, res)=>{
    res.send(message)
})

app.get('/api/persons', (req,res)=>{
    res.json(data)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const contact = data.find(item=>item.id === id)
    if (contact) {
        res.json(contact)
    }else{
        res.status(404).end()
        console.log('contact not found');
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    data = data.filter(item=>item.id !== id)
    response.status(204).end() 
    console.log(data);
})

app.post('/api/persons',(request, response)=>{
    const info = request.body
    const newContact = {
        id: generateId(200),
        name: info.name,
        number: info.number
    }
    if (data.filter(item=>item.name.includes(newContact.name))) {
    response.json({error: 'name is already added'})
    }
    if (newContact.name !== '' && newContact.number !== '') {
        data.push(newContact)
        response.json(data)
    }
    else{
        response.json({error: 'add name and number'})
    }
})

app.get('/info',(req,res)=>{
    res.send(information)
})

app.listen(port, console.log('running on port', port))
