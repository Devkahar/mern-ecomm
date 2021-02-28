import { FormControlLabel, FormGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import { updateCoupon, couponDetails as cd } from "../actions/couponActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { COUPON_UPDATE_RESET } from "../constants/couponConstants";
const CouponScreen = ({ match, history }) => {
  const couponId = match.params.id;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [usedCount, setUsedCount] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [limit, setLimit] = useState(0);

  const dispatch = useDispatch();

  const couponDetail = useSelector((state) => state.couponDetails);
  const { loading, error, couponDetails } = couponDetail;

  const couponUpdate = useSelector((state) => state.couponUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = couponUpdate;
  const coupon = couponDetails?.couponDetails;
  useEffect(() => {
    
    if (success) {
      dispatch({ type: COUPON_UPDATE_RESET });
      history.push("/admin/couponList");
    } else if (
      !couponDetails?.couponDetails.couponCode ||
      couponDetails?.couponDetails._id !== couponId
    ) {
      dispatch(cd(couponId));
    } else {
      setCouponCode(coupon.couponCode);
      setDiscount(coupon.discount);
      setUsedCount(coupon.couponUsed);
      setIsValid(coupon.valid);
      setLimit(coupon.limit);
    }
  }, [dispatch, couponDetails, success]);
  const toggleChecked = () => {
    
    setIsValid((prev) => !prev);
  };
  const updateCouponHandler = (e) => {
    e.preventDefault();
    dispatch(updateCoupon(couponId, couponCode, discount, limit, isValid));
  };

  return (
    <>
      <Link to="/admin/couponList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Coupon</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          error && <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={updateCouponHandler}>
            <Form.Group controlId="couponCode">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CouponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="usedCoupon">
              <Form.Label>Coupon Used</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter used"
                value={usedCount}
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="usedCoupon">
              <Form.Label>
                {isValid ? "COUPON IS ACTIVE" : "COUPON IS NOT ACTIVE"}
              </Form.Label>
              <br />
              <FormControlLabel
                control={<Switch checked={isValid} onChange={toggleChecked} />}
                label=""
              />
            </Form.Group>
            <Form.Group controlId="discount">
              <Form.Label>Limit</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Discount"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CouponScreen;
