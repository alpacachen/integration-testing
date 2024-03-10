import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from "@testing-library/react";
import { DocItem } from '../../component/doc-item';
import { DataType } from '../../types/type';
import { vi } from 'vitest'

const mockDataWithoutPic: DataType = {
    title: 'mock title',
    recommendCount: 10,
    replies: 20,
    topicIcon: '',
    userHeader: '',
    tid: 1,
    picList: [],
    lightReplyResult: {
        content: '部分内容'
    }
}

const mockDataWithPic: DataType = {
    title: 'mock title',
    recommendCount: 10,
    replies: 20,
    topicIcon: '',
    userHeader: '',
    tid: 1,
    picList: [
        { url: 'http://www.baidu.com' }
    ],
    lightReplyResult: {
        content: '部分内容'
    }
}

describe("G: 一个DocItem组件， 入参没有图片", () => {
    beforeEach(() => {
        render(<DocItem data={mockDataWithoutPic} actions={[]} />);
    })
    afterEach(() => {
        cleanup()
    })
    test("T: 会展示部分文章内容", () => {
        expect(screen.getByText("部分内容")).toBeTruthy();
    });
});

describe("G: 一个DocItem组件， 入参有图片", () => {
    beforeEach(() => {
        render(<DocItem data={mockDataWithPic} actions={[]} />);
    })
    afterEach(() => {
        cleanup()
    })
    test("T: 会展示图片", () => {
        expect(screen.queryByText("部分内容")).not.toBeTruthy();
        expect(screen.getByTestId("thumbnail")).toBeTruthy();
    });
});
describe("G: 一个DocItem组件， 入参有图片, 并且 action 传入了一个按钮，支持点击", () => {
    beforeEach(() => {
        render(<DocItem data={mockDataWithPic} actions={[
            <button onClick={() => alert('我是 alert')}>点我</button>
        ]} />);
    })
    afterEach(() => {
        cleanup()
    })
    describe('W: 点击 action 按钮', () => {
        beforeEach(() => {
            vi.spyOn(window, 'alert');
            screen.getByText('点我').click()
        })
        test("T: 会弹出系统提示框 alert", () => {
            expect(window.alert).toBeCalledWith('我是 alert');
        });
    })
});