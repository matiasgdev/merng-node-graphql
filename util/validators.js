module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => { 
  const errors = {}

  if (!username || username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.toLowerCase().match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }

  if (!password || password === '') {
    errors.password = 'Password must not be empty'
  } else if(password !== confirmPassword){
    errors.password = 'Password does not match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}


module.exports.validateLoginInput = (email, password) => {
  const errors = {}

  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.toLowerCase().match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }

  if (!password || password === '') {
    errors.password = 'Password must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}