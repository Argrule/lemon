const ADD = "ADD";
const MINUS = "MINUS";

const INITIAL_STATE = {
  num: 0,
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
}

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};

// 异步的 action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}
