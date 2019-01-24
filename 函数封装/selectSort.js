var arr = [2,1,34,45,2,1,3,34,767,0]

function selectSort(arr) {
    var len = arr.length;
    for(var i=0; i<len-1; i++) {
        for(var j=i+1; j<len; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
        // console.log(arr);
    }
    return arr;
}

function swap (arr, a, b) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

console.log(selectSort(arr));