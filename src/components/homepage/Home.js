import React from 'react';
import { connect } from 'react-redux';
import { fetchCourses, fetchPeriods } from '../../actions';
import HeaderBar from './HeaderBar'
import NavRow from './NavRow'
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      courses: [], 
      periods: [] 
    };
  }

  componentWillMount() {
    this.props.fetchCourses();
    this.props.fetchPeriods();
  }

  render() {

    let courses = this.props.courses;
    let departments = [...new Set(courses.map(course => course.dept))];
    let dept_objs = departments.map(dept => {
      return {'dept': dept};
    });
    let periods = this.props.periods.map(period => period.name);
    let periodTimes = this.props.periods.map(period => getTimesFromPeriod(period));
    let types = ['100', '200', '300'];
    let type_objs = [
      {'course_num': '100'},
      {'course_num': '200'},
      {'course_num': '300'}
    ];
    
    return (
      <div>
        <HeaderBar />
        <NavRow category="Department" parity="even" first={true} displaydata={departments} querydata={dept_objs}/>
        <NavRow category="Period" parity="odd" displaydata={periods} querydata={periodTimes} />
        <NavRow category="Type" parity="even" displaydata={types} querydata={type_objs} />
        <button> Browse All </button>
      </div>
    );
  }
}

function getTimesFromPeriod(period) {
  let timeList = Object.keys(period).map(key => {
    if(getDates().includes(key)) {
      let start = "sched." + key + ".start";
      let end = "sched." + key + ".end";
      let res = {};
      res[start] = period[key]['start'];
      res[end] = period[key]['end'];
      return res;
    }
  }).filter(x => x !== undefined);

  return Object.assign({}, ...timeList);
}

function getDates(){
  return ["mon", "tue", "wed", "thu", "fri"];
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    periods: state.periods
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCourses: () => dispatch(fetchCourses()),
    fetchPeriods: () => dispatch(fetchPeriods())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
