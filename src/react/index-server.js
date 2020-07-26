// import React from 'react'
const React = require('react')
// import NumAddByBit from 'numaddbybit'
// const NumAddByBit = require('numaddbybit')
// Cannot assign to read only property 'exports' of object '#<Object>'--提示这个错误是因为
// 我们导出是exports，但是导入的时候使用的import语法，需要改成require
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
    // console.log('testFor', NumAddByBit('343434', '47494'))
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
module.exports = <TestReact />
// srr打包实现css无法解析的解决方案是直接将生产的template引入进去，因为这template模板文件
// 已经自动引入了css文件

// 插入的内容需要使用占位符，用一个注释的占位符，然后将插入的内容替换掉这个带注释的占位符
// 从服务端读取的数据也是需要使用占位符将其挂载在window的一个属性上，然后再客户端可以直接读取这个对象