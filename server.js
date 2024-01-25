const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const ejs = require('ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.get('/', (req, res) => {
    res.render('index');
});


require('./app/routes/todos.routes.js')(app);

app.listen(3000, () =>
    console.log('Server 3000')
);
