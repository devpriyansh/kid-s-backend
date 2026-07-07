function isTrustedError (error) {
  return error?.isOperational || false
}

function extractErrorAttributes (errors) {
  const errorAttributes = []
  for (const serviceName in errors) {
    if (Object.hasOwnProperty.call(errors, serviceName)) {
      const serviceErrors = errors[serviceName]
      for (const errAttr in serviceErrors) {
        if (Object.hasOwnProperty.call(serviceErrors, errAttr)) {
          // Check if the value is an array and take the first element as the message, or use it directly
          const rawMessage = serviceErrors[errAttr]
          const message = Array.isArray(rawMessage) ? rawMessage[0] : rawMessage
          errorAttributes.push({ key: errAttr, message })
        }
      }
    }
  }
  return errorAttributes
}

export {
  isTrustedError,
  extractErrorAttributes
}
