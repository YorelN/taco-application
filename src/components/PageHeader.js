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
                <List.Item.Meta
                    style={{fontSize: '42px !important'}}
                    title={title}
                />
            </List.Item>
            <Divider/>
        </div>
    )
}