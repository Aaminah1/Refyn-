function RoutineCard(props) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '10px', borderRadius: '8px' }}>
        <h3>{props.title}</h3>
        <p>Category: {props.category}</p>
        <p>Days per Week: {props.days}</p>
      </div>
    );
  }
  
  export default RoutineCard;

  