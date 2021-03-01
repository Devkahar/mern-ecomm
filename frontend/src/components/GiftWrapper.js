import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import Modals from "./Modals"
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
const GiftWrapper = (props) => {
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        if(props.checked && !props.content){
            setOpen(true);
        }
    },[props.checked])
    const handleClickOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        props.rejectHandler()
        setOpen(false);
      };
      const submit =()=>{
        setOpen(false)
        props.submitHandler()

      }
    return (
        <>
            <ListGroup.Item className="box coupon flex fl-res">
            <div className="">
            <span><Checkbox
              defaultChecked
              color="primary"
              checked={props.checked}
              onChange={props.handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            </span>
            <span>Gift Wrapper For ₹ 75</span>
            
            </div>
            {(props.checked && props.content) ?<Button color="primary" onClick={handleClickOpen}>Edit Message</Button>:null}
            </ListGroup.Item>
            <Modals
                title={'Add Your Custom Message'}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                btnText={'SAVE MESSAGE'}
                submitHandler={submit}
            >
             {props.children}
            </Modals>
        </>
    )
}

export default GiftWrapper