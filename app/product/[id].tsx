import AddToCartBar from "@/components/products/AddToCartBar";
import ProductImageCarousel from "@/components/products/ProductImageCarousel";
import ProductInfo from "@/components/products/ProductInfo";
import VariantSelector from "@/components/products/VariantSelector";
import { api } from "@/src/api/axios";
import { getProductBySlug } from "@/src/api/product.api";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/src/api/wishlist.api";
import { extractAttributes } from "@/src/utils/variant.utils";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 🔹 1. ALL hooks at the top
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductBySlug(id!),
    enabled: !!id,
  });

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
  const isWishlisted = useMemo(() => {
    if (!wishlist || !product) return false;
    return wishlist.some((item: any) => item.product.id === product.id);
  }, [wishlist, product]);

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      if (isWishlisted) {
        return removeFromWishlist(product!.id);
      } else {
        return addToWishlist(product!.id);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previous = queryClient.getQueryData<any[]>(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any[] | undefined) => {
        if (!old || !product) return old;

        if (isWishlisted) {
          return old.filter((item) => item.product.id !== product.id);
        }

        return [
          ...old,
          {
            id: "temp-id",
            product,
          },
        ];
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["wishlist"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const attributes = useMemo(() => {
    if (!product?.variants) return {};
    return extractAttributes(product.variants);
  }, [product?.variants]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find((variant: any) =>
      Object.entries(selectedAttributes).every(([key, value]) => variant.attributes[key] === value)
    );
  }, [product?.variants, selectedAttributes]);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return api.post("/cart", {
        product_id: product!.id,
        variant_id: selectedVariant?.id ?? null,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      Alert.alert("Added to cart", "Product has been added to your cart", [
        { text: "Continue shopping" },
        {
          text: "Go to cart",
          onPress: () => router.push("/cart"),
        },
      ]);
    },
    onError: () => {
      Alert.alert("Error", "Failed to add item to cart");
    },
  });

  // 🔹 2. Handlers
  const handleSelect = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddToCart = () => {
    if (product?.variants.length && !selectedVariant) {
      Alert.alert("Please select a variant");
      return;
    }
    addToCartMutation.mutate();
  };

  // 🔹 3. NOW conditional returns (safe)
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>Failed to load product</Text>
      </SafeAreaView>
    );
  }

  // 🔹 4. Render UI
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View style={{ position: "relative" }}>
            <ProductImageCarousel images={product.images} />

            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: 30,
                left: 16,
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 20,
              }}
            >
              <Ionicons name="arrow-back" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => wishlistMutation.mutate()}
              style={{
                position: "absolute",
                top: 30,
                right: 16,
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={20}
                color={isWishlisted ? "#E53935" : "#111"}
              />
            </TouchableOpacity>
          </View>

          <ProductInfo
            name={product.name}
            base_price={product.base_price}
            discount_price={product.discount_price}
            rating={Number(product.rating)}
            review_count={product.review_count}
          />

          <VariantSelector
            attributes={attributes}
            selected={selectedAttributes}
            onSelect={handleSelect}
          />
        </ScrollView>

        <AddToCartBar
          price={selectedVariant?.price ?? product.discount_price ?? product.base_price}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
          disabled={addToCartMutation?.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
