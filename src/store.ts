import { message } from "antd";
import constate from "constate"
import { useCallback, useState } from "react";
import { useAsync } from "react-use";
import { DataType } from "./types/type";
import axios from 'axios';

const fetchData = async () => {
    const res = await axios.get("/hupu/api/v2/bbs/walkingStreet/threads?page=1")
    return res.data.data.threadList as DataType[];
};

const fetchTitle = async () => {
    const response = await axios.get("/api/title");
    return response.data;
};
const mockSlow = () => {
    for (let i = 0; i < 3000; i++) {
        const div = document.createElement('div');
        div.innerText = `Element ${i}`;
        document.body.appendChild(div);
    }
}

const useHook = () => {
    const { value, loading } = useAsync(fetchData, [])
    const [n, setN] = useState(1)
    const updateTitle = useCallback(async (t: string) => {
        await axios.post("/api/title", { title: t });
        setN(n => n + 1)
    }, [])
    const { value: title } = useAsync(fetchTitle, [n])
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])
    const addToFavorite = useCallback((tid: number) => {
        mockSlow()
        setFavoriteIds((ids) => [...ids, tid])
        message.success('已收藏')
    }, [])
    const removeFromFavorite = useCallback((tid: number) => {
        setFavoriteIds((ids) => ids.filter((id) => id !== tid))
        message.success('已取消收藏')
    }, [])

    return { updateTitle, loading, value, title, addToFavorite, favoriteIds, removeFromFavorite }
}

export const [ListProvider, useListContext] = constate(useHook)