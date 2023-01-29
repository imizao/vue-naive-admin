export const integrationTable = (data, returndata) => {
    let table = []
    data.data.forEach(item => {
        let obj = {
            baseName: item.name,
            compBusinessSegments: item.name
        }
        for (let key in returndata) {
            if (key == item.value) {
                obj = {
                    ...obj,
                    ...returndata[key],
                }
                table.push(obj)
            }
        }
    });
    return table;

}

export const decouplingTable = (data, statedata) => {
    let obj = {}
    data.data.forEach(item => {
        statedata.forEach(i => {
            if (i.baseName == item.name) {
                obj[item.value] = { ...i }
            }
        })
    })
    return obj;
}