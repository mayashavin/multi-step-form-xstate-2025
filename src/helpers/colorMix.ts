const tintVariants = {
  50: 0.95, // 95%
  100: 0.9, // 90%
  200: 0.7, // 70%
  300: 0.5, // 50%
  400: 0.3, // 30%
}

const shadeVariants = {
    600: 0.1, //10%
    700: 0.2, //30%
    800: 0.4, //50%
    900: 0.6, //70%
}

type Variants = {
  [key: string | number]: string
}

export function getTintVariantColor(color: string, intensity: number) {
  return `color-mix(in srgb, ${color}, white ${intensity * 100}%)`
}

function getShadeVariantColor(color:string, intensity:number) {
  return `color-mix(in srgb, ${color}, black ${intensity * 100}% )`
}

export function getTintVariants(color: string) {
  return Object.keys(tintVariants).reduce((acc: Variants, key) => {
    acc[key] = getTintVariantColor(color, tintVariants[key as unknown as keyof typeof tintVariants])
    return acc
  }, {})
}

export function getShadeVariants(color: string) {
  return Object.keys(shadeVariants).reduce((acc: Variants, key) => {
    acc[key] = getShadeVariantColor(color, shadeVariants[key as unknown as keyof typeof shadeVariants])
    return acc
  }, {})
}
