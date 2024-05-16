import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import styles from "./myproduct.module.css";
import empty from "../../assets/image/emptyproduct.png";
import sort from "../../assets/image/sort.png";

export default function AdminCustomer() {
  const { dataGetCusByAdminId } = useSelector((state) => state.product);
  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h6 className={styles.title}>Customer</h6>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <i
            style={{ color: "#d4d4d4" }}
            className='fa fa-search'
            aria-hidden='true'></i>
          <input className={styles.input} type='search' />
        </div>

        <div className={styles.product}>
          <Table striped border hover>
            <thead
              style={{ backgroundColor: "#F7F7F7", border: "none" }}
              className={styles.headertable}>
              <tr>
                <th style={{ width: "70%" }}>
                  Email <img src={sort} />{" "}
                </th>
                <th style={{ width: "15%" }}>
                  Name <img src={sort} />
                </th>
                <th style={{ width: "15%", textAlign: "center" }}>
                  Password <img src={sort} />
                </th>
              </tr>
            </thead>
            <tbody borderless>
              {dataGetCusByAdminId
                ? dataGetCusByAdminId.map((item, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td style={{ textAlign: "center" }}>{item.qty}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          {dataGetCusByAdminId ? null : (
            <img className={styles.empty} src={empty} />
          )}
        </div>
      </div>
    </div>
  );
}