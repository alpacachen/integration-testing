import { EditFilled } from "@ant-design/icons"
import { useListContext } from "../store"
import { Button, Form, Input, Modal } from "antd"
import { useState } from "react"

export const Header = () => {
    const { title, updateTitle } = useListContext()
    const [open, setOpen] = useState(false)
    return <>
        <div data-testid='header' className="px-8 py-2 text-20px leading-24px">
            {title} <Button data-testid='change-title-but' onClick={() => setOpen(true)} icon={<EditFilled className="color-gray" />}></Button>
        </div>
        {open && <Modal
            title='修改名称'
            open={true}
            data-testid='title-modal'
            okButtonProps={{
                htmlType: 'submit',
                form: 'form'
            }}
            okText='确定修改'
            onCancel={() => setOpen(false)}
        >
            <Form
                onFinish={async (value) => {
                    const { name } = value
                    await updateTitle(name)
                    setOpen(false)
                }}
                initialValues={{
                    name: title
                }}
                id="form">
                <Form.Item name={'name'} label="网站名称">
                    <Input placeholder="请输入网站名称" />
                </Form.Item>
            </Form>
        </Modal>}
    </>
}