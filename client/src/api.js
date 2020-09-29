import axios from 'axios'
import { WEATHER_API_KEY } from './config.json'

export default class Api {
  static async getInfo() {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${WEATHER_API_KEY}`
    )
    return res
  }
}
