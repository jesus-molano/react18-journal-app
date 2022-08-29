import {useEffect, useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {DeleteOutline, SaveOutlined, UploadOutlined} from "@mui/icons-material";
import Swal from "sweetalert2";
import {ImageGallery} from "@/journal";
import {useForm} from "@/hooks/index.js";
import {setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles} from "@/store/index.js";

export const NoteView = () => {

  const dispatch = useDispatch();
  const {activeNote, messageSaved, isSaving} = useSelector(state => state.journal);
  const {title, body, date, onInputChange, formState} = useForm(activeNote)
  const formattedDate = useMemo(() => {
    return new Date(date).toUTCString()
  },[date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Saved', messageSaved, 'success')
    }
  }, [messageSaved]);


  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      alignItems={'center'}
      container
      direction={'row'}
      justifyContent={'space-between'}
      sx={{mb:1}}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={'light'}>{formattedDate}</Typography>
      </Grid>
      <Grid item>
        <input type="file" multiple onChange={onFileInputChange} style={{display: 'none'}} ref={fileInputRef}/>
        <IconButton color={'primary'} disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadOutlined/>
        </IconButton>
        <Button onClick={onSaveNote} disabled={isSaving} color={'primary'} sx={{padding: 2}}>
          <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type={'text'}
          variant={'filled'}
          fullWidth
          placeholder={'Something amazing'}
          label={'Title'}
          sx={{border: 'none', mb: 1}}
          name={'title'}
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type={'text'}
          variant={'filled'}
          fullWidth
          multiline
          placeholder={'What happened today?'}
          minRows={5}
          name={'body'}
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent={'end'}>
        <Button onClick={onDelete} sx={{mt:2}} color={'error'}>
          <DeleteOutline/>
          Delete
        </Button>
      </Grid>
      <ImageGallery images={activeNote.imageUrls}/>
    </Grid>
  )
}
