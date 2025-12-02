import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    // TODO: Implement actual authentication logic
    navigation.navigate('MainTabs');
  };

  // Placeholder handlers for social logins
  const handleGoogleLogin = () => {
    console.log('Continue with Google pressed');
    // Implement Google login logic
  };

  const handleAppleLogin = () => {
    console.log('Continue with Apple pressed');
    // Implement Apple login logic
  };

  const handleFacebookLogin = () => {
    console.log('Continue with Facebook pressed');
    // Implement Facebook login logic
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="AljoCastillo" // Using placeholder as per image
          placeholderTextColor="#8e8e93"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="" // Password field has no placeholder in image
          placeholderTextColor="#8e8e93"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login Buttons */}
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          {/* Add Google Icon here */}
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
          {/* Add Apple Icon here */}
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          {/* Add Facebook Icon here */}
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>We will never post anything without your permission.</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark background color from image
    paddingHorizontal: 20,
    paddingTop: 80, // Adjust based on navigator header height
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(79, 195, 247, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    color: '#dcdce1',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#2c2c2e', // Input background color from image
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    color: '#ffffff', // Input text color
    fontSize: 17,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0a84ff', // Link color from image
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#0a84ff', // Button color from image
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#ffffff', // Button text color
    fontSize: 17,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#3a3a3c', // Divider color from image
  },
  orText: {
    width: 40,
    textAlign: 'center',
    color: '#8e8e93', // OR text color from image
    fontSize: 15,
  },
  socialButton: {
    backgroundColor: '#2c2c2e', // Social button background color from image
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
    // Add icon styling later if needed
  },
  socialButtonText: {
    color: '#ffffff', // Social button text color
    fontSize: 17,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#aaa',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  signupLink: {
    color: '#4FC3F7',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  disclaimerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  disclaimerText: {
    color: '#8e8e93', // Disclaimer text color from image
    fontSize: 13,
    textAlign: 'center',
  },
});

export default LoginScreen; 