import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Orders from "@/model/Orders";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      console.log(data)
      const  { _id  , orderStatus } = data

      const saveData = await Orders.findOneAndUpdate(_id , { orderStatus : orderStatus   }  , { new: true });

      if (saveData) {

        return NextResponse.json({ success: true, message: "Orders  updated successfully!" });

      } else {

        return NextResponse.json({ success: false, message: "Failed to update the Orders . Please try again!" });

      }

    } else {

      return NextResponse.json({ success: false, message: "You are not authorized." });

    }

  } catch (error) {

    console.log('Error in update a new Orders :', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });

  }
}
