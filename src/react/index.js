import React from 'react'
import ReactDom from 'react-dom'
import NumAddByBit from 'numaddbybit'
class TestReact extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Counter: null,
      Form: null,
      Text: null
    }
  }

  componentDidMount () {
    console.log('testFor', NumAddByBit('343434', '47494'))
  }

    handleImportCounter = () => {
      import('./counter.jsx').then(counter => {
        this.setState({
          Counter: counter.default
        })
      })
    }

    handleImportForm = () => {
      import('./form.js').then(form => {
        this.setState({
          Form: form.default
        })
      })
    }

    handleTest = () => {
      import('./test.js').then((Text) => {
        this.setState({
          Text: Text.default
        })
      })
    }

    render () {
      const { Form, Counter, Text } = this.state
      return <div>
        {Counter ? <Counter /> : null}
        {Form ? <Form /> : null}
        {Text ? <Text /> : null}
        <button onClick={this.handleImportCounter}>引入Counter</button>
        <button onClick={this.handleImportForm}>引入form</button>
        <button onClick={this.handleTest}>test</button>
      </div>
    }
}

ReactDom.render(
  <TestReact />,
  document.getElementById('root')
)
