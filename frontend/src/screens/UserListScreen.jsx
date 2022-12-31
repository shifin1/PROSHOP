import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listUsers } from "../actions/userActions"

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate("/")
    }
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    console.log("delete")
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id} </td>
                <td> {user.name} </td>
                <td> {user._email} </td>
                <td>
                  {" "}
                  {user.isAdmin ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="fa-solid fa-x" style={{ color: "red" }}></i>
                  )}{" "}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" size="sm">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
