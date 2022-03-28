import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { flow } from './slices/FlowSlice';

const reducer = combineReducers({
  flow: flow.reducer
})
export const store = configureStore({reducer});