const Lodash = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) return 0
  else if (blogs.length === 1) return blogs[0].likes
  else return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return 'Empty blogs list'
  else if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else {
    return blogs.reduce((prev, current) =>
      current.likes > prev.likes
        ? {
            title: current.title,
            author: current.author,
            likes: current.likes
          }
        : {
            title: prev.title,
            author: prev.author,
            likes: prev.likes
          }
    )
  }
}

// Without Lodash

const mostBlogs = blogs => {
  if (blogs.length === 0) return 'Empty blogs list'
  else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: blogs.length
    }
  } else {
    return blogs.reduce((prev, current, index, arr) => {
      let blogsAuthor = []

      if (prev.every(blog => blog.author !== current.author)) {
        blogsAuthor = [...prev, { author: current.author, blogs: 1 }]
      }

      if (prev.some(blog => blog.author === current.author)) {
        blogsAuthor = prev.map(b => {
          if (b.author === current.author) {
            b = { ...b, blogs: b.blogs + 1 }
          }
          return b
        })
      }

      if (index === arr.length - 1) {
        return blogsAuthor.reduce((prev, current) =>
          prev.blogs < current.blogs
            ? {
                author: current.author,
                blogs: current.blogs
              }
            : {
                author: prev.author,
                blogs: prev.blogs
              }
        )
      }

      return blogsAuthor
    }, [])
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return 'Empty blogs list'
  else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else {
    return blogs.reduce((prev, current, index, arr) => {
      let blogsAuthor = []

      if (prev.every(blog => blog.author !== current.author)) {
        blogsAuthor = [...prev, { author: current.author, likes: current.likes }]
      }

      if (prev.some(blog => blog.author === current.author)) {
        blogsAuthor = prev.map(b => {
          if (b.author === current.author) {
            b = { ...b, likes: b.likes + current.likes }
          }
          return b
        })
      }

      if (index === arr.length - 1) {
        return blogsAuthor.reduce((prev, current) =>
          prev.likes < current.likes
            ? {
                author: current.author,
                likes: current.likes
              }
            : {
                author: prev.author,
                likes: prev.likes
              }
        )
      }

      return blogsAuthor
    }, [])
  }
}

// With Lodash

const mostBlogsLodash = blogs => {
  if (Lodash.size(blogs) === 0) return 'Empty blogs list'
  else if (Lodash.size(blogs) === 1) {
    return {
      author: blogs[0].author,
      blogs: Lodash.size(blogs)
    }
  } else {
    return Lodash.reduce(blogs, (prev, current, index, arr) => {
      let blogsAuthor = []

      if (Lodash.every(prev, blog => blog.author !== current.author)) {
        blogsAuthor = [...prev, { author: current.author, blogs: 1 }]
      }

      if (Lodash.some(prev, blog => blog.author === current.author)) {
        blogsAuthor = Lodash.map(prev, b => {
          if (b.author === current.author) {
            b = { ...b, blogs: b.blogs + 1 }
          }
          return b
        })
      }

      if (index === Lodash.size(arr) - 1) {
        return Lodash.reduce(blogsAuthor, (prev, current) =>
          prev.blogs < current.blogs
            ? {
                author: current.author,
                blogs: current.blogs
              }
            : {
                author: prev.author,
                blogs: prev.blogs
              }
        )
      }

      return blogsAuthor
    }, [])
  }
}

const mostLikesLodash = blogs => {
  if (Lodash.size(blogs) === 0) return 'Empty blogs list'
  else if (Lodash.size(blogs) === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else {
    return Lodash.reduce(blogs, (prev, current, index, arr) => {
      let likesAuthor = []

      if (Lodash.every(prev, blog => blog.author !== current.author)) {
        likesAuthor = [...prev, { author: current.author, likes: current.likes }]
      }

      if (Lodash.some(prev, blog => blog.author === current.author)) {
        likesAuthor = Lodash.map(prev, b => {
          if (b.author === current.author) {
            b = { ...b, likes: b.likes + current.likes }
          }
          return b
        })
      }

      if (index === Lodash.size(arr) - 1) {
        return Lodash.reduce(likesAuthor, (prev, current) =>
          prev.likes < current.likes
            ? {
                author: current.author,
                likes: current.likes
              }
            : {
                author: prev.author,
                likes: prev.likes
              }
        )
      }

      return likesAuthor
    }, [])
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
  mostLikes,
  mostLikesLodash
}
