import { message } from "antd";
import constate from "constate"
import { useCallback, useState } from "react";
import { useAsync } from "react-use";
import { DataType } from "./types/type";

interface ResponseType {
    data: {
        threadList: DataType[];
    };
}


const fetchData = async () => {
    const response = await fetch("/hupu/api/v2/bbs/walkingStreet/threads?page=1");
    const body = (await response.json()) as ResponseType
    return body.data.threadList;
};

const useHook = () => {
    const { value, loading } = useAsync(fetchData, [])
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])
    const addToFavorite = useCallback((tid: number) => {
        setFavoriteIds((ids) => [...ids, tid])
        message.success('已收藏')
    }, [])
    const removeFromFavorite = useCallback((tid: number) => {
        setFavoriteIds((ids) => ids.filter((id) => id !== tid))
        message.success('已取消收藏')
    }, [])

    return { loading, value, addToFavorite, favoriteIds, removeFromFavorite }
}

export const [ListProvider, useListContext] = constate(useHook)