import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import styles from "./myproduct.module.css";
import empty from "../../assets/image/emptyproduct.png";
import sort from "../../assets/image/sort.png";

export default function MyProduct() {
  const { dataGetProdByAdminId } = useSelector((state) => state.product);
  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h6 className={styles.title}>Product</h6>
        <div className={styles.menu}>
          <h3 className={styles.menuactive}>All items</h3>
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

        <div className={styles.product}>
          <Table striped border hover>
            <thead
              style={{ backgroundColor: "#F7F7F7", border: "none" }}
              className={styles.headertable}>
              <tr>
                <th style={{ width: "70%" }}>
                  Product name <img src={sort} />{" "}
                </th>
                <th style={{ width: "15%" }}>
                  Price <img src={sort} />
                </th>
                <th style={{ width: "15%", textAlign: "center" }}>
                  Stock <img src={sort} />
                </th>
              </tr>
            </thead>
            <tbody borderless>
              {dataGetProdByAdminId
                ? dataGetProdByAdminId.map((item, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{item.name}</td>
                        <td>{formatRupiah(Number(item.price))}VND</td>
                        <td style={{ textAlign: "center" }}>{item.qty}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          {dataGetProdByAdminId ? null : (
            <img className={styles.empty} src={empty} />
          )}
        </div>
      </div>
    </div>
  );
}
