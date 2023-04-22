import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import UserData from "./components/UserData";
import Geolocation from "./components/Geolocation";

export const App = () => {
  const [users, setUsers] = useState(null);
  const [carts, setCarts] = useState(null);
  const [products, setProducts] = useState(null);
  const [data, setData] = useState(false);

  const url1 = `https://fakestoreapi.com/users`;
  const url2 = `https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07`;
  const url3 = `https://fakestoreapi.com/products`;

  const getData = () => {
    return axios.all([axios.get(url1), axios.get(url2), axios.get(url3)]).then(
      axios.spread((a, b, c) => {
        setUsers(a.data);
        setCarts(b.data);
        setProducts(c.data);
        setData(true);
        console.log(a, b, c);
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data && <UserData users={users} carts={carts} products={products} />}
      {data && <Geolocation users={users} />}
    </>
  );
};
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
