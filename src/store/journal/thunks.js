import {collection, doc, setDoc, deleteDoc} from 'firebase/firestore/lite'
import { firebaseDB } from '@/firebase/config'
import {
  addNewEmptyNote,
  deleteNoteById, savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from './journalSlice'
import {fileUpload, loadNotes} from '@/helpers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch( savingNewNote() );
    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const docRef = doc(collection(firebaseDB, `${uid}/journal/notes`))
    await setDoc(docRef, newNote)

    newNote.id = docRef.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if(!uid) throw new Error('No uid')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async(dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { activeNote } = getState().journal
    const noteToFirestore = { ...activeNote }
    delete noteToFirestore.id
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`)
    await setDoc(docRef, noteToFirestore, { merge: true })
    dispatch(updateNote(activeNote))
  }
}

export const startUploadingFiles = (files = []) => {
  return async(dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }
    const photosUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth
    const { activeNote } = getState().journal
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`)
    await deleteDoc(docRef)
    dispatch(deleteNoteById(activeNote.id))
  }
}
