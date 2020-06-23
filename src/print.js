export default function PrintMe() {
    console.log('I got called from print.js')
    console.error('get error from print')
}

export function square(x) {
    return x * x;
  }
  
  export function cube(x) {
    return x * x * x;
  }