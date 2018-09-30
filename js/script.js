class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  // addToList() {
  //   const List = React.createClass({
  //     render: () => {
  //       return (
  //         <li>{this.print()}</li>
  //       );
  //     }
  //   });
  //   const elem = React.createElement(List);
  //   ReactDOM.render(elem, document.querySelector('.results'));
  // }

  addToList() {
    let list = document.querySelector('.results');
    let li = document.createElement('li');
    li.setAttribute('class', 'result');
    li.appendChild(document.createTextNode(this.format(this.times)));
    list.appendChild(li);
  }

  clearList() {
    document.querySelector('.results').innerHTML = '';
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
}

function pad0(val) {
  let result = val.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

let startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => stopwatch.start());

let stopBtn = document.querySelector("#stop");
stopBtn.addEventListener("click", () => stopwatch.stop());

let resetBtn = document.querySelector("#reset-timer");
resetBtn.addEventListener("click", () => stopwatch.reset());

let addResult = document.querySelector("#add-to-results");
addResult.addEventListener("click", () => stopwatch.addToList());

let removeResult = document.querySelector("#reset-results");
removeResult.addEventListener("click", () => stopwatch.clearList());