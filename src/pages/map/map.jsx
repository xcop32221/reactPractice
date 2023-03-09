import { Button, Input, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  InfoWindow,
  Label,
  CustomOverlay,
  CityListControl,
  AutoComplete,
  BMap,
} from "react-bmapgl";

const center = { lng: 116.402544, lat: 39.928216 };
const points5 = [];
for (let i = 0; i < 10; i++) {
  points5.push(new BMapGL.Point(116.404 - i * 1, 39.915));
}
var myGeo = new BMapGL.Geocoder();
export default function map() {
  const map = useRef(null);
  const [mapcenter, setmapcenter] = useState(center);
  const [inputValue, setinputValue] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginBottom: "30px" }}>
        <Input
          id="ac"
          addonBefore={<span>地点选择:</span>}
          style={{ width: 300 }}
          allowClear={true}
          onChange={(e) => {
            setinputValue(e.target.value);
          }}
          value={inputValue}
        />
        <AutoComplete
          input="ac"
          onConfirm={(e) => {
            console.log(inputValue);
            if (inputValue) {
              myGeo.getPoint(inputValue, function (point) {
                if (point) {
                  // setmapcenter(point);
                  map.current.map.centerAndZoom(point, 16);
                  map.current.map.addOverlay(new BMapGL.Marker(point));
                }
              });
            }
          }}
          onHighlight={(e) => {
            //得到地址字符串
            const { value: _value } = e.toitem;
            setinputValue(
              _value.province +
                _value.city +
                _value.district +
                _value.street +
                _value.business
            );
          }}
          style={{ zIndex: 999 }}
        />
      </div>
      <Map
        center={mapcenter}
        zoom="8"
        style={{ height: "80vh", width: "1200px" }}
        enableDragging={true}
        enableScrollWheelZoom={true}
        ref={map}
      >
        {points5.map((item, index) => {
          return (
            <Marker key={index} position={item} title="标题" text="内容" />
          );
        })}
        <NavigationControl />
        {/* <CityListControl /> */}
        {points5.map((item, index) => {
          return (
            <CustomOverlay
              position={item}
              key={index}
              offset={new BMapGL.Size(0, -30)}
            >
              <Button type="primary">点击</Button>
            </CustomOverlay>
          );
        })}
        <InfoWindow position={center} title="当前位置" width={100} height={100}>
          <div>{center.lat}</div>
          <div>{center.lng}</div>
        </InfoWindow>
      </Map>
    </div>
  );
}
