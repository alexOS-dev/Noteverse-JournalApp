
import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        isSaving: false,
        messageSaved: '',
        clothes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg...
        // }
        
    },
    reducers: {
        savingNewClothe: ( state ) => { 
            state.isSaving = true;
        },
        addNewEmptyClothe: (state, action ) => {
            state.clothes.push( action.payload )
            state.isSaving = false;
        },
        setActiveClothe: (state, action ) => {
            state.active = action.payload;
        },
        setClothes: (state, action) => {
            state.clothes = action.payload;
        },
        setSaving: (state ) =>{
            state.isSaving = true;
            // TODO: mensaje de error
        },
        updateClothe: (state, action) => { // payload: note
            state.isSaving = false; 
            state.clothes = state.clothes.map( clothe => {

                if ( clothe.id === action.payload.id ) {
                    return action.payload;
                }
                return clothe;
            });
            // Todo: Mostrar msje de actualizacion
        },
        deleteClotheById: (state, action) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyClothe,
    deleteClotheById,
    savingNewClothe,
    setActiveClothe,
    setClothes,
    setSaving,
    updateClothe
} = stockSlice.actions;