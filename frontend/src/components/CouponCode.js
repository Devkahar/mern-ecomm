import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import Modals from "./Modals"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CircularProgress } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
const CouponCode = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      if(props.isValid !== 'success'){
        setOpen(true);
      }
    };
      const handleClose = () => {
        setOpen(false);
      };
      const submit =()=>{
        setOpen(false)
        props.submitHandler()
      }
      const [gopen, setGopen] = useState(false);
    return (
        <>
            <ListGroup.Item className="box coupon flex" onClick={handleClickOpen}>
                {
                  props.loading ?<><span>Apply Coupon Code</span> <span><CircularProgress /></span></> 
                  :
                  props.isValid === ''?
                <>
                <span>Apply Coupon Code</span> <span><ChevronRightIcon/></span>
                </>
                : props.isValid === 'success'? <><span className="text-success">Coupon Applied &nbsp;
                 <span className="text-danger"><strong>"{props.code}"</strong></span>
                </span>
                
                  <div style={{ color: 'red'}} onClick={props.removeCoupon}>
                  <CancelIcon/>
                  </div>
                </>
                :<span className="text-danger">Invalid Coupon</span>
                }
            </ListGroup.Item>
            <Modals
                title={'Apply Coupoun'}
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

export default CouponCode