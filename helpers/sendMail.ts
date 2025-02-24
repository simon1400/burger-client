import axios from 'axios'

const apiEndpoint = '/api/email'

export function sendEmail(data: any) {
  axios
    .post(apiEndpoint, { ...data })
    .then(() => {
      console.log('Mail done!')
    })
    .catch((err) => console.log('err mail send -- ', err))
}
