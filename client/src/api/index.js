import axios from 'axios'
import { BASE_URL } from './config.json'

export default class Api {
  static async getInfo(position) {
    console.log('DO')
    if (!(position && position.coords)) return
    console.log('POSLE')

    console.log({ position })

    const { coords } = position

    const query = `lat=${coords.latitude}&lon=${coords.longitude}`

    const res = await axios.get(`${BASE_URL}/getInfo?${query}`)
    return res
  }
}
