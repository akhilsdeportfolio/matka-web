import data from "./gameData.js";

const names=data.map((el)=>el["product-name"]);
const set = new Set([...names]);
const req=[...set].map(el=>el)
console.log(req)