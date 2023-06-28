import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ModalComponent.css'

// import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   root: {
//     position: 'absolute',
//     borderRadius: '8px',
//     border: '1px solid',
//     borderColor: '#D5D9D9',
//     boxShadow: '0 0 14px 0 rgba(15,17,17,.5)',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#fff',
//   }
// }));

const style = {
  
};

const ModalComponent = (props) => {
  // const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalStatus}
        onClose={props.hideModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500, 
          },
        }}
      >
        <Fade in={props.modalStatus}>
          <Box className={"modal-box " + props.className} style={{width:props.width + 'px'}}>
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;