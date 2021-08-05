export class Storage {
  public static setItem(key: string, value: any) {
    if (!value) throw new Error('Value is required')
    const jsonify = JSON.stringify(value)
    localStorage.setItem(key, jsonify)
  }

  public static getItem<R = any>(key: string): R | null {
    try {
      const result = localStorage.getItem(key)
      return result ? JSON.parse(result) : result
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
