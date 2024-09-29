const mongoose = require('mongoose');
const { Schema} = mongoose;

main()
    .then(() => {console.log("connection successfull")})
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
      username: String,
      address: [{
          _id: false,
          location: String,
          city: String,
      }],
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        username: 'Sherlock holmes',
        address: [{ location: "sarkanda", city: "Bilaspur" }]
    });

    user1.address.push( { location: "Ratanpur", city: "Chandigarh"} );
    user1.address.push( { location: "sarkanda gali no- 04", city: "Bemetra"});

     let result = await user1.save();
     console.log(result);
}

addUser();
