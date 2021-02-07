import DataLoader from 'dataloader';
import { Upvote } from '../entities/Upvote';

// keys: [{userId:1, postId:1054},{userId:null, postId:543}, {userId:7, postId:834}]
// values: [{userId:1, postId:1054, value: 4}, null, {userId:7, postId:834, value: 22]
// keys are objects an not strings because we need a userId and postId for upvotes
export const createUpvoteLoader = () =>
    new DataLoader<{ postId: number; userId: number }, Upvote | null>(
        async (keys) => {
            const upvotes = await Upvote.findByIds(keys as any);
            const upvoteIdsToUpvote: Record<string, Upvote> = {};
            upvotes.forEach((upvote) => {
                upvoteIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
            });
            return keys.map(
                (key) => upvoteIdsToUpvote[`${key.userId}|${key.postId}`],
            );
        },
    );
