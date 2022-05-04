// import paths from './paths'
import components from './components'
import schemas from './schemas'
import paths from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API Service',
    description: 'API created to a Jobsity node challenge',
    version: '1.0.0'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }, {
    name: 'Event'
  }],
  paths,
  schemas,
  components,
  contact: {
    name: 'Caio Vieira',
    email: 'contato@caiovieira.com.br'
  }
}
