const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.use(
    express.static(path.join(__dirname, '../public')))




app.get('', (req, res) => {
    res.render('index',{
        title: 'pass in'
    })
});



app.get('/help', (req, res) => {
   res.render('help',{title:'helptitle'})
})

app.get('/helpold', (req, res) => {
    res.send({a:1,b:2})
 })

 app.get('*',(req,res)=>{
     res.status(404).send('Bad request')
 }
 )

app.listen(port, () => {
    console.log('server started on port '+port)
})