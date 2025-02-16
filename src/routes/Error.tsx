import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>error.message</p>
    </div>
  );
}
