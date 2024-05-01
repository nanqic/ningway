import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Item = () => {
  return (
    <Box sx={{ width: '80%', maxWidth: 400, my: 3.5, marginX: 1.5 }}>
      <Skeleton height={36} animation="wave" />
      <Skeleton height={36} animation="wave" />
      <Skeleton height={36} animation="wave" />
    </Box>
  )
}
export default function SearchSkeleton() {
  return (
    <>
      <Item />
      <Item />
      <Item />
    </>
  );
}