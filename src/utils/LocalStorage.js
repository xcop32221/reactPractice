// 封装数据持久化，即LocalStorage

// 增，改
export const setItem = (key, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
  // 查
  export const getItem = (key) => {
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }
  // 删
  export const delItem = (key) => {
    localStorage.removeItem(key)
  }