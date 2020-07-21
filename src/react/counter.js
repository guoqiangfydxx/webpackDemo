import React from 'react'
import ReactDom from 'react-dom'
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count : 1
        }
    }

    handleClick = () => {
        this.setState(state => state.count + 1)
    }

    render() {
        return <div>
            <button onClick={this.handleClick}></button>
    <span>{this.state.count}次</span>
        </div>
    }
}

export default Counter