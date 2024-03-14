import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {Avatar} from "@mui/material";
import {blue} from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import PropTypes from "prop-types";


const emails = ['username@gmail.com', 'user02@gmail.com'];


SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function SimpleDialog(props: any) {
    const {onClose, open} = props;

    const handleClose = () => {
        // onClose(selectedValue);
        console.log('close')
    };

    const handleListItemClick = (value: any) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{pt: 0}}>
                {emails.map((email) => (
                    <ListItem
                        onClick={() => handleListItemClick(email)}
                        key={email}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                <PersonIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email}/>
                    </ListItem>
                ))}

                <ListItem onClick={() => handleListItemClick('addAccount')}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account"/>
                </ListItem>
            </List>
        </Dialog>
    );
}

export default SimpleDialog;