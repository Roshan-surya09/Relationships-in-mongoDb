const mongoose = require('mongoose');
const { Schema} = mongoose;

main()
    .then(() => {console.log("connection successfull")})
    .catch((err) => console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
} 

const orderSchema = new Schema({
    item : String,
    price : Number,
});

const customerschema = new Schema({
    name: String,
    orders:[{
        type : Schema.Types.ObjectId,
        ref: "Order",
    }],
});

//middlewares
// customerschema.pre("findOneAndDelete", async() => {
//     console.log("PRE MIDDLEWARE");
// });

customerschema.post("findOneAndDelete", async(Customer) => {
    if(Customer.orders.length){
        let result = await Order.deleteMany({_id: {$in:  Customer.orders}});
        console.log(result);
    }
    console.log("Order deletion successfull");
});


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerschema);

const addCustomer = async() => {
    let cust1 = new Customer({
        name: "Lipakshi",
    });

    let order9 = new Order({
        item: "manchurian",
        price: 20,
    });
    cust1.orders.push(order9);

    await order9.save();
    await cust1.save();

    console.log("Added a customer");
};
// addCustomer();

const delCust = async() => {
    let data = await Customer.findByIdAndDelete('66ef86b17d0844281ac096ff');
    console.log(data);
    console.log("customer deleted");
};
delCust();

// const addCustomer = async() => {
//     let cust1 = new Customer({
//         name: "Roshan",
//     });

//      let order1 = await Order.findOne({ item: "samosa"});
// //      let order2 = await Order.findOne({ item: "Eggs"});
//         let order3 = await Order.findOne({ item: "samosa"});

// //     cust1.orders.push(order1);
// //     cust1.orders.push(order2);
//        cust1.orders.push(order3);
// //     let result = await cust1.save();
// //     console.log(result);

// // let result = await Customer.find({}).populate("orders");
// // console.log(result[0]);
   
// await order3.save();
// let result = cust1.save();
// console.log(result);
// };

// // addCustomer();

// const joinCustomer = async () => {
//     let cust2 = new Customer({
//         name: "Abhay-kashyap"
//     });

//     let newOrder = new Order({
//         item: "Beer",
//         price: 220,
//     });

//     cust2.orders.push(newOrder);
    
//   let result1 =  await cust2.save();
//    let result =  await newOrder.save();
//     console.log(result, result1);  
// // const data = await Customer.find({}).populate("orders", "item");
// // console.log(data[0]);
// };

// joinCustomer();

// // const del = async () => {
// //     let data = await Customer.findByIdAndDelete("66ee36e6c9b9501ba7a44d03");
// //     console.log(data);
// // };
// // del();



// // const addOrders = async () => {
// //    let result =  await Order.insertMany([
// //         { item :"samosa", price: 10 },
// //         { item : "Eggs", price : 6 },
// //     ]);

// //     console.log(result);
// // };

// // addOrders();