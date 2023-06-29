'use server';

import { createPost } from '~/server/routers/_app';
import { createAction, publicProcedure } from '~/server/trpc';
import { z } from 'zod';

/**
 * Either inline procedures using trpc's flexible
 * builder api, with input parsers and middleware
 * Wrap the procedure in a `createAction` call to
 * make it server-action friendly
 */
export const testAction = createAction(
  publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      console.log('testMutation called', opts);
      return {
        text: 'Hello world',
        date: new Date(),
      };
    }),
);

/**
 * Or, you can create actions from existing procedures
 * by importing them and wrapping them in `createAction`
 */
export const createPostAction = createAction(createPost);
