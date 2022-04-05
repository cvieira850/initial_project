import {
  signupParamsSchema,
  errorSchema,
  loginSchema
} from './schemas/'

export default {
  login: loginSchema,
  error: errorSchema,
  signupParamsSchema: signupParamsSchema
}
