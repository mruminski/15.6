class App extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      results: []
    }
  }

  addToList() {
    this.state.results.push(this.format());
  }

  clearList() {
    this.setState({results: this.state.results.splice(0, this.state.results)});
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
      this.setState({miliseconds: 0});
    }
    if (this.state.seconds >= 60) {
      this.setState({minutes: this.state.minutes + 1});
      this.setState({seconds: 0});
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  reset() {
    this.setState({minutes: 0});
    this.setState({seconds: 0});
    this.setState({miliseconds: 0});
  }

  format() {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  }

  render() {
    return (
      <div>
        <Control 
          startAction={this.start.bind(this)}
          stopAction={this.stop.bind(this)}
          resetAction={this.reset.bind(this)}
          addAction={this.addToList.bind(this)}
          clearAction={this.clearList.bind(this)}/>
        <Stopwatch time={this.format()}/>
        <ResultsList list={this.state.results}/>
      </div>
    );
  }
}

const Control = ({startAction, stopAction, resetAction, addAction, clearAction}) =>
  (<nav className='controls'>
    <Button name='Start' handleClick={startAction}/>
    <Button name='Stop' handleClick={stopAction}/>
    <Button name='Reset' handleClick={resetAction}/>
    <Button name='Add to list' handleClick={addAction}/>
    <Button name='Reset results' handleClick={clearAction}/>
  </nav>);

const Button = ({handleClick, name}) => 
  (<button className='controls__btn' onClick={handleClick}> {name} </button>);
  
const Stopwatch = ({time}) => <div className='stopwatch'>{time}</div>

const ResultsList = ({list}) => 
  (<ul className='results'>
    {(list.length > 0) && list.map(i => <li className='result'>{i}</li>)};
  </ul>)

function pad0(val) {
  let result = val.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);