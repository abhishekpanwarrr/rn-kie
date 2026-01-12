import { banners } from "@/src/data/banners";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BANNER_WIDTH = SCREEN_WIDTH - 32;
const BANNER_HEIGHT = 180;

export default function BannerCarousel() {
  return (
    <View style={{ height: BANNER_HEIGHT + 24 }}>
      <Carousel
        width={BANNER_WIDTH}
        height={BANNER_HEIGHT}
        data={banners}
        autoPlay
        autoPlayInterval={4000}
        pagingEnabled
        renderItem={({ item }) => (
          // 🔴 THIS VIEW MUST HAVE WIDTH + HEIGHT
          <View
            style={{
              width: BANNER_WIDTH,
              height: BANNER_HEIGHT,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />

            {/* Overlay text */}
            <View
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {item.title}
              </Text>
              <Text style={{ color: "#fff" }}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
