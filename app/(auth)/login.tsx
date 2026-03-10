import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { GeometricPattern } from "@/components/ui/GeometricPattern";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <GeometricPattern
        width={400}
        height={400}
        opacity={0.04}
        style={{ top: -50, right: -100 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 32 }}
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Ionicons name="musical-notes" size={36} color={COLORS.white} />
          </View>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 32,
              fontWeight: "800",
              letterSpacing: -0.5,
            }}
          >
            Sama
          </Text>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 15,
              marginTop: 4,
            }}
          >
            Your halal music experience
          </Text>
        </View>

        {/* Email */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.card,
            borderRadius: 12,
            paddingHorizontal: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <Ionicons name="mail-outline" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: 16,
              paddingVertical: 14,
              paddingLeft: 12,
            }}
          />
        </View>

        {/* Password */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.card,
            borderRadius: 12,
            paddingHorizontal: 16,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: 16,
              paddingVertical: 14,
              paddingLeft: 12,
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>

        <Button title="Sign In" onPress={handleLogin} loading={loading} size="lg" />

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signup")}
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <Text style={{ color: COLORS.muted, fontSize: 15 }}>
            Don't have an account?{" "}
            <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
