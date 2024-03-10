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
        it('T: 会展示文件列表 有 6 个文件， 展示title “集成测试教程”', () => {
            expect(screen.getAllByTestId('doc-item').length).toBe(6)
            expect(screen.getByText('集成测试教程')).toBeTruthy()
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
        describe('W: 点击标题旁边的 修改按钮', () => {
            beforeEach(() => {
                fireEvent.click(screen.getByTestId('change-title-but'))
            })
            it('T: 会弹出弹窗，input 中展示 “集成测试教程”', () => {
                expect(screen.getByTestId('title-modal')).toBeTruthy()
                expect(within(screen.getByTestId('title-modal')).getByDisplayValue('集成测试教程')).toBeTruthy()
            })
            describe('W: 修改 title 为 “集成测试教程 2” 关闭弹窗', () => {
                beforeEach(async () => {
                    const input = within(screen.getByTestId('title-modal')).getByDisplayValue('集成测试教程')
                    fireEvent.change(input, { target: { value: '集成测试教程 2' } })
                    fireEvent.click(screen.getByText('确定修改'))
                    await vi.advanceTimersToNextTimerAsync();
                    await vi.advanceTimersToNextTimerAsync();
                    await vi.advanceTimersToNextTimerAsync();
                })
                it('T: 弹窗关闭，顶部栏的文案变为“集成测试教程 2”', () => {
                    // header
                    expect(screen.queryByTestId('title-modal')).toBeFalsy()
                    expect(screen.getByTestId('header').innerHTML).toContain('集成测试教程 2')
                })
            })
        })
    })
})