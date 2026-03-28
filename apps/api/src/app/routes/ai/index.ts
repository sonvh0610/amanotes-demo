import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { getMonthlySummary } from '../../services/ai-summary.js';
import { monthKeyFromDate } from '../../lib/time.js';

const monthlySummaryQuerySchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
  force: z
    .union([z.literal('1'), z.literal('true'), z.literal('yes')])
    .optional(),
});

export default async function aiRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/monthly-summary',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const parsed = monthlySummaryQuerySchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({ error: parsed.error.flatten() });
      }

      const monthKey = parsed.data.month ?? monthKeyFromDate();
      const forceRefresh = Boolean(parsed.data.force);

      const summary = await getMonthlySummary(
        request.user!.id,
        monthKey,
        forceRefresh
      );
      return reply.send(summary);
    }
  );
}
