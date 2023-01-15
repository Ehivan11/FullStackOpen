import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled.button`
  background: #141414;
  color: #fff;
  padding: 7px;
  border: 1px solid rgba(54, 54, 54, 0.6);
  border-radius: 50px;
  cursor: pointer;
  margin: auto;
  right: 0;
  left: ${props => props.left || 0};
  top: ${props => props.top || 0};
  width: fit-content;
  position: absolute;

  &:hover {
    border: 1px solid rgb(255, 255, 255);
  }
`

export const Menu = styled.ul`
  background: #141414;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  width: fit-content;
  padding: 15px 20px;
  border-radius: 50px;
  list-style: none;
  right: 0;
  left: 0;
  margin: auto;
  top: 0.3em;
`

export const MenuSpan = styled(Link)`
  color: #fff;
  padding: 6px 10px;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #fff;
    color: #141414;
  }
`

export const LoginSpan = styled.span`
  margin-left: 10em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.div`
  position: relative;
  left: 0;
  rigth: 0;
  margin: 3em auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`

export const NewHomeDiv = styled.div`
  height: fit-content;
  padding: 30px 40px;
  border-radius: 20px;
  background: #cff5e7;
  position: relative;
  grid-column: span 2;
`

export const NewForm = styled.form`
  position: relative;
  left: 5em;
  padding-bottom: 15px;
`

export const BlogTitle = styled(Link)`
  font-size: 20px;
  font-family: monospace;
  text-decoration: none;
  color: #141414;
`

export const NewInput = styled.input`
  padding: 5px;
  width: 17em;
  border-radius: 30px;
`

export const NewDiv = styled.div`
  background: #cff5e7;
  width: fit-content;
  position: absolute;
  padding: 15px 20px;
  border-radius: 30px;
  top: 15vh;
  left: 0;
  right: 0;
  margin: auto;
`

export const NewLoginForm = styled.form`
  width: fit-content;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
`

export const NewNotify = styled.div`
  background: ${props =>
    props.background === 'error' ? 'rgb(198, 15, 15)' : 'rgb(15, 198, 27)'};
  color: #fff;
  width: fit-content;
  padding: 5px 10px;
  position: absolute;
  border-radius: 30px;
  top: 4rem;
  left: 0;
  right: 0;
  margin: auto;
`

export const CommentForm = styled.form`
  width: fit-content;
  position: absolute;
  top: 9rem;
  left: 0;
  right: 0;
  margin: auto;
`

export const NewUl = styled.ul`
  list-style: none;
  position: absolute;
  width: fit-content;
  margin: auto;
  left: 0;
  right: 0;
  top: 23rem;
`
