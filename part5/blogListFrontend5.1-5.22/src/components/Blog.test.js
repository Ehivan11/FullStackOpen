import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog />', () => {
  let container
  let likeBlog

  beforeEach(() => {
    likeBlog = jest.fn()
    container = render(
      <Blog
        blog={{
          title: 'Test Blog',
          author: 'Ehivan',
          user: {
            username: 'Ehivan11'
          },
          url: 'http://myblog.com',
          likes: 11
        }}
        setBlogs={() => null}
        user={{
          username: 'Ehivan11'
        }}
        update={likeBlog}
      />
    ).container
  })

  test('renders only the blog title', async () => {
    await screen.findByText('Test Blog')

    const div = container.querySelector('.divTest')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, author, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText('Ehivan', { exact: false })
    screen.getByText('http://myblog.com', { exact: false })
    screen.getByText('11', { exact: false })

    const div = container.querySelector('.divTest')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()

    const buttonView = screen.getByText('View')
    await user.click(buttonView)

    const buttonLike = container.querySelector('.icon-heart')

    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
