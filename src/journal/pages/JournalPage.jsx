import { useDispatch, useSelector } from "react-redux"
import {JournalLayout, NoteView, NothingSelectedView} from "@/journal"
import {IconButton} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import { startNewNote, savingNewNote } from "@/store/journal"

export const JournalPage = () => {
  const {isSaving, activeNote} = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(savingNewNote())
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {
        (!!activeNote)
          ? <NoteView />
          : <NothingSelectedView />
      }
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size={'large'}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position:'fixed',
          bottom: 50,
          right: 50,
      }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  )
}

