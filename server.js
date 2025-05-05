const express = require('express'); 
const bodyparser = require('body-parser');
const fs = require('fs');
let file ='file.json';

let app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.json());

app.get('/', (req, res) =>{
    fs.readFile(file,(err, data)=>{
        if(err) return res.send(err);
        let source=JSON.parse(data);
        source=source.filter(co=>!co.visited)
        if (source.length) {
            const index = Math.floor(Math.random() * source.length);
            const ind = source[index];
            res.render('index', ind);
        } else {
            res.render('index', { title: null });
        }
    })
})

app.post('/applied', (req, res)=>{
    fs.readFile(file,(err,data)=>{
        if(err) return res.send(err);
        let source=JSON.parse(data);
        source=source.map(job=>{
            if(job.title===req.body.title){
                job.applied=true;
                job.date_applied=new Date().toDateString();
            }
            return job
        })
        let str=JSON.stringify(source,null,2);
        fs.writeFile(file, str, (err)=>{
            if(err) return console.log(err);
            res.sendStatus(200);
        })
    })
})

app.post('/saw', (req, res)=>{
    fs.readFile(file,(err,data)=>{
        if(err) return res.send(err);
        let source=JSON.parse(data);
        source=source.map(job=>{
            if(job.title===req.body.title){
                job.visited=true;
            }
            return job
        })
        let str=JSON.stringify(source,null,2);
        fs.writeFile(file, str, (err)=>{
            if(err) return console.log(err);
            res.sendStatus(200);
        })
    })
})

app.get('/applied',(req, res)=>{
    fs.readFile(file,(err,data)=>{
        if(err) return console.log(err);
        let source=JSON.parse(data);
        source=source.filter(co=>co.applied);
        res.render('applied', {applied:source})
    })
})

app.use(express.static('public'));

const port = process.env.PORT ||8000
app.listen(port,()=>{
    console.log('listening on port ${port}');
})

