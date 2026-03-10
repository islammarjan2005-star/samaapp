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

export default function SignupScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !displayName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: displayName.trim() },
      },
    });
    setLoading(false);
    if (error) {
      Alert.alert("Signup Failed", error.message);
    } else {
      router.replace("/(auth)/onboarding");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <GeometricPattern
        width={400}
        height={400}
        opacity={0.04}
        style={{ top: -50, left: -100 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 32 }}
      >
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Create Account
          </Text>
          <Text style={{ color: COLORS.muted, fontSize: 15, marginTop: 8 }}>
            Join Sama and start your journey
          </Text>
        </View>

        {/* Display Name */}
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
          <Ionicons name="person-outline" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Display Name"
            placeholderTextColor={COLORS.muted}
            value={displayName}
            onChangeText={setDisplayName}
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: 16,
              paddingVertical: 14,
              paddingLeft: 12,
            }}
          />
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
            placeholder="Password (min. 6 characters)"
            placeholderTextColor={COLORS.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: 16,
              paddingVertical: 14,
              paddingLeft: 12,
            }}
          />
        </View>

        <Button title="Create Account" onPress={handleSignup} loading={loading} size="lg" />

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <Text style={{ color: COLORS.muted, fontSize: 15 }}>
            Already have an account?{" "}
            <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
