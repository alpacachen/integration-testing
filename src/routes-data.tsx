import { DeleteFilled, HomeFilled, StarFilled } from "@ant-design/icons"
import { ReactNode } from "react"
import { Home } from "./component/home"
import { Favorite } from "./component/favorite"

export enum RouteEnum {
    Home = '/',
    Favorites = '/favorites',
    Trash = '/trash',
}

export const RoutesData: {
    name: string,
    path: RouteEnum,
    icon: ReactNode
    element: ReactNode
}[] = [
        {
            name: '首页',
            path: RouteEnum.Home,
            icon: <HomeFilled />,
            element: <Home />
        },
        {
            name: '收藏',
            path: RouteEnum.Favorites,
            icon: <StarFilled />,
            element: <Favorite />
        },
        {
            name: '回收站',
            path: RouteEnum.Trash,
            icon: <DeleteFilled />,
            element: <>回收站</>
        }
    ]
