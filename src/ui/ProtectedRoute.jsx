import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1) Load authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2) !authenticated redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("login");
  }, [isAuthenticated, navigate, isLoading]);

  // 3) While loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) If there is a user, render the app

  return children;
}

export default ProtectedRoute;
