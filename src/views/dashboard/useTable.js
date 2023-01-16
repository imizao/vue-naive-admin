export const integrationTable = (data, returndata) => {
    let table = []
    data.data.forEach(item => {
        let obj = {
            baseName: item.name,
        }
        for (let key in returndata) {
            // console.log(key)
            if (key == item.value) {
                obj = {
                    ...obj,
                    ...returndata[key],
                }
                table.push(obj)
            }
            // console.log(`${key}: ${returndata[key]}`);
        }
        
    });
    // console.log(table)
    return table;
    // console.log(data)
    // console.log(returndata)
    
}

export const decouplingTable = () => {

}