function area(length) {
    return length * length;
}

function testCallBack(callBackFun) {
    return callBackFun(20);
}

let x = testCallBack(area);
console.log(x);