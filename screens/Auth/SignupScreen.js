import { useState } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Alert } from "react-native";

import { createUser } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const res = await createUser(email, password);

      dispatch(authActions.authenticate(res.data.idToken));
    } catch (err) {
      Alert.alert(
        "Authentication Failed",
        "Your login credentials are incorrect or Try again Later"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User" />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
