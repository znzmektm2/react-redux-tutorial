import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({number, increase, decrease }) => {
  return <Counter number={number} onIncrease={increase} onDecrease={decrease} />
};

export default connect(
  state => ({
    number: state.counter.number,
  }),
  // dispatch => ({
  //   increase: () => dispatch(increase()),
  //   decrease: () => dispatch(decrease()),
  // }),

  // dispatch로 감싸는 작업을 bindActionCreators가 대신해 준다  
  // dispatch => bindActionCreators({increase, decrease}),
  
  // connect 함수가 내부적으로 bindActionCreators 작업을 대신해 준다.
  {increase, decrease} 
)(CounterContainer);