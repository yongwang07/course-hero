import React, { Component } from 'react';
import './App.css';
import InputComponent from './InputComponent';

const CourseInfoComponent = ({ data }) => {
  return data.map(data => (
    <div key={`${data.department}${data.course}`} className="Course-info">
    {data.error && <div>{data.error}</div>}
    {data.department && <div>Department: <b>{data.department}</b></div>}
    {data.course && <div>Course Number: <b>{data.course}</b></div>}
    {data.year && <div>Year: <b>{data.year}</b></div>}
    {data.semester && <div>Semester: <b>{data.semester}</b></div>} 
  </div>
  ))
}

  /*return (
    <div className="Course-info">
        {data.error && <div>{data.error}</div>}
        {data.department && <div>Department: <b>{data.department}</b></div>}
        {data.course && <div>Course Number: <b>{data.course}</b></div>}
        {data.year && <div>Year: <b>{data.year}</b></div>}
        {data.semester && <div>Semester: <b>{data.semester}</b></div>} 
    </div>
  )
}*/

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
    this.onParse = this.onParse.bind(this);
  }
  onParse(courseInfo) {
    if (!!courseInfo.department) {
      let found = false;
      for (let i = 0; i < this.state.data.length; i++) {
        const { department, course } = this.state.data[i];
        if (department === courseInfo.department && course === courseInfo.course) {
          found = true;
          break;
        }
      }
      if (!found) {
        const newList = [...this.state.data, courseInfo];
        newList.sort(this.compare)
        this.setState({ data: newList} );
      }
    }
    //this.setState({data: courseInfo});
  }
  compare(coursea, courseb) {
    const keys = ['year', 'semester', 'department', 'course'];
    const semesterMap = { Fall : 4, Winter: 3, Spring: 2, Summer: 1}; //score map
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (coursea[key] !== courseb[key]) {
        if (key === 'semester') { //correct
          return semesterMap[coursea[key]] - semesterMap[courseb[key]];
        }
        return coursea[key].localeCompare(courseb[key]); //year 
      }
    }
    return 0;
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
