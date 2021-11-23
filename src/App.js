import './App.css';
import { Button, Row, Col } from 'antd';
import React, { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

const Counter = () => {
  const defaultCount = 0;
  const intervalGap = 300;

  const [timerCount, setTimerCount] = useState(defaultCount);

  const handleAlert = async () => {
    Swal.fire({
      title: 'จะซักผ้าเสร็จภายใน 10 วินาที',
      icon: 'success',
      timer: 1500,
    });
  };

  const startTimerWrapper = useCallback((func) => {
    let timeInterval: NodeJS.Timer;
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
      setTimerCount(20);
      timeInterval = setInterval(() => {
        func(timeInterval);
      }, intervalGap);
    };
  }, []);

  const timer = useCallback(
    startTimerWrapper((intervalfn: NodeJS.Timeout) => {
      setTimerCount((val) => {
        if (val === 0) {
          clearInterval(intervalfn);
          return val;
        } else if (val === 10) {
          handleAlert();
        }
        return val - 1;
      });
    }),
    []
  );

  return (
    <>
      <div className="Dx">
        <span className="Ex">ร้านดูดี</span>
      </div>

      <Row className="dm" justify="center" align="middle">
        <Row className="divEx">
          <Col span={8}>
            <h2>เครื่องซักผ้า1</h2>
          </Col>
          <Col span={8}>
            <p>สถานะ : {timerCount > 0 ? 'กำลังซัก' : 'ว่าง'}</p>
            {timerCount > 0 ? <p>เหลือเวลา : {timerCount}</p> : ''}
          </Col>
          <Col span={8}>
            <Button onClick={timer} disabled={timerCount > 0 ? true : false}>
              หยอดเหรียญ
            </Button>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default Counter;
