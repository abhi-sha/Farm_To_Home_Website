const mongoose = require('mongoose')
const url = "mongodb+srv://foodorder:foodorder@cluster0.hqdtl.mongodb.net/Food_ordering_data?retryWrites=true&w=majority&appName=Cluster0"
global.foodItem;
const mongoconnect = async () => {
    try {
        let res = await mongoose.connect(url)

        let data = await res.connection.db.collection("sample_category")
        global.foodItem = await data.find({}).toArray()
        let data2 = await res.connection.db.collection("sample_data")
        global.foodCategory = await data2.find({}).toArray()



    }
    catch (error) {
        console.log(error)
    }
}


module.exports = mongoconnect;