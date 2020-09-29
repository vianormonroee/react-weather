import axios from 'axios'
import { BASE_URL } from './config.json'

export default class Api {
  static async getInfo() {
    const res = await axios.get(
      `${BASE_URL}/getInfo`
    )
    return res
  }
}
