export interface DataType {
    title: string;
    recommendCount: number;
    replies: number;
    topicIcon: string;
    userHeader: string
    lightReplyResult?: {
        content?: string
    }
    tid: number;
    picList: { url?: string }[];
}
