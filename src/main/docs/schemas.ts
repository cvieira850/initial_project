import {
  signupParamsSchema,
  errorSchema,
  loginSchema,
  loginParamsSchema,
  userSchema,
  eventParamsSchema,
  eventSchema,
  roleParamsSchema,
  roleSchema
} from './schemas/'

export default {
  login: loginSchema,
  error: errorSchema,
  signupParamsSchema: signupParamsSchema,
  loginParams: loginParamsSchema,
  user: userSchema,
  eventParams: eventParamsSchema,
  event: eventSchema,
  roleParams: roleParamsSchema,
  role: roleSchema
}
