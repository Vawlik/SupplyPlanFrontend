import { configureStore } from '@reduxjs/toolkit'
import supplyPlanReducer from './supplyPlanSlice.ts'

export const store = configureStore({
    reducer: {
        supplyPlan: supplyPlanReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
