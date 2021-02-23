import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import Modals from "./Modals"
const GiftWrapper = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const submit =()=>{
        setOpen(false)
        props.submitHandler()
      }
    return (
        <>
            <ListGroup.Item className="box coupon" onClick={handleClickOpen}>
            <span>Gift Wrapper For ₹ 75</span><span>{}</span>
            </ListGroup.Item>
            <Modals
                title={'Add Your Custom Message'}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                btnText={'Apply'}
                submitHandler={submit}
            >
             {props.children}
            </Modals>
        </>
    )
}

export default GiftWrapper
