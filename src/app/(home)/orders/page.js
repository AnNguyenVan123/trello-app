'use client'
import clsx from "clsx"
import getOrdersByTenant from "../../data/order/getOrdersByTenant"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../provider/Provider"
import Order from "@/app/components/orders/Order"
const Page = () => {
    const { user } = useContext(UserContext)
    
    const [list_order, set_list_order] = useState([])
    const [isDeleted, SetIsDeleted] = useState(false)
    useEffect(() => {
        getListOrder()
    }, [isDeleted])
    useEffect(() => {
        getListOrder()
    }, [user])
    const getListOrder = async () => {
        console.log(user)
        const list = await getOrdersByTenant(user?.id)
        console.log(list)
        set_list_order(list)
    }
    const handleDeleted = () => {
        SetIsDeleted(s => !s)

    }
    return (

        list_order?.length > 0 ? <div className={clsx("mt-20 grid grid-cols-12 gap-4 text-center")} >
            <div className={clsx('col-span-6')}>House</div>
            <div className={clsx('col-span-2')}>Owner</div>
            <div className={clsx('col-span-2')}>State</div>
            <div className={clsx('col-span-2')}></div>
            {list_order ? list_order?.map(order => {
                return (<Order order={order} user_type={"tenant"} handleDeleted={handleDeleted} list_order={list_order} />)
            }) : ""


            }
        </div> : <div className={clsx("mt-40 text-center")}>There is no order !</div>
    )
}
export default Page