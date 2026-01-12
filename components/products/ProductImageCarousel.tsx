import React from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = 420;

type Props = {
  images: { image_url: string }[];
};

export default function ProductImageCarousel({ images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <View style={{ height: IMAGE_HEIGHT }}>
      <Carousel
        width={SCREEN_WIDTH}
        height={IMAGE_HEIGHT}
        data={images}
        pagingEnabled
        renderItem={({ item }) => (
          <View
            style={{
              width: SCREEN_WIDTH,
              height: IMAGE_HEIGHT,
            }}
          >
            <Image
              source={{ uri: item.image_url }}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
}
