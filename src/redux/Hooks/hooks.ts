import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '../store';

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;