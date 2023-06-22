const Display = props => {
 const { formula, result } = props;

 return (
  <div className="display">
   <div className="formula">{formula}</div>
   <div>{result}</div>
  </div>
 );
};

export default Display;
