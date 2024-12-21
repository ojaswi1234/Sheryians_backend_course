var arr = [1,2,3,4,5,6];
/*
arr.forEach(function(val){
    console.log(val + " hello");
});
*/

/*
arr.map((val) => {
    console.log(val + 10);
});
*/

/*
var r = arr.filter((val) => {
    if(val < 3){
        return true;
    }else{
        return false;
    }
})
console.log(r);
*/

/*
var obj = {
    name: "Shreyans",
    age: 21,
    city: "Mumbai"
}

Object.freeze(obj); // Now, the value can't be changed as it's fixed now
*/

async function abcd(){
var blob = await fetch('https://randomuser.me/api/');
var res = await blob.json();

console.log(res);
}

abcd();