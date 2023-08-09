import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from "../components"
import { setActiveClothe } from "../../store/stock/stockSlice";
import { startSaveClothe, startUploadingFiles } from "../../store/stock";


export const ClotheView = () => {

    const dispatch = useDispatch();
    const { active:clothe, messageSaved, isSaving} = useSelector(state => state.stock);

    const { body, title, date, onInputChange, formState } = useForm( clothe );
    
    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date] )
    
    const fileInputRef = useRef();

    useEffect( ()=> {
        dispatch( setActiveClothe(formState) );

    },[formState])
    
    useEffect( ()=> {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, "success")
        }
    },[messageSaved])


    
    const onSaveClothe = () => {
        dispatch( startSaveClothe() );
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;

        dispatch( startUploadingFiles( target.files ) )

    }

    return (
    <Grid 
        container
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
    >

        <Grid item>
            <Typography fontSize={ 39 } fontWeight="ligth" >{dateString}</Typography>
        </Grid>

        <Grid item>

            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: "none" }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined/>
            </IconButton>
            
            <Button
                disabled={ isSaving }
                onClick={ onSaveClothe }
                color="primary" 
                sx={{ p: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día hoy?"
                minRows={5}
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery  images={ clothe.imageUrls }
        />

    </Grid>
  )
}
