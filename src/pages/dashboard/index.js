import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Tooltip } from "antd";
import moment from "moment";
import { Chart } from "chart.js";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const serverEndpoint = process.env.REACT_APP_API_URL;
const Dashboard = (props) => {
  console.log("serverEndpoint", serverEndpoint);
  return (
    <div span={24} className="dashboard">
      <Row span={24} className="generality">
        <Col span={5} className="item post">
          <div className="content-title">
            <span>Số bài viết chờ phê duyệt</span>
            <i class="bx bxs-info-circle"></i>
          </div>
          <span className="total">10</span>
        </Col>
        <Col span={5} className="item reply">
          <div className="content-title">
            <span>Số bài viết bị báo cáo</span>
            <i class="bx bxs-info-circle"></i>
          </div>
          <span className="total">10</span>
        </Col>
        <Col span={5} className="item report">
          <div className="content-title">
            <span>Số câu trả lời bị báo cáo</span>
            <i class="bx bxs-info-circle"></i>
          </div>
          <span className="total">1000</span>
        </Col>
        <Col span={5} className="item event"></Col>
      </Row>
    </div>
  );
};
export default Dashboard;
