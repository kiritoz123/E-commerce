import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./myorder.module.css";
import empty from "../../assets/image/emptyorder.png";
import sort from "../../assets/image/sort.png";
import { Table } from "react-bootstrap";

export default function MyOrder() {
  const { dataGetOrderSell } = useSelector((state) => state.product);
  const [selectedStatus, setSelectedStatus] = useState('All items');

  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const filteredOrders = dataGetOrderSell?.filter(order => {
    if (selectedStatus === 'All items') return true;
    // Giả sử mỗi đơn hàng có trường `status` để xác định trạng thái của nó
    return order.status === selectedStatus;
  }) || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6 className={styles.title}>My order</h6>
        <div className={styles.menu}>
          <h3 className={selectedStatus === 'All items' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('All items')}>All items</h3>
          <h3 className={selectedStatus === 'Get paid' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('Get paid')}>Get paid</h3>
          <h3 className={selectedStatus === 'Processed' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('Processed')}>Processed</h3>
          <h3 className={selectedStatus === 'Sent' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('Sent')}>Sent</h3>
          <h3 className={selectedStatus === 'Completed' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('Completed')}>Completed</h3>
          <h3 className={selectedStatus === 'Order cancel' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedStatus('Order cancel')}>Order cancel</h3>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <i style={{ color: "#d4d4d4" }} className='fa fa-search' aria-hidden='true'></i>
          <input className={styles.input} type='search' />
        </div>
        <div className={styles.order}>
          {filteredOrders.length > 0 ? (
            <Table striped border hover>
              <thead style={{ backgroundColor: "#F7F7F7", border: "none" }} className={styles.headertable}>
                <tr>
                  <th style={{ width: "10%" }}>No.</th>
                  <th style={{ width: "20%" }}>Invoice <img src={sort} alt="Sort" /></th>
                  <th style={{ width: "25%" }}>Customer <img src={sort} alt="Sort" /></th>
                  <th style={{ width: "20%", textAlign: "center" }}>Total <img src={sort} alt="Sort" /></th>
                  <th style={{ width: "25%", textAlign: "center" }}>Dates <img src={sort} alt="Sort" /></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.transaction_id}</td>
                    <td>{order.name}</td>
                    <td>Rp{formatRupiah(Number(order.amount))}</td>
                    <td style={{ textAlign: "center" }}>{order.date ? order.date.split("T")[0] : null}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className={styles.emptyContainer}>
              <img className={styles.empty} src={empty} alt="No orders" />
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
