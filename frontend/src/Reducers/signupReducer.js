import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SET_IS_AUTH
} from '../Actions/signupActions';

// init state for signup
const initState = {
  isLoading: false,
  isAuth: false,
  signupData: {},
  errMsg: "",
}

// the sign up reducer
const signupReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case SIGNUP_SUCCESS:
      return {
        isLoading: false,
        isAuth: true,
        signupData: action.payload,
        errMsg: "",
      }
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: false,
      };
    case SIGNUP_FAILURE:
      return {
        isLoading: false,
        isAuth: false,
        signupData: {},
        errMsg: action.payload,
      }
    default:
      return state;
  }
}

export default signupReducer;