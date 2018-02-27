import React, { Component } from 'react';
import {List, Divider} from 'antd';

export function PageHeader({title, actionButton}) {
    return (
        <div>
            <List.Item
                actions={[
                    actionButton
                ]}
            >
                <h2 style={{margin: 0, fontSize: '2rem'}}>{title}</h2>
            </List.Item>
            <Divider/>
        </div>
    )
}