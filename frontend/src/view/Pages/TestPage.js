import React, { useState } from 'react';
import { Radio } from 'antd';

export default function TestPage() {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);};

  return (
    <Radio.Group onChange={onChange} value={value}>
        <> Test Page </>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
    </Radio.Group>
  );
}