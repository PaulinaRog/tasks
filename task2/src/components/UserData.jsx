import React from "react";

export default function UserData({ users, carts, products }) {
  const cart = carts.map((c) => c.userId);

  const usersReduced = cart.reduce((acc, c) => {
    if (!acc.includes(c)) {
      acc.push(c);
    }
    return acc;
  }, []);

  const reducedUsernames = users
    .filter((u) => usersReduced.includes(u.id))
    .map((u) => u.name);

  const userFullName = reducedUsernames.map(
    (u) => `${u.firstname} ${u.lastname}`
  );

  const userProducts = carts.reduce((acc, cart) => {
    const userId = cart.userId;
    const items = cart.products.map((product) => ({
      id: product.productId,
      name: products.find((p) => p.id === product.productId)?.title,
      quantity: product.quantity,
    }));
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId] = acc[userId].concat(items);
    return acc;
  }, {});

  const userProductNames = Object.keys(userProducts).map((userId) => {
    const products = userProducts[userId];
    const userName = userFullName[userId - 1];
    const productNames = products.map((product) => {
      return `${product.name} (quantity: ${product.quantity})`;
    });
    return {
      userId,
      userName,
      productNames,
    };
  });

  const allcategories = products.map((p) => p.category);
  const categories = allcategories.reduce((acc, category) => {
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, []);

  let highestValue = 0;
  let highestCartOwner = "";
  for (const cart of carts) {
    let cartValue = 0;
    for (const product of cart.products) {
      const matchingProduct = products.find((p) => p.id === product.productId);
      cartValue += matchingProduct.price * product.quantity;
    }
    if (cartValue > highestValue) {
      highestValue = cartValue;
      highestCartOwner = userFullName[cart.userId - 1];
    }
  }

  return (
    <>
      <h1>User, product and shopping cart data:</h1>
      <>
        {userProductNames.map((userProduct) => (
          <div key={userProduct.userId}>
            <h2>{userProduct.userName}</h2>
            <ul>
              {userProduct.productNames.map((productName, idx) => (
                <li key={idx}>{productName}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
      <h1>Categories:</h1>
      <ul>
        <>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </>
      </ul>
      <div>
        <h1>Cart with highest value:</h1>
        <p>Owner: {highestCartOwner}</p>
        <p>Value: {highestValue}</p>
      </div>
    </>
  );
}
