let s = 4;
if(s === 2){
    throw new RangeError('range')
} else if (s === 3){
    throw new TypeError('iska sring');
} else if(s===4){
    throw new ReferenceError('missing me?');
}

