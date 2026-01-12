export function extractAttributes(variants: any[]) {
  const attributes: Record<string, Set<string>> = {};

  variants.forEach((variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!attributes[key]) {
        attributes[key] = new Set();
      }
      attributes[key].add(String(value));
    });
  });

  return Object.fromEntries(Object.entries(attributes).map(([key, set]) => [key, Array.from(set)]));
}
