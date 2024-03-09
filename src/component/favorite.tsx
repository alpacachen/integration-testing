import { useMemo } from "react"
import { useListContext } from "../store"
import { DocItem } from "./doc-item"
import { StarFilled } from "@ant-design/icons"
import { Tooltip } from "antd"

export const Favorite = () => {
    const { favoriteIds, value, removeFromFavorite } = useListContext()
    const favoriteDocs = useMemo(() => {
        return value?.filter(item => favoriteIds.includes(item.tid))
    }, [favoriteIds, value])

    console.log(favoriteIds, 'favoriteIds')
    return <div className='flex flex-wrap gap-8 max-h-full overflow-scroll'>
        {favoriteDocs?.map((item) => {
            return <DocItem data={item} key={item.tid} actions={[
                <Tooltip title='点击取消收藏'>
                    <StarFilled onClick={() => removeFromFavorite(item.tid)} />
                </Tooltip>
            ]}></DocItem>
        })}
    </div>
}