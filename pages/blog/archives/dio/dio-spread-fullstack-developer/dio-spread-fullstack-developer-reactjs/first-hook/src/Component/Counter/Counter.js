export default function Counter() {
  let quantity = 0;

  function upQuantity() {
    quantity = quantity + 1;
    document.getElementById("counter-box").innerHTML = quantity;
    console.log(quantity);
  }

  return (
    <>
      <h3>Counter</h3>
      <h1 id="counter-box">{quantity}</h1>
      <button onClick={upQuantity}>Aumentar</button>
    </>
  );
}
