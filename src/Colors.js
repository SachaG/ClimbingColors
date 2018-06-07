import React, { Component } from 'react';
import sample from 'lodash/sample';
import without from 'lodash/without';
import './Colors.css';
import tinycolor from 'tinycolor2';
// import posed, { PoseGroup } from 'react-pose';

const colors = {
  red: '#EB5757',
  orange: '#F2994A',
  purple: '#9B51E0',
  blue: '#2F80ED',
  black: '#444444',
  white: '#E0E0E0',
  yellow: '#F2C94C',
  green: '#27AE60',
  pink: '#F7ABF4',
};

const hands = ['left', 'right'];

const holds = ['sloper', 'crimp', 'jug', 'pinch', 'under', 'gaston', 'match'];

// const config = {
//   start: { bottom: 0, transition: { duration: 5000, ease: 'linear' } },
//   end: { bottom: '100%' }
// }

// const Timer = posed.div(config);

class Colors extends Component {
  state = {
    duration: 5,
    selectedColors: Object.keys(colors),
  };

  toggleColor = value => {
    const newColors = this.state.selectedColors.includes(value) ? without(this.state.selectedColors, value) : [...this.state.selectedColors, value];
    this.setState({ selectedColors: newColors });
  }

  updateDuration = event => {
    this.setState({ duration: parseInt(event.target.value)});
  }
  resetTimer = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    this.intervalId = setInterval(this.resetTimer, 5000);
  }

  isBonusRound = () => {
    const percentChance = 30;
    return Math.round(Math.random() * 100) < percentChance;
  };

  getRandomColor = () => {
    const name = sample(this.state.selectedColors);
    return { name, value: colors[name] };
  };

  getRandomHand = () => {
    return sample(hands);
  };

  getRandomHold = () => {
    return sample(holds);
  };

  render() {
    const { name, value } = this.getRandomColor();
    const hand = this.getRandomHand();
    const hold = this.getRandomHold();
    const isBonus = this.isBonusRound();

    let bgColor = tinycolor(value);
    bgColor.setAlpha(0.3);
    const backgroundColor = isBonus ? '#222' : bgColor.toRgbString();

    return (
      <div className="colors" style={{ backgroundColor }}>
        {/* <Timer className="timer"/> */}
        <div className="timer" style={{ animationDuration: `${this.state.duration}s` }}/>
        <div className="inner">
          <div/>
          <div className="message">
            <span className="hand">{hand}</span>{' '}
            {isBonus ? (
              <span className="hold" style={{ color: '#fff' }}>{hold}</span>
            ) : (
              <span className="color" style={{ color: value }}>
                {name}
              </span>
            )}
          </div>
          <div className="options">
            <div className="duration-selector">
              <input type="text" value={this.state.duration} onChange={this.updateDuration}/> seconds
            </div>
            <div className="color-selector">
              {Object.keys(colors).map(c => 
                <div key={c} className="color-option"><label><input type="checkbox" onChange={() => this.toggleColor(c)} checked={this.state.selectedColors.includes(c)} value={c}/> {c}</label></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Colors;
