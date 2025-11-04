import { Router } from 'express';
import { handleClerkWebhook } from './clerk.controller';

const webhookRouter = Router();

// Clerk Webhook Endpoint
webhookRouter.post('/clerk', handleClerkWebhook);

export default webhookRouter;


