/* eslint-disable import/no-anonymous-default-export */
import {
    NUM_MIN_ALTERADO,
    NUM_MAX_ALTERADO
} from "../actions/actionTypes"

const initialState = {
    min: 7,
    max: 31,
  }

export default function (state = initialState, action) {
    switch(action.type){
      case NUM_MIN_ALTERADO:
        return {
          ...state,
          min: action.payload
        }
      case NUM_MAX_ALTERADO:
        return {
          ...state,
          max: action.payload
        }
      default: 
        return state
    } 
  }