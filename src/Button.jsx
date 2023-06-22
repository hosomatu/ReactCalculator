// ボタンのコンポーネント
// 引数（prop)としてlabelとonclickを受け取っている

const Button = props => {
 const { label, onClick } = props;

 return (
  <button className="button" onClick={onClick}>
   {label}
  </button>
 );
};

export default Button;
