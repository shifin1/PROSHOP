// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { Row, Col, Card, Image, Button, Form, ListGroup } from "react-bootstrap"
import Message from "../components/Message"
import { addToCart } from "../actions/cartActions"

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const productId = id

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  console.log(cartItems)
}

export default CartScreen
