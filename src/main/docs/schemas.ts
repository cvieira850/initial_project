import {
  signupParamsSchema,
  errorSchema,
  loginSchema,
  loginParamsSchema
} from './schemas/'

export default {
  login: loginSchema,
  error: errorSchema,
  signupParamsSchema: signupParamsSchema,
  loginParams: loginParamsSchema
}
