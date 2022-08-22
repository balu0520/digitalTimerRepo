// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timerInMin: 25, TimerInSec: 0, isProgress: false}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerInMin} = this.state

    if (timerInMin > 1) {
      this.setState(prevState => ({
        timerInMin: prevState.timerInMin - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerInMin: prevState.timerInMin + 1,
    }))

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({timerInMin: 25, TimerInSec: 0, isProgress: false})
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerInMin, TimerInSec} = this.state
    const isTimerCompleted = TimerInSec === timerInMin * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isProgress: false})
    } else {
      this.setState(prevState => ({
        TimerInSec: prevState.TimerInSec + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isProgress, TimerInSec, timerInMin} = this.state
    const isTimerCompleted = TimerInSec === timerInMin * 60

    if (isTimerCompleted) {
      this.setState({TimerInSec: 0})
    }
    if (isProgress) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isProgress: !prevState.isProgress}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerInMin, TimerInSec} = this.state
    const totalRemainingSeconds = timerInMin * 60 - TimerInSec
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  renderTimerLimitController = () => {
    const {timerInMin, TimerInSec} = this.state
    const isButtonsDisabled = TimerInSec > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerInMin}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isProgress} = this.state
    const imgUrl = isProgress
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isProgress ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img src={imgUrl} alt={altText} className="timer-controller-icon" />
          <p className="timer-controller-label">
            {isProgress ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  render() {
    const {isProgress} = this.state
    const status = isProgress ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="container">
          <div className="container-1">
            <div className="container-2">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">{status}</p>
            </div>
          </div>
          <div className="container-3">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
