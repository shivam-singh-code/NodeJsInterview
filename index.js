const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
uuid();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// const testScore = {
//     candidate: [{
//         id: uuid(),
//         username: "rohan",
//         emailaddress: "rohan@gmail.com"
//     }]
// }

let candidates = [
    {
        id: uuid(),
        username: "rohan",
        emailaddress: "rohan@gmail.com",
        firstRoundScore: 3,
        SecondRoundScore: 4,
        thirdRoundScore:5 
    }
]

app.get('/', (req, res) => {
    res.send(`Welcome to Candidate test score`);
})

app.get('/candidates', (req, res) => {
    res.render('candidate/index', {candidates});
})

app.get('/candidates/new',(req, res) => {
    res.render('candidate/new');
})

app.post('/candidates', (req, res) => {
    const {username, emailaddress, firstRoundScore , SecondRoundScore, thirdRoundScore} = req.body;
    candidates.push({username, emailaddress, firstRoundScore , SecondRoundScore, thirdRoundScore, id:uuid()});
    res.redirect('/candidates');
})

app.get('/candidates/:id', (req, res) => {
    const { id } = req.params;
    const candidate = candidates.find(c => c.id === id);
    res.render('candidate/show', {candidate});
})

app.listen(3000, () => {
    console.log(`On port 3000`)
})