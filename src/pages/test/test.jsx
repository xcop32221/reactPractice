import React, { startTransition, useCallback, useDeferredValue, useEffect, useRef,useState } from "react";
import { Button, Divider, List, Typography } from 'antd';
import classes from './test.module.css'
import { useInterval } from "ahooks";
import { flushSync } from "react-dom";
let data = [
  'Racing car sprays burning fuel into crowd1.',
  'Japanese princess to wed commoner2.',
  'Australian walks 100km after outback crash3.',
  'Man charged over missing wedding girl4.',
  'Los Angeles battles huge wildfires5.',
];
const data_append = [
  'Racing car sprays burning fuel into crowd6.',
  'Japanese princess to wed commoner7.',
  'Australian walks 100km after outback crash8.',
  'Man charged over missing wedding girl9.',
  'Los Angeles battles huge wildfires10.',
];
const data_append2 = [
  'Racing car sprays burning fuel into crowd11.'+Math.random()*10,
  'Japanese princess to wed commoner12.'+Math.random()*10,
  'Australian walks 100km after outback crash13.'+Math.random()*10,
  'Man charged over missing wedding girl4.'+Math.random()*10,
  'Los Angeles battles huge wildfires15.'+Math.random()*10,
];
const getData1=()=>data
const getData2=()=>data_append
const getData3=()=>data_append2
// const getData4=()=>[]
const list=[getData1,getData2,getData3]
// 要什么：
// 1. 需要显示多少个
// 2. 外层包裹有多高
// 3. 每一行有多高
// 4. 如何get请求
const Test = ({wraperHieght=200,itemHight=80}) => {
  
  const [data, setdata] = useState(getData1())
  
  const [isScrolle, setIsScrolle] = useState(true);
  const ID=useRef(null)
  // 滚动速度，值越小，滚动越快
  const speed = 10;
  const warper = useRef();
  const childDom1 = useRef();
  const childDom2 = useRef();

  
  useEffect(() => {
    // 多拷贝一层，让它无缝滚动
    childDom2.current.innerHTML = childDom1.current.innerHTML;
    let timer;
    if (isScrolle) {
      timer = setInterval(
        () =>
        // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
          warper.current.scrollTop >= childDom1.current.scrollHeight
            ? (warper.current.scrollTop = 0) 
            : warper.current.scrollTop++,
        speed
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isScrolle]);

  
  useEffect(()=>{
    if (isScrolle) {
      ID.current=setInterval(()=>{
        const newData=list[Math.floor(Math.random()*3)]()
        startTransition(()=>{
          setdata([...newData])
        })
        
      },2000)
    }
    else{
      clearInterval(ID.current)
    }
    // return clearInterval(ID.current)
  },[isScrolle])
  
  return ( 
  <>
  <Divider orientation="left">滚动列表
  <Button style={{marginLeft:'50px'}} onClick={()=>{
    setIsScrolle(false)
  }}>停止滚动</Button>
  <Button style={{marginLeft:'50px'}} onClick={()=>{
    setIsScrolle(true)
  }}>开始滚动</Button>
  </Divider>
  <div style={{height:`${wraperHieght}px`,overflow: 'hidden'}} ref={warper}>
  <ul style={{listStyle: 'none'}} ref={childDom1}>
    {data.map((el,index)=>{
      return <li style={{height: `${itemHight}px`,lineHeight:`${itemHight}px`}} key={index}>{el}</li>
    })
    }
  </ul>
  <ul ref={childDom2}></ul>
  </div>
  </>)
};

export default Test