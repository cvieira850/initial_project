import {
  signupParamsSchema,
  errorSchema,
  loginSchema,
  loginParamsSchema,
  userSchema,
  eventParamsSchema,
  eventSchema,
  roleParamsSchema,
  roleSchema,
  rolesSchema,
  userRoleSchema,
  accountRoleSchema,
  forgotParamsSchema
} from './schemas/'

export default {
  login: loginSchema,
  error: errorSchema,
  signupParamsSchema: signupParamsSchema,
  forgotParamsSchema: forgotParamsSchema,
  loginParams: loginParamsSchema,
  user: userSchema,
  eventParams: eventParamsSchema,
  event: eventSchema,
  roleParams: roleParamsSchema,
  role: roleSchema,
  roles: rolesSchema,
  userRole: userRoleSchema,
  accountRole: accountRoleSchema
}
