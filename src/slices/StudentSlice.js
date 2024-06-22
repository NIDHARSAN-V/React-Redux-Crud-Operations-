// // import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



// // const initialState = {
// //     StudentList:[],
// //     SelectedStudentList:{} // for updation using selection in main page 
// // }
// // const stuslice = createSlice({
// //     name:"studentSlice",
// //     initialState:initialState,
// //     reducers:{
// //         addStudenttolist:(state,action)=>{
// //             const id = Math.random()*100;
// //             let stu = {...action.payload,id}
// //             state.StudentList.push(stu)
// //         },

// //         removeStudenttolist:(state,action)=>{
// //             state.StudentList = state.StudentList.filter((stu) => stu.id !== action.payload.id)
// //         },
// //         //read use selector

// //        updateStudenttolist(state, action) {
// //       state.StudentList = state.StudentList.map((stu) =>
// //         stu.id === action.payload.id ? action.payload : stu
// //       );
// //     },
// //       ///read 
// //         setSelectedStudent:(state,action)=>{
// //             state.SelectedStudentList = action.payload
// //         }

// //     }

// // })


// // export const {addStudenttolist,removeStudenttolist,updateStudenttolist,setSelectedStudent} = stuslice.actions

// // export default stuslice.reducer 


// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios"



// const initialState = {
//     StudentList:[],
//     SelectedStudentList:{}, // for updation using selection in main page 
//     isLoading:false,    // for successfuly recieved or not req = true   res = false
//     error:' '
// }

// //get student List from json server 

// export const getStudentsfromServer = createAsyncThunk(
//     "Students/getStudentsfromServer",
//     async function(_,rejectWithValue)   ///for error handling that is the 2nd one that is 
//     {
//         const res = await axios.get("http://localhost:8000/Students/")  //this the callback  and no args only get
//         console.log(res)
//         if(res.ok)
//             {
//                 const jsonResponse = await res.json()
//                 return jsonResponse
//             }
//             else
//             {
//                 return rejectWithValue({error:"No Student found"})
//             }
//     },


// )






// const stuslice = createSlice({
//     name:"studentSlice",
//     initialState:initialState,
//     reducers:{
//         addStudenttolist:(state,action)=>{
//             const id = Math.random()*100;
//             let stu = {...action.payload,id}
//             state.StudentList.push(stu)
//         },

//         removeStudenttolist:(state,action)=>{
//             state.StudentList = state.StudentList.filter((stu) => stu.id !== action.payload.id)
//         },
//         //read use selector

//        updateStudenttolist(state, action) {
//       state.StudentList = state.StudentList.map((stu) =>
//         stu.id === action.payload.id ? action.payload : stu
//       );
//     },
//       ///read 
//         setSelectedStudent:(state,action)=>{
//             state.SelectedStudentList = action.payload
//         }

//     },
//     //to handle the lifecycle we use extrareducers 

//     extraReducers : function(builder)
//     {
//         builder
//         .addCase(getStudentsfromServer.pending , function(state)
//     {
//       state.isLoading = true
//     })        //    "Students/getStudentsfromServer",  like this response
//      .addCase(getStudentsfromServer.fulfilled , function(state,action)    //there is type  and payload in actions 
//     {
//         state.isLoading = false
//         state.error=""
//         state.StudentList = action.payload

//     })
//     .addCase(getStudentsfromServer.rejected , function(state,action)
// {
//     state.error = action.payload.error
//     state.isLoading = false
//     state.StudentList = []
// })

//     }

// })

// /////totally the above is to load the data from the json server to front or to the reduc state 
// export const {addStudenttolist,removeStudenttolist,updateStudenttolist,setSelectedStudent} = stuslice.actions

// export default stuslice.reducer 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    StudentList: [],
    SelectedStudentList: {},
    isLoading: false,
    error: null  // Ensure error starts as null, not an empty string
};


export const getStudentsfromServer = createAsyncThunk(
    "Students/getStudentsfromServer",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8000/Students/");
            return response.data;  // Assuming response.data is an array of students
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);




//post 

export const addStudentstoServer = createAsyncThunk(
    "Students/addStudentstoServer",
    async (student, { rejectWithValue }) => {

        try {
            const response = await axios.post("http://localhost:8000/Students/", student);
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);
//for upadate send url along with id 
///update 

export const updateStudentstoServer = createAsyncThunk(
    "Students/updateStudentstoServer",
    async (student, { rejectWithValue }) => {

        try {
            const response = await axios.patch(`http://localhost:8000/Students/${student.id}`, student);
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);


//delete 

export const deleteStudentstoServer = createAsyncThunk(
    "Students/deleteStudentstoServer",
    async (student, { rejectWithValue }) => {

        try {
            const response = await axios.delete(`http://localhost:8000/Students/${student.id}`, student);
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);






const studentSlice = createSlice({
    name: "studentSlice",
    initialState: initialState,
    reducers: {
        addStudenttolist: (state, action) => {
            const id = Math.random() * 100;
            let stu = { ...action.payload, id };
            state.StudentList.push(stu);
        },
        removeStudenttolist: (state, action) => {
            state.StudentList = state.StudentList.filter((stu) => stu.id !== action.payload.id);
        },
        updateStudenttolist: (state, action) => {
            state.StudentList = state.StudentList.map((stu) =>
                stu.id === action.payload.id ? action.payload : stu
            );
        },
        setSelectedStudent: (state, action) => {
            state.SelectedStudentList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentsfromServer.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error state
            })
            .addCase(getStudentsfromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.StudentList = action.payload; // Assuming payload is the array of students
            })
            .addCase(getStudentsfromServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error; // Set error message if rejected
                state.StudentList = []; // Reset StudentList on error
            })
            .addCase(addStudentstoServer.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error state
            })
            .addCase(addStudentstoServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.StudentList.push(action.payload);

            })
            .addCase(addStudentstoServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error; // Set error message if rejected
                // Reset StudentList on error
            })
            .addCase(updateStudentstoServer.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error state
            })
            .addCase(updateStudentstoServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.StudentList = state.StudentList.map((stu) =>
                    stu.id === action.payload.id ? action.payload : stu
                );

            })
            .addCase(updateStudentstoServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error; // Set error message if rejected
                // Reset StudentList on error
            })
            .addCase(deleteStudentstoServer.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error state
            })
            .addCase(deleteStudentstoServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;

            })
            .addCase(deleteStudentstoServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error; // Set error message if rejected
                // Reset StudentList on error
            });

    }
});

export const { addStudenttolist, removeStudenttolist, updateStudenttolist, setSelectedStudent } = studentSlice.actions;

export default studentSlice.reducer;
//mostly use pennding lifecycle for spinners while loading



///keep in mind action payload  is the response  from the json server or any  other 