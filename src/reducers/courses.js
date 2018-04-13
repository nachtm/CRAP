function courses(state = { courses: [], savedCourses: [], periods: [] }, action) {
  switch (action.type) {
    case 'REQUEST_COURSES':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_COURSES':
      return Object.assign({}, state, {
        isFetching: false,
        courses: action.courses,
        lastUpdated: action.receivedAt
      })
    case 'SAVE_COURSE':
      return Object.assign({}, state, {
        savedCourses: [
          ...state.savedCourses,
          action.id
        ]
      })
    case 'REQUEST_PERIODS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_PERIODS':
      return Object.assign({}, state, {
        isFetching: false,
        periods: action.periods,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default courses;
