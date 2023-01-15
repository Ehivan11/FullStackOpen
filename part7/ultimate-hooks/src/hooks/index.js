import { useState, useEffect } from 'react'
import defaultService from '../services/index'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    defaultService.getAll(baseUrl).then(response => setResources(response))
  }, [baseUrl])

  const create = async resource => {
    defaultService.create(baseUrl, resource).then(response => {
      setResources(oldResources => [...oldResources, response])
    })
  }

  const service = {
    create
  }

  return [resources, service]
}
