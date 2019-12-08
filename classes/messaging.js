export class Messaging {
  msg;
  cls;
  out;
  constructor(o, m, c) {
    this.out = o;
    this.msg = m;
    this.cls = c;
  }

  display() {
    this.out.innerHTML = `<span class ='${this.cls}'>${this.msg}</span>`;
  }
}