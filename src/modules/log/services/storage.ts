export const useStorage = () => {
  const storage = {
    get(key: string) {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    },
    set<T>(key:string, val: T) {
         const strData = JSON.stringify(val)
         localStorage.setItem(key, strData)
    },
    isHas(key: string) {
      return !!storage.get(key)
    }
  }
  return storage
}
