import random from 'lodash.random'

export class Utils {
  public static async sleep(time = 500) {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }

  public static generateId() {
    return random(0, 1000)
  }
}
