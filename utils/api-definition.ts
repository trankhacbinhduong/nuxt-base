import { defineEventHandler } from 'h3'
import { ZodError, type ZodSchema } from 'zod'
import type { EventHandlerRequest, EventHandler } from 'h3'

interface ValidateOptions {
  body?: ZodSchema
  params?: ZodSchema
  query?: ZodSchema
  response?: ZodSchema
}

export const defineAPI = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
  { params, body, query, response }: ValidateOptions): EventHandler<T, D> => {
  return defineEventHandler<T>(async (event) => {
    try {
      if (body) {
        await readValidatedBody(event, body.parse)
      }

      if (params) {
        await getValidatedRouterParams(
          event,
          params.parse,
        )
      }

      if (query) {
        await getValidatedQuery(
          event,
          query.parse,
        )
      }

      const res = await handler(event)
      if (response) {
        response.parse(res)
      }

      return res
    }
    catch (err) {
      if (err instanceof ZodError) {
        throw createError({
          status: 400,
          statusText: 'Validation Error',
          message: err.toString(),
        })
      }
      else {
        return err
      }
    }
  })
}
