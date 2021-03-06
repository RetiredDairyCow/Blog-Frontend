import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const userRes = await loginService.login({username, password})
      console.log(userRes)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(userRes)
      ) 
      blogService.setToken(userRes.token)
      setUser(userRes)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification('Wrong Credentials')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }

  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginform = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
  </form>      
  )

  const notLoggedIn = () => {
    return (
      <div>
      <h2>Log in to the application</h2>
      <Notification notificationMessage={notificationMessage}/>
      {loginform()}
      </div>
    )
  }

  const alreadyLoggedIn = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notificationMessage={notificationMessage}/>
        
        <h4>
          {user.username} logged in
          <button onClick={handleLogout}>Logout</button>
        </h4> 

        <CreateBlog setBlogs={setBlogs} blogs={blogs} notificationMessage={notificationMessage} setNotification={setNotification}/>
        <br></br>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {user === null ? notLoggedIn() : alreadyLoggedIn()}
    </div>
    
    
  )
}

export default App