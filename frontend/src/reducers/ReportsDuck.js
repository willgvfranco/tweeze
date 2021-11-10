export const initialState = {
  reports: [],
  status: {
    type: '',
    description: '',
    msg: ''
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
