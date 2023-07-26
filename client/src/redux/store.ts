import { configureStore } from '@reduxjs/toolkit';
import showDeletReducer from '@/redux/features/deleteSlice';
import loginReducer from '@/redux/features/loginSlice';
import draggingReducer from '@/redux/features/dragSlice';
import commentReducer from '@/redux/features/commentSlice';
import starReducer from '@/redux/features/starSlice';
import authReducer from '@/redux/features/authSlice';
import answerListReducer from '@/redux/features/answerListSlice';
import questionIdReducer from '@/redux/features/questionIdSlice';

export const store = configureStore({
  reducer: {
    showDelete: showDeletReducer,
    loginState: loginReducer,
    drag: draggingReducer,
    comment: commentReducer,
    star: starReducer,
    auth: authReducer,
    answerList: answerListReducer,
    questionId: questionIdReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
