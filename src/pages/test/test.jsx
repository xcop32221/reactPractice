import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHover } from "ahooks";
let data = [
  "Racing car sprays burning fuel into crowd1.",
  "Japanese princess to wed commoner2.",
  "Australian walks 100km after outback crash3.",
  "Man charged over missing wedding girl4.",
  "Los Angeles battles huge wildfires5.",
];
const data_append = [
  "Racing car sprays burning fuel into crowd6.",
  "Japanese princess to wed commoner7.",
  "Australian walks 100km after outback crash8.",
  "Man charged over missing wedding girl9.",
  "Los Angeles battles huge wildfires10.",
];
const data_append2 = [
  "Racing car sprays burning fuel into crowd11." + Math.random() * 10,
  "Japanese princess to wed commoner12." + Math.random() * 10,
  "Australian walks 100km after outback crash13." + Math.random() * 10,
  "Man charged over missing wedding girl4." + Math.random() * 10,
  "Los Angeles battles huge wildfires15." + Math.random() * 10,
];
const getData1 = () => data;
const getData2 = () => data_append;
const getData3 = () => data_append2;
// const getData4=()=>[]
const list = [getData1, getData2, getData3];
// 要什么：
// 1. 需要显示多少个
// 2. 外层包裹有多高
// 3. 每一行有多高
// 4. 如何get请求

export default function test() {
  const [list, setlist] = useState(getData1);

  const wrapper = useRef(null);
  const scrollItem = useRef(null);
  const idelItem = useRef(null);
  const isHovering = useHover(wrapper);

  useEffect(() => {
    let timer;
    idelItem.current.innerHTML = scrollItem.current.innerHTML;
    if (!isHovering) {
      timer = setInterval(
        () =>
          // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
          wrapper.current.scrollTop >= scrollItem.current.scrollHeight
            ? (wrapper.current.scrollTop = 0)
            : (wrapper.current.scrollTop += 2),
        20
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isHovering]);

  return (
    <>
      <Container ref={wrapper}>
        <Wrapper ref={scrollItem}>
          {list.map((el, index) => {
            return <Item key={index}>{el}</Item>;
          })}
        </Wrapper>
        <Wrapper ref={idelItem}></Wrapper>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 400px;
  height: 200px;
  /* overflow-y: auto; */
  overflow: hidden;
  background-color: ${(props) => props.color1 || "#ccc"};
`;
const Item = styled.li`
  list-style-type: none;
  height: 80px;
  line-height: 80px;
`;
const Wrapper = styled.div`
  height: 400px;
  background-color: #ccc;
`;
