import createFetchH from '../utils/request'

const baseUrl = '/api'

import { requestIn } from '../utils/request'

interface resIn<T = any> {
  code: 0 | 1,
  msg: string,
  data?: T
}

export type PromiseResIn<T = any> = Promise<resIn<T>>

const request: requestIn<PromiseResIn> = createFetchH({
	baseUrl
})

request.setBeforeRequest((config) => config)

request.setAfterResponsse((response) => {
	// console.log(response)
	return response.data
}, (_err) => {
	// console.log(err)
	/* switch (err.status) {
    case 400:
      return 
  } */
})


export default request
