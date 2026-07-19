// 加载组件：数据加载时显示旋转动画
import React from 'react';

export default function Loading(): React.ReactElement {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>加载中...</p>
        </div>
    );
}