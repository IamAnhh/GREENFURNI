const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// 
app.use(cors());
app.use(express.json());

// routes
//       discount
const discountRoutes = require('./routes/discount');
app.use('/api/discount', discountRoutes)
    //       product
const productRoutes = require('./routes/product')
app.use('/api/product', productRoutes)
    //       account
const accountRoutes = require('./routes/accountCustomer');
app.use('/api/account', accountRoutes);

//       blog
const blogRoutes = require('./routes/blog');
app.use('/api/blog', blogRoutes);

//        customProduct
const customRoutes = require('./routes/customproduct');
app.use('/api/customproduct', customRoutes)

//         order
const orderRoutes = require('./routes/order');
app.use('/api/order', orderRoutes)



const PORT = 3001;

app.get('/', (req, res) => {
    res.send('Welcome to GreenFurni API!');
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("server is sucessfully listening at port", PORT);
    else
        console.log("An error occurred", error);
});

main().catch((error) => console.error(error))
async function main() {
    const connectionString = "mongodb://localhost:27017/GREENFURNI"
    await mongoose.connect(connectionString)
    mongoose.set('strictQuery', true)
}