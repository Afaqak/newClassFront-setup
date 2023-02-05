import { courseActionType } from "./courses.actions.t";

const initialState = {
    courses: [],
}

export const coursesReducer=(state=initialState,action)=>{
    switch(action.type){
        case courseActionType.SET_COURSES:
            return {
                ...state,
                courses: action.payload
            };
        default :
        return state;
    }
}


