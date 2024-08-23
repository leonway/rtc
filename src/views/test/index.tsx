import React, { useEffect } from 'react'
import s from './index.module.less'

interface TestProps {}

const Test: React.FC<TestProps> = (componentProps) => {
  useEffect(() => {}, [])
  return <div className={s['test-root']}></div>
}

export default Test
