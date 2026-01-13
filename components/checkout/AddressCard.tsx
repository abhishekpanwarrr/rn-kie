import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  address: any;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const getAddressTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "work":
      return "#2563EB"; // Blue-600
    case "home":
      return "#059669"; // Green-600
    case "other":
      return "#7C3AED"; // Purple-600
    default:
      return "#4B5563"; // Gray-600
  }
};

const getAddressTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "work":
      return "business-outline";
    case "home":
      return "home-outline";
    case "other":
      return "location-outline";
    default:
      return "pin-outline";
  }
};

export default function AddressCard({ address, selected, onSelect, onEdit, onDelete }: Props) {
  const addressTypeColor = getAddressTypeColor(address.address_type);
  const addressTypeIcon = getAddressTypeIcon(address.address_type);

  return (
    <View style={[styles.cardContainer, selected && styles.selectedCardContainer]}>
      <Pressable onPress={onSelect} style={styles.card}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.typeRow}>
            <View style={[styles.typeBadge, { backgroundColor: `${addressTypeColor}15` }]}>
              <Ionicons name={addressTypeIcon} size={16} color={addressTypeColor} />
              <Text style={[styles.typeText, { color: addressTypeColor }]}>
                {address.address_type.toUpperCase()}
              </Text>
            </View>

            {selected && (
              <View style={styles.selectedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#fff" />
                <Text style={styles.selectedBadgeText}>SELECTED</Text>
              </View>
            )}
          </View>

          <Text style={styles.addressLine1}>{address.address_line1}</Text>

          {address.address_line2 ? (
            <Text style={styles.addressLine2}>{address.address_line2}</Text>
          ) : null}
        </View>

        {/* Middle Section - Location Details */}
        <View style={styles.middleSection}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#9CA3AF" />
            <Text style={styles.locationText}>
              {address.city}, {address.state} {address.postal_code}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="flag-outline" size={16} color="#9CA3AF" />
            <Text style={styles.locationText}>{address.country}</Text>
          </View>
        </View>

        {/* Bottom Action Bar */}
        <View style={styles.bottomSection}>
          <Pressable style={styles.actionButton} onPress={onSelect}>
            <Ionicons
              name={selected ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={selected ? addressTypeColor : "#D1D5DB"}
            />
            <Text
              style={[styles.actionButtonText, { color: selected ? addressTypeColor : "#6B7280" }]}
            >
              {selected ? "Selected" : "Select"}
            </Text>
          </Pressable>

          <View style={styles.actionButtonsRow}>
            {onEdit && (
              <Pressable style={styles.iconButton} onPress={onEdit}>
                <Ionicons name="create-outline" size={20} color="#6B7280" />
              </Pressable>
            )}

            {onDelete && (
              <Pressable style={[styles.iconButton, styles.deleteButton]} onPress={onDelete}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
  },
  selectedCardContainer: {
    shadowColor: "#10B981",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderWidth: 2,
    borderColor: "#10B981",
  },
  card: {
    padding: 20,
  },
  topSection: {
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  selectedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  addressLine1: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 24,
    marginBottom: 4,
  },
  addressLine2: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  middleSection: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 10,
    flex: 1,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
});
