const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectiondone = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGOPATH,{useNewUrlParser: true}).then(data => {
        console.log("Connection Establish")
        const fetch_data = mongoose.connection.db.collection("Techosto_data");
        fetch_data.find().toArray(function(err,data){
            if(err) console.log(err);
            else {global.data = data; console.log(`Total entries are ${data.length}`)};
        })
    }).catch(error => console.log(error));
}

module.exports = connectiondone;