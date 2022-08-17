import React, { useState, useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { Table, Container, Row, Button, Modal } from "react-bootstrap"
import { fetchUsersFromAPI } from "./usersSlice"
import { FaExternalLinkAlt } from "react-icons/fa"
import styles from "./Users.module.css"
import "bootstrap/dist/css/bootstrap.min.css"

export function UserList() {
  const [users, setUser] = useState<any[0]>([""])
  const [specifyUsers, setspecifyUsers] = useState(0)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("20")
  const incrementValue = Number(incrementAmount) || 0

  const handleShow = (index: number) => {
    setspecifyUsers(index)
    setShow(true)
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const LocationViews = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Postcode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {users[specifyUsers]?.location?.street?.name + ", " + users[specifyUsers]?.location?.street?.number}
                </td>
                <td>{users[specifyUsers]?.location?.city}</td>
                <td>{users[specifyUsers]?.location?.state}</td>
                <td>{users[specifyUsers]?.location?.postcode}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  useEffect(() => {
    dispatch(fetchUsersFromAPI(incrementValue)).then((data: any) =>
      setUser(data.payload)
    )
  }, [dispatch, incrementAmount, incrementValue])

  return (
    <>
      <LocationViews />
      <Container>
        <Row>
          <h2>Please, enter the number of users</h2>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <Table striped>
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((data: any, i: number) => {
                  const { name, email, phone, picture } = data
                  return (
                    <>
                      <tr key={i}>
                        <td>
                          <img
                            src={picture?.thumbnail}
                            alt={`Image from ${name?.first} ${name?.last}`}
                          />
                        </td>
                        <td>{name?.first}</td>
                        <td>{name?.last}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td onClick={() => handleShow(i)}>
                          <FaExternalLinkAlt />
                        </td>
                      </tr>
                    </>
                  )
                })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}
