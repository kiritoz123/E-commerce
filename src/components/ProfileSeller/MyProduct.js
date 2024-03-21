import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import styles from "./myproduct.module.css";
import empty from "../../assets/image/emptyproduct.png";
import sort from "../../assets/image/sort.png";

export default function MyProduct() {
  const { dataGetProdBySelId } = useSelector((state) => state.product);
  const [selectedMenu, setSelectedMenu] = useState('All items'); // State để theo dõi mục được chọn

  function formatRupiah(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const filteredProducts = dataGetProdBySelId?.filter((item) => {
    if (selectedMenu === 'Sold out') {
      return item.qty === 0; // Lọc sản phẩm đã bán hết
    } else if (selectedMenu === 'Archieved') {
      return item.archieved === true; // Giả sử mỗi sản phẩm có trường 'archieved' để xác định nó có bị lưu trữ không
    }
    return true; // Mặc định trả về tất cả sản phẩm
  }) || [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h6 className={styles.title}>My product</h6>
        <div className={styles.menu}>
          <h3 className={selectedMenu === 'All items' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedMenu('All items')}>All items</h3>
          <h3 className={selectedMenu === 'Sold out' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedMenu('Sold out')}>Sold out</h3>
          <h3 className={selectedMenu === 'Archieved' ? styles.menuactive : styles.menuinactive} onClick={() => setSelectedMenu('Archieved')}>Archieved</h3>
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
                  Product name <img src={sort} alt="Sort" />
                </th>
                <th style={{ width: "15%" }}>
                  Price <img src={sort} alt="Sort" />
                </th>
                <th style={{ width: "15%", textAlign: "center" }}>
                  Stock <img src={sort} alt="Sort" />
                </th>
              </tr>
            </thead>
            <tbody borderless>
              {filteredProducts.length > 0 ? filteredProducts.map((item, index) => (
                <tr key={index.toString()}>
                  <td>{item.name}</td>
                  <td>{formatRupiah(Number(item.price))}VND</td>
                  <td style={{ textAlign: "center" }}>{item.qty}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>No products found</td>
                </tr>
              )}
            </tbody>
          </Table>
          {filteredProducts.length === 0 && (
            <img className={styles.empty} src={empty} alt="No Products" />
          )}
        </div>
      </div>
    </div>
  );
}
