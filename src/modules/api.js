const request = (method, url, data) => {
  const settings = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }

  if (data) {
    settings.body = JSON.stringify(data)
  }

  return fetch(`http://localhost:8083/${url}`, settings).then(
    response => response.json(),
    () => {
      throw new Error('Connection issues. Got no response.')
    }
  )
}

const GET = url => request('GET', url)
const POST = (url, data) => request('POST', url, data)
const DELETE = url => request('DELETE', url)
const PATCH = (url, data) => request('PATCH', url, data)

export default {
  GET,
  POST,
  DELETE,
  PATCH
}
