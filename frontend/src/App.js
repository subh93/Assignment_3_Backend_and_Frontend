import './App.css';
import { Row } from 'antd';
// import { Card, Col, Row } from 'antd';
// import { EditOutlined, HeartOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Avatar } from 'antd';
import CModal from './Component/CModal';
import { useState, useEffect } from 'react';
import Showalluser from './Component/Showalluser';
// const { Meta } = Card;

function App() {
  const [allrecords, setAllRecords] = useState([])
  const loadData = async () => {
    let resp = await fetch("http://localhost:7000/v1/api/showalldata", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    resp = resp.json();
    resp.then((data) => {
      // console.log(data)
      setAllRecords(data);
    })
  }

  useEffect(() => loadData, [])
  return (
    <div className="App">
      <div className='rowAlignment'>
      <Row gutter={[16, 16]} justify="space-around">
        {(allrecords !== [] ? allrecords.map((data) => {
          return (
            <>
              <Showalluser details={data} detail_id={data.id}/>
            </>
          )
        }) : "")}
      </Row>
      </div>
      <CModal />
    </div>
  );
}

export default App;