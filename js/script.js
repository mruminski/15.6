class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
    }
  }

  addToList() {

  }

  clearList() {
    
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
  }

  calculate() {
    this.setState({miliseconds: this.state.miliseconds + 1});
    if (this.state.miliseconds >= 100) {
      this.setState({seconds: this.state.seconds + 1});
      this.setState({miliseconds: this.state.miliseconds = 0});
    }
    if (this.state.seconds >= 60) {
      this.setState({minutes: this.state.minutes + 1});
      this.setState({seconds: this.state.seconds = 0});
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  reset() {
    this.setState({minutes: this.state.minutes = 0});
    this.setState({seconds: this.state.seconds = 0});
    this.setState({miliseconds: this.state.miliseconds = 0});
  }

  format() {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  }

  render() {
    return (
      <div>
        <nav className='controls'>
          <a
            href='#'
            className='controls__btn'
            onClick={this.start.bind(this)}>
            Start
          </a>
          <a
            href='#'
            className='controls__btn'
            onClick={this.stop.bind(this)}>
            Stop
          </a>
          <a
            href='#'
            className='controls__btn'
            onClick={this.reset.bind(this)}>
            Reset timer
          </a>
          <a
            href='#'
            className='controls__btn'
            onClick={this.addToList.bind(this)}>
            Add to results
          </a>
          <a
            href='#'
            className='controls__btn'
            onClick={this.clearList.bind(this)}>
            Reset results
          </a>
        </nav>
        <div className='stopwatch'>
          {this.format()}
        </div>
        <ul className='results'>
          <li className='result'>
            
          </li>
        </ul>
      </div>
    );
  }
}

function pad0(val) {
  let result = val.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(
  <Stopwatch />,
  document.querySelector('#App')
);