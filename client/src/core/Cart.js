import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelper';
import Card from './Card';
import Checkout from './Checkout';
 
const Cart = () => {
  const [items, setItems] = useState([]);
  // const [cartSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);
 
  useEffect(() => {
    console.log('MAX DEPTH ...');
    setItems(getCart());
  }, [run]);
 
  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
 
  const noItemsMessage = () => (
    <h2>
      Your Cart is empty. <br />
      <Link to="/shop"> Continue shopping. </Link>
    </h2>
  );
 
  return (
    <Layout title="Shopping Cart" description="Checkout now!" className="container-fluid">
      <div className="row">
        <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} run={run} setRun={setRun}/>
        </div>
      </div>
    </Layout>
  );
};
 
export default Cart;
