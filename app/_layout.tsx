import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

const queryClient = new QueryClient();
export default function RootLayout() {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="order/success" />
        <Stack.Screen
          name="order/orders"
          options={{
            title: "Past orders",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
        <Stack.Screen
          name="order/[id]"
          options={{
            title: "Order",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: "Checkout",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
        <Stack.Screen
          name="address/index"
          options={{
            title: "All addresses",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
        <Stack.Screen
          name="address/add"
          options={{
            title: "Add new address",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: "Payment Method",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />

        <Stack.Screen
          name="voucher"
          options={{
            title: "Voucher",
            headerTitleAlign: "center",
            headerLeft: backButton(router),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}

const backButton = (router: any) => () =>
  (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={26} color="black" />
    </TouchableOpacity>
  );
