const info = (log) => {
  if(process.env.NODE_ENV === 'development') {
    console.log(log)
  }
}

const error = (error) => {
  if(process.env.NODE_ENV === 'development') {
    console.log(error)
  }
}

module.exports = { info, error }