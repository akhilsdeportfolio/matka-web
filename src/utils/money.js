export function getAmount(lines) {  
  return lines.reduce((ac, el) => ac + Number(el.stake), 0);
}
export function getAmountByLine(lines,id) {  
  return lines.filter(el=>el.id===id).reduce((ac, el) => ac + Number(el.stake), 0);
}


export const formatMoney = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR", 
  minimumFractionDigits: 0,
  maximumFractionDigits:0
});
export const formatMoneyWithDecimals = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",   
  minimumFractionDigits:2,
  maximumFractionDigits:2
});