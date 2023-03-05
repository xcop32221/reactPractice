import React from 'react';
import classess from '../login.module.css'
const myTitle = () => {
    return (
        <div >
           <h2 className={classess.head}>
                <img src='src/assets/loginLogo.png' alt="" />
                <span>登录</span>
            </h2>
        </div>
        
    );
};

export default myTitle;