import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const betlinesSlice = createSlice({
  name: "betlines",
  initialState,
  reducers: {
    addBetLines(state,action){
      const {lines}=action.payload;
        return lines;
    },
    // Give case reducers meaningful past-tense "event"-style names
    addBetline(state, action) {
      /* const {userId,token} = action.payload
       */ // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.unshift(action.payload);
    }
    ,
    validate(state,action)
    {
        const {id}=action.payload;
        const mapped = state.map((el)=>{

            if(el.id===id)
            {
              if(el.name==="ank" && el.ank.length===1)
                return {...el,isValid:true}                

              if(el.name==="jodi" && el.jodi.length===2)              
                return {...el,isValid:true}
              
              if(el.name==="single-panna" && el.numbers.length===3)
                return {...el,isValid:true}

              if(el.name==="double-panna" && el.numbers.length===3)
              { 
                return {...el,isValid:true}
              }

              if(el.name==="triple-panna" && el.numbers.length===3)
              {
                 return {...el,isValid:true}
              }

              if(el.name==="half-sangam" && el.numbers.length===3)
                return {...el,isValid:true}


              if(el.name==="full-sangam" && el.openNumbers.length===3 && el.closeNumbers.length===3)
                return {...el,isValid:true}
          
              return el;
            }
            else
              return el;


        });

        return mapped;


    }
    ,
    removeBetLine(state, action) {
      const { id } = action.payload;
      const filtered = state?.filter((betline) => {
        if (betline.id !== id) return true;
        else return false;
      });
      return filtered;
    },
    updateValue(state, action) {
      const { updateKey, updateValue, id ,isValid=false} = action.payload;
      const betlines = state?.map((betLine) => {
        if (betLine.id === id) {
          if (name === "ank" || name === "jodi")
            return { ...betLine, [updateKey]: updateValue };
          else if(name==='full-sangam')
          {
            return {...betLine,[updateKey]:updateValue,isValid:isValid}
          }
          else return { ...betLine, [updateKey]: updateValue.split(""),isValid:isValid};
        } else return betLine;
      });

      return betlines;
    },
    updateStake(state, action) {
      /* const {userId,token} = action.payload
       */ // "Mutating" update syntax thanks to Immer, and no `return` needed
      const { stake, id } = action.payload;
      const betlines = state?.map((betLine) => {
        if (betLine.id === id) {
          return { ...betLine, stake };
        } else return betLine;
      });

      return betlines;
    },
    updateDrawType(state, action) {
      const { drawType, id } = action.payload;
      const betlines = state?.map((betLine) => {
        if (betLine.id === id) {
          return { ...betLine, drawType: drawType };
        } else return betLine;
      });
      return betlines;
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {
  addBetline,
  removeBetLine,
  updateStake,
  updateDrawType,
  updateValue,
  addBetLines,
  validate
} = betlinesSlice.actions;

// Export the slice reducer as the default export
export default betlinesSlice.reducer;
