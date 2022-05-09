import AuthContent from "../../components/Auth/AuthContent";

import { useState } from "react";
import { Alert } from "react-native";

import { signInUser } from "../../util/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const signinHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const res = await signInUser(email, password);
      // console.log(res);
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
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;
