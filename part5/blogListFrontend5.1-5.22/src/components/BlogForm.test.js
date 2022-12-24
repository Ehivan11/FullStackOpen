import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm />', () => {
  let container
  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()
    container = render(<BlogForm setBlogs={() => null} create={createBlog} />).container
  })

  test.only('calls the event handler it received as props with the right details', async () => {
    const blogObject = {
      title: 'Test',
      author: 'Ehivan',
      url: 'http://myblog.com',
      likes: '11'
    }

    const user = userEvent.setup()

    const viewButton = container.querySelector('.toggleButtonBlog')
    const tilte = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('URL')
    const likes = screen.getByPlaceholderText('Likes')
    const sendButton = screen.getByText('Save')

    await user.click(viewButton)

    await user.type(tilte, blogObject.title)
    await user.type(author, blogObject.author)
    await user.type(url, blogObject.url)
    await user.type(likes, blogObject.likes)

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(blogObject.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blogObject.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blogObject.url)
    expect(createBlog.mock.calls[0][0].likes).toBe(blogObject.likes)
  })
})
