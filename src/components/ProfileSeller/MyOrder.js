import React from "react";
import { useSelector } from "react-redux";
import styles from "./myorder.module.css";
import empty from "../../assets/image/emptyorder.png";
import sort from "../../assets/image/sort.png";
import { Table } from "react-bootstrap";

export default function MyOrder() {
  const { dataGetOrderSell } = useSelector((state) => state.product);
  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h6 className={styles.title}>My order</h6>
        <div className={styles.menu}>
          <h3 className={styles.menuactive}>All items</h3>
          <h3 className={styles.menuinactive}>Get paid</h3>
          <h3 className={styles.menuinactive}>Processed</h3>
          <h3 className={styles.menuinactive}>Sent</h3>
          <h3 className={styles.menuinactive}>Completed</h3>
          <h3 className={styles.menuinactive}>Order cancel</h3>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <i
            style={{ color: "#d4d4d4" }}
            className='fa fa-search'
            aria-hidden='true'></i>
          <input className={styles.input} type='search' />
        </div>
        <div className={styles.order}>
          {dataGetOrderSell ? (
            dataGetOrderSell.length ? (
              <Table striped border hover>
                <thead
                  style={{ backgroundColor: "#F7F7F7", border: "none" }}
                  className={styles.headertable}>
                  <tr>
                    <th style={{ width: "10%" }}>No.</th>
                    <th style={{ width: "20%" }}>
                      Invoice <img src={sort} />{" "}
                    </th>
                    <th style={{ width: "25%" }}>
                      Customer <img src={sort} />
                    </th>
                    <th style={{ width: "20%", textAlign: "center" }}>
                      Total <img src={sort} />
                    </th>
                    <th style={{ width: "25%", textAlign: "center" }}>
                      Dates <img src={sort} />
                    </th>
                  </tr>
                </thead>
                <tbody borderless>
                  {dataGetOrderSell.map((item, index) => {
                    // let dates = item.date;
                    return (
                      <tr key={index.toString()}>
                        <td>{index + 1}</td>
                        <td>{item.transaction_id}</td>
                        <td>{item.name}</td>
                        <td>Rp{formatRupiah(Number(item.amount))}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.date
                            ? item.date.toString().split("T")[0]
                            : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <img className={styles.empty} src={empty} alt='' />
            )
          ) : (
            <img className={styles.empty} src={empty} alt='' />
          )}
        </div>
      </div>
      {/* Content */}
      {/* ............... */}
    </div>
  );
}
