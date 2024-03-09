import { afterEach, beforeEach, vi, describe, expect, it } from "vitest";
import { AppContext, createAppContext } from "../app-context";
import { screen, within, fireEvent } from "@testing-library/react";

describe('G: 加载网站', () => {
    let _: AppContext
    beforeEach(() => {
        _ = createAppContext()
    })
    afterEach(() => {
        _.cleanup()
    })
    it('T: 初始加载会请求接口，页面展示 loading', () => {
        expect(screen.getByText('loading...')).toBeTruthy()
    })
    describe('W: 请求完成', () => {
        beforeEach(async () => {
            await vi.advanceTimersToNextTimerAsync();
        })
        it('T: 会展示文件列表 有 24 个文件', () => {
            expect(screen.getAllByTestId('doc-item').length).toBe(24)
        })
        describe('W: 点击第二个文件的收藏按钮', () => {
            beforeEach(async () => {
                const star = within(screen.getAllByTestId('doc-item')[1]).getByTestId('star-outlined')
                fireEvent.click(star)
            })
            it('T: 收藏按钮会变成取消收藏按钮', () => {
                const fillStar = within(screen.getAllByTestId('doc-item')[1]).getByTestId('star-filled')
                expect(fillStar).toBeTruthy()
            })
            describe('W: 此时去收藏页面', () => {
                beforeEach(async () => {
                    const link = _.inSideBar().getByText('收藏')
                    fireEvent.click(link)
                })
                it('T: 收藏页面会展示收藏的一个文件', () => {
                    expect(screen.getAllByTestId('doc-item').length).toBe(1)
                })
                describe('W: 点击取消收藏该文件', () => {
                    beforeEach(async () => {
                        fireEvent.click(screen.getByTestId('star-filled'))
                    })
                    it('T: 收藏页面文件列表为空', () => {
                        expect(screen.queryAllByTestId('doc-item').length).toBe(0)
                    })
                })
            })
        })
    })
})