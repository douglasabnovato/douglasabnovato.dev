import { useState } from "react";

function Smartcounter() {
  const [quantity, setUpQuantity] = useState(0);

  return (
    <>
      <h3>Smartcounter</h3>
      <h1>{quantity}</h1>
      <button onClick={() => setUpQuantity(quantity + 1)}>Aumentar</button>
    </>
  );
}

export default Smartcounter;
