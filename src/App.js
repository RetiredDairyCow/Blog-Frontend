import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
      const userRes = await loginService.login({username, password})
      console.log(userRes)
      setUser(userRes)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('Wrong Credentials')
    }

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
      {loginform()}
      </div>
    )
  }

  const alreadyLoggedIn = () => {
    return (
      <div>
        <h2>blogs</h2>
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