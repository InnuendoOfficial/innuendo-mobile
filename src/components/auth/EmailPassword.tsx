import React, { useRef, useState } from "react";
import { VStack, Button, FormControl, Input, Icon } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import api from "../../api";
import { AuthForm } from "../../api/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StackNavProp } from "../../navigation/types";
import useAuthStore from "../../store/auth";

function AuthEmailPassword({ action }: { action: "login" | "signUp" }) {
  const navigation = useNavigation<StackNavProp>();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      email: "toto@gmail.com", //dorian.service@outlook.fr
      password: "tutu974",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef({});
  password.current = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const shouldConfirmPassword = action === "signUp";
  const signIn = useAuthStore((state) => state.signIn);

  const onSubmit = async (authForm: AuthForm) => {
    setIsLoading(true);
    const { data, error } =
      action === "login"
        ? await api.auth.login(authForm)
        : await api.auth.signup(authForm);
    console.log(data, error);
    setIsLoading(false);
    if (error) {
      if (error.status === 400) {
        // refer to API docs for status values
        setError("email", { type: "validate", message: error.message });
      } else if (error.status === 403) {
        setError("password", { type: "validate", message: error.message });
      } else {
        setError("password", { type: "validate", message: error.message });
      }
      return;
    } else if (!data) {
      return;
    }
    if (await signIn(authForm.email, data)) {
      navigation.navigate("Tabs");
    }
  };

  return (
    <VStack space={4}>
      <FormControl isRequired isInvalid={"email" in errors}>
        <FormControl.Label>Adresse e-mail</FormControl.Label>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              type="text"
              placeholder="example@gmail.com"
              autoCapitalize="none"
              borderRadius="9"
              borderColor="primary.500"
              fontSize="14"
              onBlur={() => setValue("email", value.trim())}
              onChangeText={onChange}
              value={value}
              InputLeftElement={
                <Icon
                  size="sm"
                  color="primary.500"
                  ml={4}
                  as={<MaterialCommunityIcons name="email-outline" />}
                />
              }
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Une adresse e-mail est requise",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "L'adresse e-mail est invalide",
            },
          }}
        />
        <FormControl.ErrorMessage>
          {errors.email && errors.email.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={"password" in errors}>
        <FormControl.Label>Mot de passe</FormControl.Label>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              type={showPassword ? "text" : "password"}
              onBlur={() => setValue("password", value.trim())}
              onChangeText={onChange}
              value={value}
              placeholder={"Mot de passe"}
              borderRadius="9"
              borderColor="primary.500"
              fontSize="14"
              InputLeftElement={
                <Icon
                  size="sm"
                  color="primary.500"
                  ml={4}
                  as={<MaterialCommunityIcons name="lock" />}
                />
              }
              InputRightElement={
                <Icon
                  size="sm"
                  color="primary.500"
                  mr={2}
                  as={
                    <MaterialIcons
                      name={`visibility${showPassword ? "" : "-off"}`}
                    />
                  }
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Un mot de passe est requis",
            },
          }}
        />
        <FormControl.ErrorMessage>
          {errors.password && errors.password.message}
        </FormControl.ErrorMessage>
      </FormControl>
      {shouldConfirmPassword && (
        <FormControl isRequired isInvalid={"confirmPassword" in errors}>
          <FormControl.Label>Confirmer le mot de passe</FormControl.Label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                type={showPassword ? "text" : "password"}
                onBlur={() => setValue("confirmPassword", value.trim())}
                onChangeText={onChange}
                value={value}
                placeholder={"Confirmer le mot de passe"}
                borderRadius="9"
                borderColor="primary.500"
                fontSize="14"
                InputLeftElement={
                  <Icon
                    size="sm"
                    color="primary.500"
                    ml={4}
                    as={<MaterialCommunityIcons name="lock" />}
                  />
                }
                InputRightElement={
                  <Icon
                    size="sm"
                    color="primary.500"
                    mr={2}
                    as={
                      <MaterialIcons
                        name={`visibility${showPassword ? "" : "-off"}`}
                      />
                    }
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: "La confirmation du mot de passe est requise",
              },
              validate: {
                passwordsMatch: (value) =>
                  value === password.current ||
                  "Les mots de passes ne correspondent pas.",
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
      <Button
        isLoading={isLoading}
        isLoadingText={"Connexion..."}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
        mt="2"
        shadow={6}
      >
        {action === "login" ? "Se connecter" : "Créer un compte"}
      </Button>
    </VStack>
  );
}

export default AuthEmailPassword;
