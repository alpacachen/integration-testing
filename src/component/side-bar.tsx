import { FC } from "react"
import { RoutesData } from "../routes-data"
import { Link, useMatch } from "react-router-dom"
type RouteItem = typeof RoutesData[0]
const SideBarItem: FC<{ route: RouteItem }> = ({ route }) => {
    const match = useMatch(route.path)
    return <div className={`flex w-full items-center ${match && 'bg-lightblue'}`}><div className="w-40px h-40px flex items-center justify-center">
        <i className="material-icons">{route.icon}</i>
    </div>
        <div className="flex-1 h-full flex items-center">
            {route.name}
        </div>
    </div>
}

export const SideBar = () => {
    return <div data-testid='side-bar' className="w-200px b-r b-solid b-gray h-full">
        {RoutesData.map((route, index) => {
            return <Link to={route.path} key={index} className="h-40px flex items-center">
                <SideBarItem route={route} />
            </Link>
        })}
    </div>
}