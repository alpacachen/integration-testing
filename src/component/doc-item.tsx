import { FC, ReactNode } from "react"
import { Card } from "antd"
import { DataType } from "../types/type";

interface Props {
    data: DataType;
    actions: ReactNode[];
}

export const DocItem: FC<Props> = ({ data, actions }) => {
    const thumbnail = data.picList[0]?.url ?? ''
    const avatar = data.userHeader
    return <Card
        style={{ width: 300 }}
        cover={
            <div className='h-145px overflow-hidden'>
                {thumbnail ? <img
                    crossOrigin='anonymous'
                    alt="example"
                    data-testid='thumbnail'
                    referrerPolicy='no-referrer'
                    src={thumbnail}
                /> : data?.lightReplyResult?.content}

            </div>
        }
        actions={actions}
    >
        <Card.Meta
            avatar={<img className='rounded-full w-8 h-8' referrerPolicy='no-referrer' crossOrigin='anonymous' src={avatar} />}
            title={data.title}
            description={data.recommendCount + '赞 ' + data.replies + '回复'}
        />
    </Card>
}

