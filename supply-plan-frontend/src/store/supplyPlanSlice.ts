import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface SupplyPlanItem {
    medication_id: number
    name: string
    dosage: string
    frequency: string
    duration: string
    price: number
    total_doses: number
    status: string
}

interface SupplyPlanState {
    items: SupplyPlanItem[]
    loading: boolean
    error: string | null
}

const initialState: SupplyPlanState = {
    items: [],
    loading: false,
    error: null,
}

const supplyPlanSlice = createSlice({
    name: 'supplyPlan',
    initialState,
    reducers: {
        fetchSupplyPlanStart(state) {
            state.loading = true
            state.error = null
        },
        fetchSupplyPlanSuccess(state, action: PayloadAction<SupplyPlanItem[]>) {
            state.items = action.payload
            state.loading = false
        },
        fetchSupplyPlanFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchSupplyPlanStart,
    fetchSupplyPlanSuccess,
    fetchSupplyPlanFailure,
} = supplyPlanSlice.actions

export default supplyPlanSlice.reducer
