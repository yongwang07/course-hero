import React, { Component } from 'react';

export default class InputComponent extends Component {
    constructor() {
      super();
      this.state = {
        input: ''
      };
      this.handChangeInput = this.handChangeInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      e.preventDefault();
      const input = this.state.input.trim();
      const re = [/^([a-zA-Z]+)(\s+|:|-)?(\d+)\s+([fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)\s*(\d{2}|\d{4})$/,
      /^([a-zA-Z]+)(\s+|:|-)?(\d+)\s+(\d{2}|\d{4})\s*([fF]all|[Ww]inter|[Ss]pring|[Ss]ummer|F|W|S|Su)$/]
      let match, i
      for (i = 0; i < re.length && !match; i++) {
          match = re[i].exec(input)
      }
      const m = {Su:'Summer', S:'Spring', F:'Fall', W:'Winter'}
      if (match) {
        const yearIdx = i === 1 ? 5 : 4
        const semesterIdx = i === 1 ? 4 : 5
        this.props.onParse({
          department: match[1],
          course: match[3],
          year: match[yearIdx].length === 2 ? 20 + match[yearIdx] : match[yearIdx],
          semester: match[semesterIdx].length <= 2 ? m[match[semesterIdx]] : match[semesterIdx]
        })
      } else {
        this.props.onParse({error: `invalidate input: ${input}`})
      }
    }
    handChangeInput(e) {
      this.setState({
        input: e.target.value
      });
      this.props.onParse({})
    }
    render() {
      const {input} = this.state
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <input className="App-title" placeholder="CS1111 Fall 2018" type="text" value={input} onChange={this.handChangeInput}/>
          </div>
        </form>
      )
    }
  }