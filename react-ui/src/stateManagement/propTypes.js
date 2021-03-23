import { shape, string, arrayOf, object } from 'prop-types'

export const subFinderPropTypes = {
  input: string,
  inputSubmitted: string,
  findSubscriberJobs: arrayOf(object),
  currentJobId: string,
  error: shape({
    message: string,
    config: object
  })
}
