import styled from "styled-components";
import { MoonLoader } from "react-spinners";

function Loading() {
  return (
    <Container>
      <LoadingContainer>
        <Logo src="/whatsapp-logo.png" alt="whatsapp logo" />
        <MoonLoader size={50} color="#3CBC28" />
      </LoadingContainer>
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  height: 200px;
  margin-bottom: 20px;
`;
