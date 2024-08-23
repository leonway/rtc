import React from 'react'
import { Spin } from 'antd'
import type { SpinProps } from 'antd/es/spin'
import s from './index.module.less'

type LoadingProps = SpinProps

const Loading: React.FC<LoadingProps> = () => (
  <div className={s['common-loading-root']}>
    <Spin />
  </div>
)

export default Loading
