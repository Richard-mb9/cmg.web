import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "1px solid #aaa",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  message: string;
}

export default function ModalInfo(props: IProps) {
    const { open, setOpen, message } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
        >
            <Box sx={{ ...style}}>
                <Box>
                    <p>{message}</p>
                </Box>
                <Box sx={{textAlign: 'center' }}>
                    <Button onClick={handleClose} variant="contained">
                        ok
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
