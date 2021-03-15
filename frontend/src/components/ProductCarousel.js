import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    
      <Carousel fade pause='hover' className='bg' style={{overflow: 'hidden',width: '100%', height: '100%'}}>
        {/* {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} className="d-block w-100" fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))} */}
        <Carousel.Item >
              <img className="d-block" src="https://cdn.shopify.com/s/files/1/1893/6343/files/Banner_6_1_d00a9275-4353-47de-848c-c08544452b77_1512x.jpg?v=1609746333" />
        </Carousel.Item>
        
      </Carousel>
  )
}

export default ProductCarousel
