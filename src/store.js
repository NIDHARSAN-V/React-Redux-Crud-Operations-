import { configureStore } from "@reduxjs/toolkit"
import studentreducer from "./slices/StudentSlice"

export const store = configureStore({


    reducer: {
        Students: studentreducer
    }



})


export default store
