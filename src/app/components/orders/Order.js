'use client'
import styles from './Order.module.css'
import confirmOrder from '@/app/data/order/confirmOrder'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import cancelOrder from '@/app/data/order/cancelOrder'
import deleteOrder from '@/app/data/order/deleteOrder'

const Order = ({ order, user_type, handleDeleted, list_order }) => {

    const [orderState, SetOrderState] = useState()
    useEffect(() => { SetOrderState(order.state) }, [list_order])
    const handleOrder = async () => {
        if (user_type == 'tenant') {
            console.log(order.id)
            if (await cancelOrder(order.id)) {
                SetOrderState('CANCELED')

            }
        }
        else {

            if (await confirmOrder(order.id)) {
                SetOrderState('DONE')
            }
        }
    }
    const DeleteOrder = async () => {
        console.log(order.id)
        if (await deleteOrder(order.id)) {
            handleDeleted()
        }
    }
    const button_prop = {
        disabled: orderState == 'CANCELED' || orderState == 'DONE'
    }
    return (
        <div className={clsx("col-span-12 grid grid-cols-12 gap-4 items-center", styles.order)}>
            <div className={clsx('col-span-6 flex items-center justify-between', styles.order_child)}>
                <img src={order.house.images[0]?.url} height={"200px"} width={"200px"} className={clsx(styles.house_image)} />
                <div className={clsx('ml-5')}>
                    <div>Address : {order.house.address}</div>
                    <div>Price : {order.house.price}$/night</div>
                    <div>Duration : 3</div>
                </div>
            </div>
            <div className={clsx('col-span-2 flex flex-col justify-center', styles.order_child)}>

                {user_type == 'owner' ? <div>{order.tenant.phone}</div> : <div>{order.house.owner.phone}</div>}
                {user_type == 'owner' ? <div>{order.tenant.name}</div> : <div>{order.house.owner.name}</div>}
            </div>
            <div className={clsx('col-span-2 flex flex-col justify-center', styles.order_child)}>
                <div>{orderState}</div>
            </div>
            <div className={clsx('col-span-2 flex flex-col justify-center', styles.order_child)}>
                <button onClick={() => { handleOrder(order.id) }} className={clsx(styles.cancel_button, "px-5", '')} {...button_prop}  >{user_type == 'tenant' ? "Cancel" : "Confirm"}</button>
                <button onClick={() => { DeleteOrder(order.id) }} className={clsx(styles.cancel_button, "px-5", 'mt-4', orderState == 'PENDING' && 'hidden')} >Delete </button>
            </div>
        </div>)
}


export default Order