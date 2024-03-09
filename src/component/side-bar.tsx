import { RoutesData } from "../routes-data"
import { Link } from "react-router-dom"

export const SideBar = () => {
    return <div className="w-200px b-r b-solid b-gray h-full">
        {RoutesData.map((route, index) => {
            return <Link to={route.path} key={index} className="h-40px flex items-center">
                <div className="w-40px h-40px flex items-center justify-center">
                    <i className="material-icons">{route.icon}</i>
                </div>
                <div className="flex-1 h-full flex items-center">
                    {route.name}
                </div>
            </Link>
        })}
    </div>
}