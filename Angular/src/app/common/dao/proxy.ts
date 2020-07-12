export class Proxy {
    constructor(
        public msLogin:string = "http://localhost:9999/msLogin", 
        public msStats:string = "http://localhost:9998/msStats",
        public msCP:string = "http://localhost:9997/msCP"){ }
}
