"use Client"

import React, { useEffect, useState } from 'react'

import { useSWRConfig } from "swr"
import { toast } from 'react-toastify';
import { delete_a_category } from '@/Services/Admin/category';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Loading from '@/app/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';
import { get_pending_orders, update_order } from '@/Services/Admin/orders';



type OrderData = {
  _id: string;
  orderID: number;
  orderProduct: string;
  orderQuantity: number;
  orderImage: string;
  orderTotalPrice: number;
  orderStatus: string;
};


export default function PendingOrderDataTable() {
  const { mutate } = useSWRConfig()
  const router = useRouter();
  const [isLoading,setisLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<OrderData[] | []>([]);
  
  async function GetPendingOrder(){
    const res = await get_pending_orders();
    console.log(res.data)
    setFilteredData(res.data)
    setisLoading(false)
  }

  useEffect(()=>{

      GetPendingOrder()
  },[])




  const columns = [
    {
      name: 'ID',
      selector: (row: OrderData) => row?.orderID,
      sortable: true,
    },
    {
      name: 'Product',
      cell: (row: OrderData) => row?.orderProduct
    },
    {
      name: 'Quantity',
      cell: (row: OrderData) => row?.orderQuantity
    },
    {
      name: 'Price',
      cell: (row: OrderData) => row?.orderTotalPrice
    },
    {
      name: 'Status',
      cell: (row: OrderData) => row?.orderStatus
    },
    {
      name: 'Action',
      cell: (row: OrderData) => (
        <div className='flex items-center justify-start px-2 h-20'>
          <button onClick={() => handleAcceptOrder(row?._id)} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Accept</button>
          <button onClick={() => handleRejectOrder(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Refuse</button>
        </div>
      )
    },

  ];

  const handleAcceptOrder = async (id:string) => {
        const res = await update_order({_id:id,orderStatus:'completed'})
        GetPendingOrder()
  }

  const handleRejectOrder = async (id:string) => {
    const res = await update_order({_id:id,orderStatus:'rejected'})
    GetPendingOrder()
}

 

  

//   useEffect(() => {
//     if (search === '') {
//         setFilteredData(catData);
//     } else {
//         setFilteredData(catData?.filter((item) => {
//             const itemData = item?.orderProduct.toUpperCase() // mo2a9atan
//             const textData = search.toUpperCase();
//             return itemData.indexOf(textData) > -1;
//         }))
//     }


// }, [search, catData])



  return (
    <div className='w-full h-full bg-white'>
      <DataTable
        columns={columns}
        data={filteredData || []}
        key={'ThisisCategoryData'}
        pagination
        keyField="id"
        title={`Pending Order`} 
        fixedHeader
        fixedHeaderScrollHeight='500px'
        selectableRows
        selectableRowsHighlight
        persistTableHead
        progressPending={isLoading}
        progressComponent={<Loading />}
        subHeader
        subHeaderComponent={
          <input className='w-60 dark:bg-transparent py-2 px-2  outline-none  border-b-2 border-orange-600' type={"search"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Order ID"} />
      }
        className="bg-white px-4 h-4/6 "
      />

    </div>
  )
}

