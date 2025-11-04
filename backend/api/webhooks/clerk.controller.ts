import type { Request, Response, NextFunction } from 'express';
import { authService } from '../auth/auth.service';
import { Webhook } from 'svix';

// Clerk Webhook 핸들러: svix 서명 검증 후 user.deleted 시 DB 사용자 삭제
export async function handleClerkWebhook(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> {
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
        // 요청 헤더에서 서명 관련 값 추출
        const headers = {
            'webhook-id': req.headers['webhook-id'] as string,
            'webhook-timestamp': req.headers['webhook-timestamp'] as string,
            'webhook-signature': req.headers['webhook-signature'] as string,
        };

        const evt = webhook.verify(JSON.stringify(req.body), headers);
        const eventType = (evt as any).type;
        const clerkId = (evt as any).data?.id;

        if (!evt) {
            throw new Error('이벤트 타입이 없습니다.');
        }

        if (eventType === 'user.deleted') {
            if (!clerkId) {
                throw new Error('clerkId가 없습니다.');
            }

            const resp = await authService.removeUser(clerkId);
            console.log("response: ", resp);
            res.status(200).json({
                success: true,
                message: '사용자가 성공적으로 삭제되었습니다.',
                data: eventType
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: '이벤트가 성공적으로 처리되었습니다.',
            data: eventType
        });
    } catch (error: any) {
        next(error);
    }
}


