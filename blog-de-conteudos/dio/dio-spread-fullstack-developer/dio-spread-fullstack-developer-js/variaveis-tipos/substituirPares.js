function substituirPares(array){
    if (!array) return -1;
    if (!array.length) return -1;

    for (let i = 0; i < array.length;  i++) {
        if (array[i] === 0) {
            console.log("você já é zero!!");
        } else if (array[i] % 2 === 0) {
            console.log(`substituindo ${array[i]} por 0...`);
            array[i] = 0;
        }
    }

    return array;
}

let arr = [1, 3, 0, 0, 0, 33, 23, 0];

console.log(substituirPares(arr));