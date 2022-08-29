import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {setActiveNote} from "@/store";

export const SideBarItem = ({title, body, id, date, imageUrls = []}) => {

  const dispatch = useDispatch()
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.slice(0, 17) + '...' : title
  }, [title])

  const onNoteClick = () => {
    dispatch(setActiveNote({title, body, id, date, imageUrls}))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onNoteClick}>
        <ListItemIcon>
          <TurnedInNot/>
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle}/>
          <ListItemText secondary={body}/>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
