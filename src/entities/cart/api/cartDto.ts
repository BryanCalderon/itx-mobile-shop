export interface AddToCartRequestDto {
  id: string
  colorCode: number
  storageCode: number
}

export interface AddToCartResponseDto {
  count: number
}
