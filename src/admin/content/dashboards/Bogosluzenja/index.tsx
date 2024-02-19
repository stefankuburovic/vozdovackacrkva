import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import PageHeader from "./PageHeader";
import PageTitleWrapper from "../../../components/PageTitleWrapper";

function DashboardBogosluzenja() {
  return (
    <>
      <Helmet>
        <title>Богослужења (Админ Панел)</title>
      </Helmet>
        <PageTitleWrapper>
            <PageHeader />
        </PageTitleWrapper>
      <Container maxWidth="lg">
      </Container>
      <Footer />
    </>
  );
}

export default DashboardBogosluzenja;
