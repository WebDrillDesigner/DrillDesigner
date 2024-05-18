import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useShowState } from "./utils/PerformersState";
import helper from "./utils/helpers";
import config from "./config/AppConfig";
import { Show } from "./types/Show";
import StageComponent from "./components/StageComponent";
import MenuComponent from "./components/menu/MenuComponent";
import CountSliderComponent from "./components/CountSliderComponent";
import items from "./components/menu/MenuItems";
import UploadButtonComponent from "./components/menu/UploadButtonComponent";
import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';
import { Col, Row, Divider, Space } from 'antd';

const { Content, Sider, Footer } = Layout;

const initialShow: Show = {
  id: "show-1",
  name: "My Awesome Show",
  performers: Object.fromEntries(
    Array.from({ length: config.defaultNumCounts }, (_, i) => [
      i,
      helper.performersToLine(config.defaultNumPerformers, i),
    ]),
  ),
  count: 1,
};

const App: React.FC<object> = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set,
    handleCountChange,
    updatePositions,
  } = useShowState(initialShow);

  // empty array means invoked once, adds listener to update windowSize var on 'resize' event
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      console.log((windowSize.width - config.canvasWidth) / 2);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="left-sidebar" />
        <MenuComponent
          menuItems={[
            items.positionInLineButton(positionPerformersInLine),
            items.saveShowButton(saveState),
          ]}
        >
          <UploadButtonComponent loadStateOnClick={loadState} />
        </MenuComponent>
      </Sider>
      <Layout>
        <Content style={{}}>
          <Space direction="vertical">
            <Row>
              <StageComponent
                width={config.canvasWidth}
                height={config.canvasHeight}
                show={show}
                count={set}
                updatePosition={updatePositions}
              />
            </Row>
            <Row gutter={35}>
              <Col span={2} >
                <Button>Play Show</Button>
              </Col>
              <Col span={2} >
                <Button>Add Count</Button>
              </Col>
              <Col span={17} offset={1} >
                <CountSliderComponent onSlide={handleCountChange} />
              </Col>
            </Row>
          </Space>
        </Content>
      </Layout>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" />
      </Sider>
    </Layout>
  );
};

export default App;
