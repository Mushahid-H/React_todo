import React from 'react'
import './Product.css'
import { useEffect, useState } from 'react'
import { FakeStoreApi } from '../../Services/FakeStoreApi'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../../context/Cart'

const Product = () => {
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState()
  const { productId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const product = await FakeStoreApi.fetchProductById(productId)
      setProduct(product)
      setLoading(false)
    }
    fetchProduct().catch(console.error)
  }, [productId])

  if (!loading && !product) {
    return (
      <div className='container'>
        <div className='product py-2'>
          <div className='details p-3'>
            Products Not Found Please visit{' '}
            <Link to='/' replace>
              home
            </Link>{' '}
            to see all products
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      {loading ? (
        <div className={'loader'}></div>
      ) : (
        <div className='product py-2'>
          <div className='details grid p-3'>
            <div className='product-image'>
              <img src={product.image} alt='' />
            </div>
            <div className='info'>
              <div className='description'>
                <h3>{product.title}</h3>
                <p className='my-2'>{product.description}</p>
              </div>
              <div className='flex'>
                <span className='price'>{product.price}</span>
                <span
                  className='cart'
                  onClick={(product) => addToCart(product)}
                >
                  <img className='cartImg' src='/cart.svg' alt='cart' />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
