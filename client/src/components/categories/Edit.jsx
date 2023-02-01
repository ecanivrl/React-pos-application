import { Form,  Modal, Table } from 'antd'
import React from 'react'

const Edit = ({isEditModalOpen, setEditIsModalOpen}) => {
  return (
    <Modal 
    title="Kategori Düzenle"
    open={isEditModalOpen}
    footer={false}
    onCancel={() => setEditIsModalOpen(false)}
    >
        <Form layout='vertical'>
            <Form.Item>
                <Table bordered/>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default Edit