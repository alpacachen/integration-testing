import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useListContext } from '../store';
import { DocItem } from './doc-item';
import { Tooltip } from 'antd';

export const Home = () => {
    const { loading, value, favoriteIds } = useListContext()
    console.log(value)
    const { addToFavorite, removeFromFavorite } = useListContext()
    return <div className='flex flex-wrap gap-8 max-h-full overflow-scroll'>
        {loading && <div>loading...</div>}
        {value && value?.map((item, index) => {
            return <DocItem
                key={index}
                data={item}
                actions={[
                    favoriteIds.includes(item.tid) ? <Tooltip title='点击取消收藏'>
                        <StarFilled data-testid='star-filled' key="取消收藏" onClick={() => removeFromFavorite(item.tid)} />
                    </Tooltip>
                        :
                        <Tooltip title='点击收藏'>
                            <StarOutlined data-testid='star-outlined' key="收藏" onClick={() => addToFavorite(item.tid)} />
                        </Tooltip>
                ]}
            />
        })}
    </div>
}