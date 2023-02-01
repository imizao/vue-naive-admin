export const integrationTable = (data, returndata) => {
    let table = []
    // console.log(returndata.draftDto.netProfitCityOperation)
    data.data.forEach(item => {
        let obj = {
            baseNameFrontEnd: item.name,
            compBusinessSegments: item.name
        }
        for (let key in returndata) {
            if (key == item.value) {
                let returnObj = {
                    ...returndata[key],
                }
                if(returndata.draftDto[key]) {
                    data.columns.forEach(i => {
                        // console.log(i)
                        if(returndata.draftDto[key][i.key]) {
                            // debugger
                            // console.log(returndata.draftDto[key][i.key])
                            returnObj[i.key] = returndata.draftDto[key][i.key]
                            returnObj[`${i.key}Status`] = true
                        }
                    })
                    // console.log(data.columns)
                    // console.log(returndata.draftDto[key])
                    // console.log(returndata[key])
                }
                obj = {
                    ...obj,
                    ...returnObj,
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