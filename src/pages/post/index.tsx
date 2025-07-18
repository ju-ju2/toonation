import { useGetTestApi } from '@/api/service/test.hooks';
import Text from '@/components/text/Text';

function Post() {
  const { data } = useGetTestApi();
  console.log(data);

  return (
    <div>
      <Text label="Post Page" type="headlineBold" />
      <Text label="Post Page" type="bodyMedium" />
      <Text label="Post Page" type="titleSemiBold" />
      <Text label="Post Page" type="descriptionMedium" />
    </div>
  );
}

export default Post;
