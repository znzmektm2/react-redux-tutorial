import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHAHNGE_INPUT = 'todos/CHAHNGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// export const changeInput = input => ({
//   type: CHAHNGE_INPUT,
//   input
// });
export const changeInput = createAction(CHAHNGE_INPUT, input => input);

let id = 3; // insert가 호출될 때 마다 1씩 더해집니다
// export const insert = text => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}));

// export const toggle = id => ({
//   type: TOGGLE,
//   id
// });
export const toggle = createAction(TOGGLE, id => id);

// export const remove = id => ({
//   type: REMOVE,
//   id
// });
export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false
    }
  ]
};

// function todos(state = initialState, action) {
//   switch(action.type) {
//     case CHAHNGE_INPUT:
//       return {
//         ...state,
//         input: action.input
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo)
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo => 
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         )
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }

const todos = handleActions(
  // {
  //   [CHAHNGE_INPUT]: (state, action) => ({...state, input: action.payload}),
  //   [INSERT]: (state, action) => ({...state, todos: state.todos.concat(action.payload)}),
  //   [TOGGLE]: (state, action) => ({
  //     ...state,
  //     todos: state.todos.map(todo => 
  //       todo.id === action.payload ? {...todo, done: !todo.done } : todo
  //     ),
  //   }),
  //   [REMOVE]: (state, action) => ({
  //     ...state,
  //     todos: state.todos.filter(todo => todo.id !== action.payload),
  //   }),
  // },

  //** action.payload로 사용하면 헷갈리기 때문에
  //** 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해주면
  //** action.payload가 정확히 어떤 값을 의미하는지 파악하기 쉽다
  // {
  //   [CHAHNGE_INPUT]: (state, { payload: input }) => ({...state, input: input}),
  //   [INSERT]: (state, { payload: insert }) => ({...state, todos: state.todos.concat(insert)}),
  //   [TOGGLE]: (state, { payload: id }) => ({
  //     ...state,
  //     todos: state.todos.map(todo => 
  //       todo.id === id ? {...todo, done: !todo.done } : todo
  //     ),
  //   }),
  //   [REMOVE]: (state, { payload: id }) => ({
  //     ...state,
  //     todos: state.todos.filter(todo => todo.id !== id),
  //   }),
  // },

  //** immer 적용
  {
    [CHAHNGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) => // 여기서 todo는 의미에 맞게 임의로 정의
      produce(state, draft => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) => 
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) => 
      produce(state, draft => {
        // const index = draft.todos.findIndex(todo => todo.id === id);
        // draft.todos.splice(index, 1);
        draft.todos = draft.todos.filter(todo => todo.id !== id);
      }),
  },
  initialState,
);

export default todos;
