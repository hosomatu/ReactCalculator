// App.jsxが大元になるコンポーネント。親コンポーネント。
// このファイルがhtmlのrootに入って、状態を変化させながら画面に表示される。

// 切り分けたコンポーネントを呼び出して使う。子コンポーネント
import "./styles.css";
import Button from "./Button";
import Display from "./Display";
import { useState } from "react";

// useStateを用いて、使用するステートを定義している。
// state：コンポーネントの状態を保存する固有のメモリ。状態。
// 左側がステート、右がセッター関数という決まり。
// セッター関数に値が入るとセッターに値を入れて、再描画（レンダリング）する。
export default function App() {
 const [firstNumber, setFirstNumber] = useState(0); //初期値は０
 const [secondNumber, setSecondNumber] = useState(0);
 // ＋かーの部分。初期値はnull
 const [operator, setOperator] = useState(null);
 // formulaは数式のこと。
 const [formula, setFormula] = useState(0);
 // 結果。下の太い数値の部分。
 const [result, setResult] = useState(0);

 // ここからは実際の処理を書いている。
 // 数字と記号の処理は別なので、OnClickNumberとonClickOperaterに分けている。
 const onClickNumber = number => {
  // operator===nullと同義
  if (!operator) {
   // operatorが入力されていない場合は、firstNumberを操作する
   // 現在すでに入っているのがfirstNumber: 1
   // 新しく押されたボタンがnumber: 2
   // -> `${firstNumber}${text}` = '12' JavaScriptの文字列結合
   // Numberで囲むことで数値となる
   // 最初に０を押すと００という文字列になるが、数値になると０になる。
   const newFirstNumber = Number(`${firstNumber}${number}`);
   // 作成された引数（newFirstNumber）がステート関数に渡される→ステートに入る、再レンダリングの実行。
   setFirstNumber(newFirstNumber);
   setFormula(newFirstNumber);
   setResult(newFirstNumber);
  } else {
   // operatorが入力されている場合は、secondNumberを操作する
   const newSecondNumber = Number(`${secondNumber}${number}`);
   setSecondNumber(newSecondNumber);
   setFormula(`${firstNumber} ${operator} ${newSecondNumber}`);
   setResult(newSecondNumber);
  }
 };

 // 記号を押された時の処理として関数を定めた。textには＋かーしか入らない。
 const onClickOperator = text => {
  // 上のsetOperatorというステート関数にtextを代入→ステートに入る、再レンダリング
  setOperator(text);
  // 上のfomula(数式)にも同様の処理。
  setFormula(`${firstNumber} ${text}`);
  setResult(0);
 };

 // ＝が押された時の処理。
 const onClickEqual = () => {
  // ステート関数に＝を入れる→ステートに入る、再レンダリング。
  setFormula(`${firstNumber} ${operator} ${secondNumber} =`);

  // if文で足し算か引き算か。
  if (operator === "+") {
   setResult(firstNumber + secondNumber);
  } else {
   setResult(firstNumber - secondNumber);
  }
 };

 // ACボタンの定義。押された時に全てのステートを初期値に戻す。
 const onClear = () => {
  setFirstNumber(0);
  setSecondNumber(0);
  setOperator(null);
  setFormula(0);
  setResult(0);
 };

 // この中が実際に表示される部分。
 // returnの中のコメントはhtmlとおなじ表記。
 return (
  <div className="calculator">
   {/* 上の計算結果の部分 */}
   <Display formula={formula} result={result} />
   <div className="buttons">
    {/* [0,1,2,3,4,5,6,7,8,9]のこと。mapで１要素ずつ繰り返している。iが表示される要素 */}
    {/* i+1が１０のときだけ０のボタンとして扱う。 */}
    {[...Array(10).keys()].map(i =>
     i + 1 === 10 ? (
      // ボタンコンポーネントにlabelというプロップスを与えている。
      // ボタンにonClickの引数にlabelと同じ値を与えている。
      <Button label="0" onClick={() => onClickNumber(0)} />
     ) : (
      <Button label={i + 1} onClick={() => onClickNumber(i + 1)} />
     )
    )}

    <Button label="+" onClick={() => onClickOperator("+")} />
    <Button label="-" onClick={() => onClickOperator("-")} />
    <Button label="=" onClick={() => onClickEqual()} />
    <Button label="AC" onClick={() => onClear()} />
   </div>
  </div>
 );
}
