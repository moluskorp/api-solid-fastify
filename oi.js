function oi(instance, context) {
  instance.data.divElement = document.createElement('div')
  instance.data.divElement.classList.add('qr-popup')
  instance.canvas[0].appendChild(instance.data.divElement)
  instance.data.dominio = ''
  instance.data.url = 'whatsapp-j4wf.onrender.com'

  document.addEventListener('click', (event) => {
    if (event.target.matches('.qr-popup')) {
      instance.data.divElement.style.display = 'none'
    }
  })
  instance.data.disconnect = () => {
    const url = `https://${instance.data.url}/instance/disconnect/${instance.data.dominio}`

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(url, requestOptions).then(instance.publishState('conectado', false))
  }

  instance.data.getQr = () => {
    const url = `wss://${instance.data.url}/instance/qr/${instance.data.dominio}`
    const socket = new WebSocket(url)

    socket.addEventListener('message', (event) => {
      if (event.data === 'ready') {
        instance.data.divElement.style.display = 'none'
        instance.publishState('conectado', true)
      } else {
        instance.data.divElement.innerHTML = ''
        instance.data.divElement.style.display = 'flex'
        new QRCode(instance.data.divElement, event.data)
      }
    })
  }

  instance.data.getConnection = () => {
    const url = `https://${instance.data.url}/instance/connected/${properties.dominio}`

    console.log({ context })

    const { API_KEY } = context

    console.log({ API_KEY })

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          instance.publishState('conectado', true)
        } else {
          instance.publishState('conectado', false)
        }
      })
  }

  instance.data.sendMessageGroup = (group_name, message) => {
    const qrExists = false
    const qrString = ''
    const url = `https://${instance.data.url}/instance/groups`

    const groups = group_name.get(0, group_name.length())

    const data = {
      message,
      nomeGrupo: groups,
      dominio: instance.data.dominio,
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response not OK, status: ' + response.status)
        }
        return response.text()
      })
      .then((text) => {
        try {
          console.log({ text })
          return JSON.parse(text)
        } catch (error) {
          console.error('Erro ao analisar JSON:', text)
          throw error
        }
      })
      .then((data) => {
        console.log({ data })
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }

  instance.data.sendMessageNumber = (number, message) => {
    const url = `https://${instance.data.url}/instance/message`

    const data = {
      message,
      number,
      dominio: instance.data.dominio,
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data })
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }
}
