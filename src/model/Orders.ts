import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
    orderID : Number,
    orderProduct : String,
    orderQuantity :Number ,
    orderImage : String ,
    orderTotalPrice : Number,
    orderStatus : String
},{timestamps : true});

const Orders = mongoose.models.Orders || mongoose.model('Orders', OrderSchema);

export default Orders;