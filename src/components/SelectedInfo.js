import { useParams } from 'react-router-dom';

export default function SelectedInfo() {
  const { state, city } = useParams();

  return (
    <div>
      <h1>Selected State: {state}</h1>
      <h1>Selected City: {city}</h1>
    </div>
  );
}
