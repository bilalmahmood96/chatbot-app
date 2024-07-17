export enum ChatBotExceptions {
    RESOURCE_EXHAUSTED =  'Oops! Our server\'s taking a coffee break ☕. Please try again soon!', //'I am exhausted, please try later 😔', //429
    PERMISSION_DENIED = 'Seems like you don\'t have valid permissions 😟', //403
    UNAVAILABLE = 'Service is temporarily unavailable. Try later', //503
    DEFAULT_ERROR = 'Unable to Perform this action. Please try later'
  }
  