// Import stylesheets
const output = document.querySelector("#output");
const deccidr = document.querySelector("#deccidr");
deccidr.addEventListener("keyup", processInput);
const outdeccidr = document.querySelector("#outdeccidr");
const bincidr = document.querySelector("#bincidr");
const outbincidr = document.querySelector("#outbincidr");
const mask = document.querySelector("#mask");
mask.addEventListener("keyup", processMask);
mask.disabled = true;
const output = document.querySelector("#output");
const inputs = document.querySelectorAll("input");
const defaultMessage = "Nothing to display";
const emptyMsg = ". . .";
const clear = document.querySelector("#clear").addEventListener("click", clear);
const btns = document.querySelectorAll(".btns");
const binPlaceArr = [
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  4096,
  8192,
  16384,
  32768,
  65536,
  131072,
  262144,
  524288,
  1048576,
  2097152,
  4194304,
  8388608,
  16777216,
  33554432,
  67108864
];

class Messaging {
  msg;
  cls;
  out;
  constructor(o, m, c) {
    this.out = o;
    this.msg = m;
    this.cls = c;
  }

  display(msg, cls) {
    if (msg && cls) {
      this.msg = msg;
      this.cls = cls;
    }
    this.out.innerHTML = `<span class ='messages ${this.cls}'>${
      this.msg
    }</span>`;
  }
}

const mess = new Messaging(output, defaultMessage, "information");
mess.display();

function processInput() {
  if (!isValidDec(deccidr.value)) {
    mask.disabled = true;
    mess.display("Not a valid IP address.", "warning");
  } else {
    mask.disabled = false;
    mess.display(defaultMessage, "information");
    bincidr.value = convertBin(deccidr.value);
    mess.display("Output ready", "information");
    return;
  }
}

function processMask() {
  let tmpArr = [];
  let dotCount = 0;
  if (mask.value && isInRange(parseInt(mask.value), 0, 24)) {
    if (bincidr) {
      bincidr.value = padOutput(bincidr.value);
      outdeccidr.innerHTML = "<span class ='decNetwork'>" + processDecimal(mask.value, bincidr.value) + "</span>";
      let tmpOutputString = "<span class='subnet'>";
      tmpArr = bincidr.value.split("");
      for (let i = 0; i < tmpArr.length; i++) {
        tmpOutputString += tmpArr[i];
        if (tmpArr[i] === ".") dotCount++;
        if (i === parseInt(mask.value) + (dotCount - 1)) {
          tmpOutputString += "</span><span class ='network'>";
        }
      }
      outbincidr.innerHTML = tmpOutputString + "/" + mask.value + "</span>";
    }
  }
}

function processDecimal(msk, addr) {
  let chopped = addr.slice(msk);
  let arr = chopped.split(".");
  let decArr = arr.map(x => {
    return toDecimal(x);
  });
  return decArr.join(".");
}

function toDecimal(b) {
  let dec = 0;
  let d = b
    .split("")
    .reverse()
    .join("");
  console.log(`d ${d}`);
  for (let i = 0; i < d.length; i++) {
    if (parseInt(d[i]) === 1) {
      dec += binPlaceArr[i];
    }
  }
  console.log(`dec: ${dec}`);
  return dec;
}

function padOutput(str) {
  if (!str) return;
  let tmpArr = [];
  tmpArr = str.split(".");
  tmpArr = tmpArr.map(x => {
    if (x.length < 8) {
      return (x = append(x, "0", 8 - x.length));
    } else return x;
  });
  return tmpArr.join(".");
}

function append(str, ch, amount) {
  for (let i = 0; i < amount; i++) {
    str += ch;
  }
  return str;
}

function p(str) {
  output.innerHTML = str;
}

function pl(str) {
  output.innerHTML += `${str}<br>`;
}

function isValidDec(str) {
  const decReg = new RegExp(
    "^(?=.*[^.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).?){4}$",
    "gim"
  );
  return decReg.test(str);
}

function dec2bin(num) {
  var binaryArr = [];
  if (parseInt(num) === 0) return 0;
  while (num > 0) {
    binaryArr.unshift("" + (num % 2));
    num -= num % 2;
    num /= 2;
  }
  return binaryArr.join("");
}

function convertBin(str) {
  // NO VALIDATION
  let tmpInArr = [];
  tmpInArr = str.split(".");
  let tmpOutArr = [];

  tmpOutArr = tmpInArr.map(x => {
    return `${dec2bin(x)}`;
  });
  return tmpOutArr.join(".");
}

function isNormalInteger(str) {
  if (!str === null) {
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "") || "0";
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }
}

function isInRange(n, l, u) {
  return n >= l && n <= u ? true : false;
}

function clear() {
  if (deccidr) deccidr.value = "";
  if (bincidr) bincidr.value = "";
  if (outdeccidr) outdeccidr.innerHTML = emptyMsg;
  if (outbincidr) outbincidr.innerHTML = emptyMsg;
  if (mask) mask.value = "";
  mess.display(defaultMessage, "information");
}
