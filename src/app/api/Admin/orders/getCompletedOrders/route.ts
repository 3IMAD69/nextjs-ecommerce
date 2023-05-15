import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Orders from "@/model/Orders";


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDB();
  try {

    
    

    
      const getData = await Orders.find({orderStatus:"completed"});
      
      if (getData) {
        return NextResponse.json({success  :true , data : getData});
      } else {
        return NextResponse.json({status: 204 , success: false, message: 'No pending orders found.' });
      }
   
  } catch (error) {
    console.log('Error in getting pending orders:', error);
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
  }
}
