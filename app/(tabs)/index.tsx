import BannerCarousel from "@/components/BannerCarousel";
import CategoryRow from "@/components/CategoryRow";
import FeaturedProducts from "@/components/FeaturedProducts";
import RecommendedProducts from "@/components/RecommendedProducts";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryRow />
        <BannerCarousel />
        <FeaturedProducts />
        <RecommendedProducts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
