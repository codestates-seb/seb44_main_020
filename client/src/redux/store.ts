import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import loginReducer from './authSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
/* RootState - store에서 관리되는 모든 상태의 타입 */
export type RootState = ReturnType<typeof store.getState>;

/* AppDispatch - store의 디스패치 타입을 추론 */
export type AppDispatch = typeof store.dispatch;

/* useDispatchh는 반환하는 디스패치 함수의 타입을 추론할 수 없기 때문에 
useAppDispatch를 사용하여 반환되는 디스패치 함수의 타입을 명시적으로 지정 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
