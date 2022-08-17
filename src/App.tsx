import React from "react"
import { UserList } from "./features/users/UserList"
import { Container } from "react-bootstrap"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Container>
        <UserList />
      </Container>
    </div>
  )
}

export default App
