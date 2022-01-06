import React, {useState} from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleBlogCreation = async (event) => {
    
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(res => {
        props.setBlogs(props.blogs.concat(res))
      })
    
    props.setNotification(`Blog "${title}" created successfully`)
    setTimeout(() => {
      props.setNotification(null)
    }, 4000)
    
  }

  return (
  <div>
    <h3>Create New Blog</h3>
    <form onSubmit={handleBlogCreation}>
      <div>
        title:
        <input type="text" name="title" value={title} 
        onChange={({target}) => setTitle(target.value)}/> 
      </div>
      <div>
      author:
        <input type="text" name="author" value={author} 
        onChange={({target}) => setAuthor(target.value)}/>    
      </div>
      <div>
      url:
        <input type="text" name="url" value={url} 
        onChange={({target}) => setUrl(target.value)}/>    
      </div>
      <button type="submit">Create</button>
    </form>
  </div>  
  )
}

export default CreateBlog