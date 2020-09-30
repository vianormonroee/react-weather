import axios from 'axios'
import { BASE_URL } from './config.json'

export default class Api {
  static async getInfo(position = {}) {
    if (!position.coords) position = 'omsk'

    const query = Api._getQuery(position)

    const res = await axios.get(`${BASE_URL}/getInfo?${query}`)
    return res
  }

  static _getQuery(position) {
    if (typeof position === 'string') return `q=${position}`
    if (position && position.coords) {
      const { coords } = position
      return `lat=${coords.latitude}&lon=${coords.longitude}`
    }
  }
}
