import {type TypedUseSelectorHook, useDispatch} from "react-redux";
import {type AppDispatch, type RootState} from '@/redux/store'
import {useSelector} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();