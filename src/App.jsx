import React, { useState } from "react";
import "./style.css";

export const App = () => {
  // 入力した値の状態を管理
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOの状態を管理
  const [incompleteTodos, setIncompleteTodos] = useState(["test1", "test2"]);
  // 完了のTODOの状態を管理
  const [completeTodos, setCompleteTodos] = useState(["test3"]);

  // インプットエリアに文字が入力されるたびに値を取得する
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    // インプットエリアが空文字だったら処理を終了させる
    if (todoText === "") return;
    // incompleteTodosにtodoText（入力された値を追加）を追加した配列を返す
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // 追加ボタンが押された時にインプットエリアを空文字にする
    setTodoText("");
  };

  const onClickComplete = (index) => {
    // 完了が押されたタスクを未完了のtodoから削除する
    // 未完了のtodoリストをコピーする
    const newIncompleteTodos = [...incompleteTodos];
    // コピーしたリストからindexでとってきたキーの値を削除する
    newIncompleteTodos.splice(index, 1);
    // stateの状態をnewIncompleteTodosに変える
    setIncompleteTodos(newIncompleteTodos);

    // 既存の完了のtodoリストを複製
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // indexでとってきたキーから、1つの要素を削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickBack = (index) => {

    // 完了リストの配列を複製している
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }

  return (
    <>
      <div className="input-area">
        {/* インプットエリアに文字が入力されるたびにonChangeTodoText関数を実行する */}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        {/* クリックをされた時にonClickAdd関数を実行する */}
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <div>
          <p className="title">完了のTODO</p>
          <ul>
            {completeTodos.map((todo, index) => {
              return (
                <div key={todo} className="list-row">
                  <li>{todo}</li>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
