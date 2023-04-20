export function transfromListToSelect(list) {
    let newArr = [];
    list.forEach(item => {
        newArr.push({
            'value': item.categoryIndex,
            'label': item.categoryName
        })
    });
    return newArr;
}

export function transfromSelectToAipList(list) {
    let newArr = [];
    list.forEach(item => {
        newArr.push({
            'categoryIndex': item.value,
            'categoryName': item.label,
            'categoryType': item.type
        })
    });
    return newArr;
}

export function getBasicBarData(xAxis,yAxis,data) {
    const xAxisData = [];
    const yAxisData = [];
    data.forEach((item)=>{
        xAxisData.push(item[xAxis])
        yAxisData.push(item[yAxis])
    })
    return {
        xAxis: xAxisData,
        yAxis: yAxisData
    }
}

export function transfromLinkToSelect(list) {
    let newArr = [];
    list.forEach(item => {
        newArr.push({
            'value': item.linkId,
            'label': item.linkComment,
            'connectionId': item.connectionId
        })
    });
    return newArr;
}

export function transfromSeleToList(list) {
    let newArr = [];
    list.forEach(item => {
        newArr.push({
            'linkId': item.value,
            'linkComment': item.label,
            'connectionId': item.connectionId
        })
    });
    return newArr;
}
