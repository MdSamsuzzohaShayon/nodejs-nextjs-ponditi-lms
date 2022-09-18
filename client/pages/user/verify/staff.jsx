import { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../../config/axios';
import {
  openModal,
  toggleLoading,
} from '../../../redux/reducers/elementsSlice';
import CustomModal from '../../../components/elements/CustomModal';
import UnauthenticatedNavbar from '../../../components/layouts/studio/UnauthenticatedNavbar';
import Loader from '../../../components/elements/Loader';

function staff() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  let isMounted = true;

  const isLoading = useSelector((state) => state.elements.isLoading);

  const verifyStudioToken = async () => {
    // console.log({ token });
    try {
      // return;
      dispatch(toggleLoading(true));
      const response = await axios.post(
        '/studio/verify-studio',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response);
      if (response.status === 201 || 208) {
        dispatch(
          openModal({
            heading: 'Verification process',
            body: response.data.msg,
          })
        );
      }
    } catch (vstErr) {
      console.log(vstErr);
    } finally {
      dispatch(toggleLoading(false));
    }
  };
  // if (token) verifyStudioToken();
  useEffect(() => {
    // console.log(window.location.search);
    // console.log(params.get('token'));
    // const params = new URLSearchParams(window.location);
    if (!router.isReady) return;
    if (isMounted) verifyStudioToken(token);
    isMounted = false;
  }, [router.isReady]);

  if (isLoading) return <Loader />;
  return (
    <Box>
      <UnauthenticatedNavbar />
      <Container>
        <Typography variant="h1">Token Verification</Typography>
        <Link href="/studio/login">Login</Link>
        <Link href="/studio/register">Register</Link>
      </Container>
      <CustomModal />
    </Box>
  );
}

export default staff;
