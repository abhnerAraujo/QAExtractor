function clearEmpty(array:Array<any>) {
    let _array = [];
    array.forEach( element => {
        if(element || element != ""){
            _array.push(element);
        }
    })
    return _array;
}

export const OPERATIONS = {
    clearEmpty
}