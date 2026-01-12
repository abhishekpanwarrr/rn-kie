// import CartItemRow from "@/components/cart/CartItemRow";
// import CartSummaryBar from "@/components/cart/CartSummaryBar";
// import { getCart } from "@/src/api/cart.api";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import { ActivityIndicator, FlatList, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Cart = () => {
//   const router = useRouter();
//   const { data, isLoading } = useQuery({
//     queryKey: ["cart"],
//     queryFn: getCart,
//   });

//   if (isLoading) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
//         <ActivityIndicator size="large" />
//       </SafeAreaView>
//     );
//   }

//   if (!data || data.items.length === 0) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ fontSize: 16, color: "#777" }}>Your cart is empty</Text>
//       </SafeAreaView>
//     );
//   }
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={data.items}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
//           renderItem={({ item }) => <CartItemRow item={item} />}
//         />

//         <CartSummaryBar
//           total={data.total}
//           itemCount={data.items.length}
//           onCheckout={() => router.push("/checkout")}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Cart;

import CartItemRow from "@/components/cart/CartItemRow";
import CartSummaryBar from "@/components/cart/CartSummaryBar";
import { getCart } from "@/src/api/cart.api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#777" }}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data.items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
          renderItem={({ item }) => <CartItemRow item={item} />}
        />

        <CartSummaryBar
          total={data.total}
          itemCount={data.items.length}
          onCheckout={() => router.push("/checkout")}
        />
      </View>
    </SafeAreaView>
  );
}
