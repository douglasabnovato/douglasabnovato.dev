const main = (params) => {
    // Code here
    let allFats = [0, 1, 2, 6, 24, 120, 720, 5040, 40320,362880]
    
    let initial = 500000
    
    let result = initial
    
    for (let i = 0; i < allFats.length; i++) {
        result = result - allFats[i]
    } 
    
    //console.log(result)
    return result
    
}

main("douglas")