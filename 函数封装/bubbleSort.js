var arr = [2,1,34,45,2,1,3,34,767,0]

function bubbleSort(arr) {
    var len = arr.length;
    for(var i=0; i<len-1; i++) {
        for(var j=0; j<len - i -1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
        console.log(arr);
    }
    return arr;
}

function swap (arr, a, b) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

console.log(bubbleSort(arr));