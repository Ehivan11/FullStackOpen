describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Ehivan Ivankovich',
      username: 'Ehivan11',
      password: 'messinaldo'
    })
    cy.createUser({
      name: 'Lionel Messi',
      username: 'Messi10',
      password: 'arafueFrancia'
    })
  })

  it('login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Ehivan11')
      cy.get('#password').type('messinaldo')
      cy.get('#login-button').click()

      cy.contains('Ehivan11')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Ehivan11')
      cy.get('#password').type('wrondPassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'background-color', 'rgb(198, 15, 15)')

      cy.get('html').should('not.contain', 'Ehivan11 loggedIn')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Ehivan11', password: 'messinaldo' })
    })

    it('a new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('A note created by cypress')
      cy.get('#author').type('Ehivan Ivankovich')
      cy.get('#url').type('http://myblog.com')
      cy.get('#likes').type('11')
      cy.get('#save-blog').click()
      cy.get('#blogList').contains('A note created by cypress')
    })
  })

  describe('and a blog exists', function () {
    beforeEach(function () {
      cy.login({ username: 'Ehivan11', password: 'messinaldo' })
      cy.createBlog({
        title: 'My new blog from cypress',
        author: 'Ehivan Ivankovich',
        url: 'http://myblog.com',
        likes: 11
      })
      cy.createBlog({
        title: 'This is not a new blog',
        author: 'Ehivan Ivankovich',
        url: 'http://myblog.com',
        likes: 7
      })
    })

    it('it can be liked', function () {
      cy.contains('My new blog from cypress').parent().contains('View').as('theButton')
      cy.get('@theButton').click()
      cy.contains('My new blog from cypress').parent().find('.icon-heart').as('theLike')
      cy.get('@theLike').click()

      cy.contains('My new blog from cypress').parent().contains('12')
    })

    it('it can be deleted by the creator user', function () {
      cy.contains('My new blog from cypress').parent().contains('View').as('theButton')
      cy.get('@theButton').click()
      cy.contains('My new blog from cypress').parent().find('.icon-bin2').as('theDeleteButton')
      cy.get('@theDeleteButton').click()

      cy.get('html').should('not.contain', 'My new blog from cypress')
    })

    it('it can not be deleted by the user that not created it', function () {
      cy.contains('Logout').click()
      cy.login({ username: 'Messi10', password: 'arafueFrancia' })

      cy.contains('My new blog from cypress').parent().contains('View').as('theButton')
      cy.get('@theButton').click()
      cy.contains('My new blog from cypress').parent().find('.icon-bin2').should('not.exist')

    })
  })

  describe('and several blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'Ehivan11', password: 'messinaldo' })
      cy.createBlog({
        title: 'Most unliked blog',
        author: 'Ehivan Ivankovich',
        url: 'http://myblog.com',
        likes: 3
      })
      cy.createBlog({
        title: 'Most liked blog',
        author: 'Ehivan Ivankovich',
        url: 'http://myblog.com',
        likes: 11
      })
      cy.createBlog({
        title: 'Second most liked blog',
        author: 'Ehivan Ivankovich',
        url: 'http://myblog.com',
        likes: 7
      })
    })

    it('the blog list is ordered according to likes', function () {
      cy.get('.blogsList').eq(0).should('contain', 'Most liked blog')
      cy.get('.blogsList').eq(1).should('contain', 'Second most liked blog')
      cy.get('.blogsList').eq(2).should('contain', 'Most unliked blog')
    })
  })
})
