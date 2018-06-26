import React, { Component } from 'react';
import './App.css';
import InputComponent from './InputComponent';

const CourseInfoComponent = ({data}) => {
  return (
    <div className="Course-info">
        {data.error && <div>{data.error}</div>}
        {data.department && <div>Department: <b>{data.department}</b></div>}
        {data.course && <div>Course Number: <b>{data.course}</b></div>}
        {data.year && <div>Year: <b>{data.year}</b></div>}
        {data.semester && <div>Semester: <b>{data.semester}</b></div>} 
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
    this.onParse = this.onParse.bind(this);
  }
  onParse(courseInfo) {
    this.setState({data: courseInfo});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://www.coursehero.com/assets/img/ch_blue_logo.svg" alt="logo" />
        </header>
        <div className="Course-layout">
          <InputComponent onParse={this.onParse}/>
          <CourseInfoComponent data={this.state.data}/>
        </div>        
      </div>
    );
  }
}

export default App;
