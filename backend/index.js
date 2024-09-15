const connection = require('./db')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors');


connection()

app.use(cors());


app.get('/', (req, res) => {

    res.send({ category: global.foodCategory, fooditem: global.foodItem })

})
app.use(express.json())
app.use(cors({
  origin: 'https://farm-to-home-website-frontend.onrender.com/'
}));
app.use(cors({
  origin: 'https://farm-to-home-website-frontend.onrender.com/loginuser'
}));
app.use(cors({
  origin: 'https://farm-to-home-website-frontend.onrender.com/createuser'
}));
app.use(cors({
  origin: 'https://farm-to-home-website-frontend.onrender.com/createorder'
}));
app.use(cors({
  origin: 'https://farm-to-home-website-frontend.onrender.com/myorders'
}));


app.use('/api', require('./Routes/EndPoints'))


app.listen(port, () => {

    console.log("APP LISTENING AT ", port)
})
