import React, { useState } from 'react'
import { Card, Col, Modal, Form, Input } from 'antd';
import { EditOutlined, HeartFilled, HeartOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

function Showalluser(props) {
    const [liked, setLiked] = useState('false')
    const toggleLiked = () => setLiked(!liked);
    const [editModal, setEditModal] = useState(false)
    const [form] = useForm()
    const [postData, setPostData] = useState({})

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const updateDetails = async (values) => {
        // e.preventDefault();
        const {id, name, email, phone, website} = values;
        const resp = await fetch('http://localhost:7000/v1/api/updatedetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, name, email, phone, website})
        })
        let jsonx = resp.json();
        jsonx.then((data) => {
            if (data.success === false) {
                alert("Enter Valid Credentials")
            }
            else {
                window.location.reload();
                setEditModal(false)
            }
        })
    }

    const deleteDetails = async () => {
        await fetch("http://localhost:7000/v1/api/removeaccount", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: props.details.id })
        });
        window.location.reload();
    }

    return (
        <>
            <Col span={6}>
                <Card
                    style={{
                        width: 300,
                    }}
                    cover={
                        <img
                            alt="Avatar"
                            src={`https://avatars.dicebear.com/v2/avataaars/${props.details.username}.svg?options[mood][]=happy`}
                        />
                    }
                    actions={[
                        <button onClick={toggleLiked} className='buttondesign'>{liked ? <HeartOutlined /> : <HeartFilled style={{ color: "#FF0000" }} />}</button>,
                        <button onClick={() => setEditModal(true)} className='buttondesign'><EditOutlined key="edit" /></button>,
                        <button onClick={deleteDetails} className='buttondesign'><DeleteOutlined /></button>
                    ]}
                >
                    <h3>{props.details.name}</h3>
                    <div className='detailslayout'>
                        <div className='childlayout'>
                            <div><MailOutlined /></div>
                            <div>{props.details.email}</div>
                        </div>
                        <div className='childlayout'>
                            <div><PhoneOutlined /></div>
                            <div>{props.details.phone}</div>
                        </div>
                        <div className='childlayout'>
                            <div><GlobalOutlined /></div>
                            <div>http://{props.details.website}</div>
                        </div>
                    </div>
                </Card>
            </Col>
            <Modal
                title="Edit the Details"
                centered
                open={editModal}
                onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        // console.log(values);
                        updateDetails(values);
                      })
                      .catch((info) => {
                        console.log("Validate Failed:", info);
                      });
                  }}
                onCancel={() => setEditModal(false)}
            >
                <Form form={form} {...formItemLayout}>
                    <Form.Item
                        label="id"
                        name="id"
                        hidden
                        initialValue={props.details.id}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the name!',
                            },
                        ]}
                        initialValue={props.details.name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the email!',
                                type: "email"
                            },
                        ]}
                        initialValue={props.details.email}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the phone!',
                                type: "phone"
                            },
                        ]}
                        initialValue={props.details.phone}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Website"
                        name="website"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the website!',
                            },
                        ]}
                        initialValue={props.details.website}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Showalluser