import { createSlice } from '@reduxjs/toolkit'

const initialState = {    
}

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    paymentCreated(state, action) {
    /* const {userId,token} = action.payload
     */// "Mutating" update syntax thanks to Immer, and no `return` needed
    return {...state,...action.payload} 
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { paymentCreated} = paymentSlice.actions

// Export the slice reducer as the default export
export default paymentSlice.reducer