const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const rake = require('node-rake');
const file = require('file-system');
const fs = require('fs');
const findInFiles = require('find-in-files');

const app = express();

file.readFile === fs.readFile

const bt = require('./qna');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/res', (req, res) => {
    res.render('res');
})

app.post('/res', (req, res) => {
    const keywords = rake.generate(req.body.query);

    for (var i = 0; i < bt.length; i++) {
        var keywordfile = rake.generate(bt[i].Q);
        console.log(keywordfile);
        console.log(keywords);

        if(keywords[i] === keywordfile[i]){
            res.send(bt[i].A);
        }
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});