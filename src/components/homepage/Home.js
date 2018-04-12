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
    let periods = [...this.props.periods.map(period => period.name)];
    
    let types = ['100', '200', '300'];
    
    return (
      <div>
        <HeaderBar />
        <NavRow category="Department" parity="even" first={true} tiledata={departments} field='dept' /> 
        <NavRow category="Period" parity="odd" tiledata={periods} field='time' />
        <NavRow category="Type" parity="even" tiledata={types} field='course_num' />
        <button> Browse All </button>
      </div>
    );
  }
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
