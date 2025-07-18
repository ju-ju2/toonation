import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const [initId, setInitId] = useState<string>('');
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) setInitId(params.id);
  }, [params]);

  return (
    <div>
      <h1>{initId} Post Page</h1>
    </div>
  );
}

export default PostDetail;
